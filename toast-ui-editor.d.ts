declare module "@toast-ui/editor-plugin-code-syntax-highlight" {
  const codeSyntaxHighlight: (context: unknown) => void;
  export default codeSyntaxHighlight;
}

declare module "@toast-ui/editor" {
  interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
    viewer?: boolean;
  }

  export default class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    setMarkdown(markdown: string): void;
    on(event: "change", callback: () => void): void;
    destroy(): void;
  }
}

declare module "@toast-ui/editor/dist/toastui-editor-viewer" {
  type ToastUIPlugin =
    | ((context: unknown) => void)
    | [(context: unknown) => void, { highlighter: unknown }];

  interface ViewerOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
    plugins?: ToastUIPlugin[];
  }

  export default class Viewer {
    constructor(options: ViewerOptions);
    destroy(): void;
  }
}
