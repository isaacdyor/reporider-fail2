"use client";

import { EditorContent } from "@tiptap/react";

import { LinkMenu } from "@/components/editor/menus";

import { useBlockEditor } from "@/hooks/use-block-editor";

import { ImageBlockMenu } from "@/components/editor/extensions/image-block/image-block-menu";
import { ColumnsMenu } from "@/components/editor/extensions/multi-column/columns-menu";

import {
  TableColumnMenu,
  TableRowMenu,
} from "@/components/editor/extensions/table/menus";
import { ContentItemMenu } from "./menus/content-menu-item";
import { TextMenu } from "./menus/text-menu";

import "@/styles/index.css";

export const Editor = ({ content }: { content: string }) => {
  const { editor } = useBlockEditor({ content });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full">
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} />
        <TableRowMenu editor={editor} />
        <TableColumnMenu editor={editor} />
        <ImageBlockMenu editor={editor} />
      </div>
    </div>
  );
};
