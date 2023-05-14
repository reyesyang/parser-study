import Node from "./Node.js";

export default class TagNode extends Node {
  #tagName;
  #children;

  constructor(tagName, tokens, children=[]) {
    super(Node.TYPE_TAG, tokens);
    this.#tagName = tagName;
    this.#children = children;
  }

  get children() {
    return this.#children;
  }

  addChild(node) {
    this.#children.push(node);
  }

  addChildren(nodes) {
    nodes.forEach(this.addChild);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      children: this.#children,
    };
  }
}
