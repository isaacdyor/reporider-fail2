import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes, type Range } from "@tiptap/core";

import { ImageBlockView } from "./image-block-view";
import { Image } from "../image";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlock: (attributes: { src: string }) => ReturnType;
      setImageBlockAt: (attributes: {
        src: string;
        pos: number | Range;
      }) => ReturnType;
      setImageBlockAlign: (align: "left" | "center" | "right") => ReturnType;
      setImageBlockWidth: (width: number) => ReturnType;
    };
  }
}

export const ImageBlock = Image.extend({
  name: "imageBlock",

  group: "block",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src as string,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("data-width"),
        renderHTML: (attributes) => ({
          "data-width": attributes.width as string,
        }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align"),
        renderHTML: (attributes) => ({
          "data-align": attributes.align as string,
        }),
      },
      alt: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt as string,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src*="tiptap.dev"]:not([src^="data:"]), img[src*="windows.net"]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImageBlock:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "imageBlock",
            attrs: { src: attrs.src },
          });
        },

      setImageBlockAt:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContentAt(attrs.pos, {
            type: "imageBlock",
            attrs: { src: attrs.src },
          });
        },

      setImageBlockAlign:
        (align) =>
        ({ commands }) =>
          commands.updateAttributes("imageBlock", { align }),

      setImageBlockWidth:
        (width) =>
        ({ commands }) =>
          commands.updateAttributes("imageBlock", {
            width: `${Math.max(0, Math.min(100, width))}%`,
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },
});

export default ImageBlock;
