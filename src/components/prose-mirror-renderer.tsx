"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { ExtensionKit } from "@/components/editor/extensions/extension-kit";
import { type JSONContent, type AnyExtension } from "@tiptap/core";

interface ProseMirrorRendererProps {
  content: string;
}

export function ProseMirrorRenderer({ content }: ProseMirrorRendererProps) {
  let parsedContent: JSONContent | string = content;
  try {
    parsedContent = JSON.parse(content) as JSONContent;
  } catch {
    parsedContent = content;
  }

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
