import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const cwd = process.cwd();
const srcDir = path.join(cwd, "src");
const dirsToProcess = ["widgets", "features", "entities", "shared"];
const tsInclude = /\.tsx?$/;

const barrelsByOptions = {
  delete: true,
  include: ".*\\.tsx?$",
  singleQuotes: true,
  noHeader: true,
  verbose: true,
  noSemicolon: true,
  exclude: ["index.ts", ".*\\.stories\\..*"],
};

function hasTsOrTsx(dirPath) {
  const names = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of names) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (hasTsOrTsx(fullPath)) return true;
    } else if (entry.name !== "index.ts" && tsInclude.test(entry.name)) {
      return true;
    }
  }
  return false;
}

function buildBarrelsbyArgs(dirArg) {
  const args = ["--directory", dirArg];
  for (const [key, value] of Object.entries(barrelsByOptions)) {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        args.push(`--${key}`, v);
      });
    } else if (typeof value === "boolean") {
      if (value) args.push(`--${key}`);
    } else {
      args.push(`--${key}`, String(value));
    }
  }
  return args;
}

dirsToProcess.forEach((dir) => {
  const fullDir = path.join(srcDir, dir);
  if (!fs.existsSync(fullDir)) {
    console.warn(`Directory ${fullDir} does not exist.`);
    return;
  }

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(fullDir, entry.name);
    const dirArg = path.relative(cwd, fullPath);
    if (!hasTsOrTsx(fullPath)) continue;
    try {
      const args = buildBarrelsbyArgs(dirArg);
      execSync(`npx barrelsby ${args.join(" ")}`, {
        stdio: "inherit",
        cwd,
        shell: true,
      });
    } catch (error) {
      console.error(`Error processing ${fullPath}:`, error.message);
    }
  }
});
