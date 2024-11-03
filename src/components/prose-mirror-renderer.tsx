"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { ExtensionKit } from "@/components/editor/extensions/extension-kit";
import { type AnyExtension } from "@tiptap/core";

interface ProseMirrorRendererProps {
  document: string | object | null;
}

export function ProseMirrorRenderer({ document }: ProseMirrorRendererProps) {
  const parsedContent =
    typeof document === "string" ? JSON.parse(document) : document;

  const editor = useEditor(
    {
      extensions: [...ExtensionKit()].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      content: parsedContent,
      editable: false,
      editorProps: {
        attributes: {
          class: "min-h-full",
        },
      },
    },
    [],
  );

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
