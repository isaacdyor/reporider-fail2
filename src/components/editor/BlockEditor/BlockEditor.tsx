"use client";

import { EditorContent } from "@tiptap/react";

import { LinkMenu } from "@/components/editor/menus";

import { useBlockEditor } from "@/hooks/use-block-editor";

import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { TextMenu } from "../menus/TextMenu";

import "@/styles/index.css";

export const BlockEditor = () => {
  const { editor } = useBlockEditor();

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

export default BlockEditor;
