import type { AnyExtension, Editor } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: `
        <h2 data-id="2b7c83e3-a509-47db-a248-a469070567b0" id="2b7c83e3-a509-47db-a248-a469070567b0" data-toc-id="2b7c83e3-a509-47db-a248-a469070567b0">Getting Started</h2>
        <p data-id="d83c2623-2041-4e08-8be2-ddf5b84b0ef7">Welcome to the block editor. This is a sample document to help you get started.</p>
        <ul data-type="taskList">
          <li data-checked="false" data-type="taskItem">
            <label><input type="checkbox"><span></span></label>
            <div><p data-id="df84e5a5-ebbf-4d99-bc5c-ca5fcf374e46">Create your first document</p></div>
          </li>
          <li data-checked="false" data-type="taskItem">
            <label><input type="checkbox"><span></span></label>
            <div><p data-id="690f9bc9-fe63-4cd5-9508-1649b4a9b454">Explore the available formatting options</p></div>
          </li>
        </ul>
        <p data-id="e9ff0a3c-5a94-4f60-86e5-457bea34d7cc"></p>`,
      extensions: [...ExtensionKit()].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  window.editor = editor;

  return { editor };
};
