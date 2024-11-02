import type { AnyExtension, Editor } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/components/editor/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({ content }: { content: string }) => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content,
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

  return { editor };
};
