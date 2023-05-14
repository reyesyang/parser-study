import Scanner from "./scanner.js";
import TagBeginToken from "./token/TagBeginToken.js";
import TextToken from "./token/TextToken.js";
import TextNode from "./node/TextNode.js";
import TagNode from "./node/TagNode.js";
import TagEndToken from "./token/TagEndToken.js";

export default class Parser {
  #scanner;
  #ast;
  #nodes;
  #currentNode;
  #token;

  constructor() {
  }

  get ast() {
    return this.#ast;
  }

  parse(text) {
    this.#scanner = new Scanner(text);
    // this.#nodes = [];
    // this.#currentNode = null;
    this.#token = null;
    this.#ast = this.start();
  }

  // S()
  start() {
    return this.uub();
  }

  uub() {
    // this.#token = this.#scanner.nextToken();
    this.nextToken();
    let node;

    if (this.#token === null) {
      return [];
    }

    if (this.#token instanceof TagBeginToken) {
      node = this.tag();
    } else if (this.#token instanceof TextToken) {
      node = this.text()
    } else if (this.#token instanceof TagEndToken) {
      return [];
    } else {
      throw `Unknown token ${JSON.stringify(this.#token)}`;
    }

    return [node, ...this.uub()];
  }

  tag() {
    const tagName = this.#token.content;
    let tokens = [this.#token];
    const children = this.uub();

    // this.nextToken();
    tokens.push(this.#token)

    return new TagNode(tagName, tokens, children);
  }

  text() {
    return new TextNode(this.#token.content, [this.#token])
  }

  // $()
  end() {

  }

  nextToken() {
    this.#token = this.#scanner.nextToken();
  }
}
