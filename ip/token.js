export default class Token {
  static {
    this.TYPE_SPACE_OR_EMPTY = "SPACE_OR_EMPTY";
    this.TYPE_NUMBER = "NUMBER";
    this.TYPE_DOT = "DOT";
  }

  #type;
  #content;

  constructor(type, text = null) {
    this.#type = type;
    this.#content = text;
  }

  static newSpace(text) {
    return new Token(this.TYPE_SPACE_OR_EMPTY, text);
  }

  static newEmpty() {
    return new Token(this.TYPE_SPACE_OR_EMPTY, null);
  }

  static newDot(text) {
    return new Token(this.TYPE_DOT, text);
  }

  static newNumber(number) {
    return new Token(this.TYPE_NUMBER, number);
  }

  static isSpaceOrEmpty(type) {
    return type === this.TYPE_SPACE_OR_EMPTY;
  }

  static isNumber(type) {
    return type === this.TYPE_NUMBER;
  }

  static isDot(type) {
    return type === this.TYPE_DOT;
  }

  isSpaceOrEmpty() {
    return Token.isSpaceOrEmpty(this.#type);
  }

  isNumber() {
    return Token.isNumber(this.#type);
  }

  isDot() {
    return Token.isDot(this.#type);
  }

  get type() {
    return this.#type;
  }

  get content() {
    return this.#content;
  }

  toJSON() {
    return {
      type: this.#type,
      content: this.#content,
    };
  }
}
