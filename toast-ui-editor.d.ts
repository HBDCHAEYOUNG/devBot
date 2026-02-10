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
  interface ViewerOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
  }

  export default class Viewer {
    constructor(options: ViewerOptions);
    destroy(): void;
  }
}
