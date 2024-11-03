import { isCustomNodeSelected } from "@/lib/tiptap/isCustomNodeSelected";
import isTextSelected from "@/lib/tiptap/isTextSelected";

import { type Editor, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { type ShouldShowProps } from "../../types";

export const useTextmenuStates = (editor: Editor) => {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isStrike: ctx.editor.isActive("strike"),
        isUnderline: ctx.editor.isActive("underline"),
        isCode: ctx.editor.isActive("code"),
        isSubscript: ctx.editor.isActive("subscript"),
        isSuperscript: ctx.editor.isActive("superscript"),
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
        currentColor:
          (ctx.editor.getAttributes("textStyle")?.color as string) || undefined,
        currentHighlight:
          (ctx.editor.getAttributes("highlight")?.color as string) || undefined,
        currentFont:
          (ctx.editor.getAttributes("textStyle")?.fontFamily as string) ||
          undefined,
        currentSize:
          (ctx.editor.getAttributes("textStyle")?.fontSize as string) ||
          undefined,
      };
    },
  });

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
        return false;
      }

      const domAtPos = view.domAtPos(from ?? 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from ?? 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
    },
    [editor],
  );

  return {
    shouldShow,
    ...states,
  };
};
