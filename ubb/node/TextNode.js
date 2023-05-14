import Node from "./Node.js";

export default class TextNode extends Node {
  #content;

  constructor(content, tokens) {
    super(Node.TYPE_TEXT, tokens);
    this.#content = content;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      content: this.#content,
    };
  }
}
