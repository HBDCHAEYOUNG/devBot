"use client";

import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "my-documents";
const COOKIE_NAME = "my-documents";

function syncMyDocumentsCookie() {
  if (typeof window === "undefined") return;

  const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const hasDocuments = value != null && value !== "";

  if (hasDocuments) {
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=31536000; samesite=lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
  }
}

export default function MyDocumentsCookieSync() {
  useEffect(() => {
    try {
      syncMyDocumentsCookie();
    } catch {
      // ignore sync errors on client
    }
  }, []);

  return null;
}
