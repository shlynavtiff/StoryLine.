import { Node, mergeAttributes } from "@tiptap/core";
import Image from "@tiptap/extension-image";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center", // Default alignment
        parseHTML: (element) => element.style.textAlign || "center",
        renderHTML: (attributes) => {
          return {
            style: `display: block; margin: 0 auto; text-align: ${attributes.align};`,
          };
        },
      },
    };
  },
});
export default CustomImage;