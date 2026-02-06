declare module "@toast-ui/editor" {
  interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
    viewer?: boolean;
  }

  export default class Editor {
    constructor(options: EditorOptions);
    static factory(options: EditorOptions): Editor | { destroy(): void; setMarkdown(markdown: string): void };
    getMarkdown(): string;
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
