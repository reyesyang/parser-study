/**
 * type:
 *  - Number
 *  - Dot
 *  - SpaceOrEmtpy
 *
 * IP -> SpaceOrEmtpty Number SpaceOrEmpty
 *       DOT
 *       SpaceOrEmtpty Number SpaceOrEmpty
 *       DOT
 *       SpaceOrEmtpty Number SpaceOrEmpty
 *       DOT
 *       SpaceOrEmtpty Number SpaceOrEmpty
 *
 * SpaceOrEmpty -> \s+ | ε
 * Number -> \d{1,3}
 * DOT -> \.
 */

import Scanner from "./scanner.js";
import Token from "./token.js";

export default class Parser {
  #scanner;
  #ast;
  #pattern;

  constructor() {
    this.#pattern = [
      Token.TYPE_SPACE_OR_EMPTY, Token.TYPE_NUMBER, Token.TYPE_SPACE_OR_EMPTY,
      Token.TYPE_DOT,
      Token.TYPE_SPACE_OR_EMPTY, Token.TYPE_NUMBER, Token.TYPE_SPACE_OR_EMPTY,
      Token.TYPE_DOT,
      Token.TYPE_SPACE_OR_EMPTY, Token.TYPE_NUMBER, Token.TYPE_SPACE_OR_EMPTY,
      Token.TYPE_DOT,
      Token.TYPE_SPACE_OR_EMPTY, Token.TYPE_NUMBER, Token.TYPE_SPACE_OR_EMPTY,
    ];
  }

  get ast() {
    return this.#ast;
  }

  parse(text) {
    this.#ast = [];
    this.#scanner = new Scanner(text);

    for (const type of this.#pattern) {
      let token = this.getNextToken(type);
      if (token !== null) {
        this.#ast.push(token);
      }
    };
  }

  toNumber() {
    return this.#ast[1].content * (2 ** 24)
      + this.#ast[5].content * (2 ** 16)
      + this.#ast[9].content * (2 ** 8)
      + this.#ast[13].content;
  }

  toString() {
    return this.#ast
      .filter((token) => token.isNumber())
      .map((token) => token.content)
      .join(".");
  }

  getNextToken(type) {
    return this.#scanner.nextToken(type);
  }
}
