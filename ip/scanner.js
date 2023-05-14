import Token from "./token.js";

/**
 *
 */
export default class Scanner {
  SPACE_REGEXP = /\s/;
  DIGIT_REGEXP = /\d/;
  DOT_REGEXP = /\./;

  constructor(content) {
    this.text = content;
    this.position = 0;
    this.token = null;
  }

  /**
   * 返回下一个 Token，不会为 null
   * @returns Token
   */
  nextToken(type) {
    let match = "";

    while (this.position < this.text.length) {
      let char = this.text[this.position];

      // match SpaceOrEmpty
      if (Token.isSpaceOrEmpty(type)) {
        if (this.#isSpace(char)) {
          do {
            match += char;
            this.position += 1;
            char = this.text[this.position];
          } while (this.#isSpace(char));

          return Token.newSpace(match);
        } else {
          return Token.newEmpty();
        }
      }

      // match Number
      if (Token.isNumber(type) && this.#isDigit(char)) {
        do {
          match += char;
          this.position += 1;
          char = this.text[this.position];
        } while(this.#isDigit(char))

        return Token.newNumber(this.#parseNumber(match));
      }

      // match Dot
      if (Token.isDot(type) && this.#isDot(char)) {
        match += char;
        this.position += 1;
        return Token.newDot(match);
      }

      const message = this.#buildInvalidCharErrorMessage(this.text, char, this.position);
      throw message;
    }

    return null;
  }

  #isSpace(char) {
    return this.SPACE_REGEXP.test(char);
  }

  #isDigit(char) {
    return this.DIGIT_REGEXP.test(char);
  }

  #isDot(char) {
    return this.DOT_REGEXP.test(char);
  }

  #parseNumber(text) {
    const result = parseInt(text, 10);
    if (result > 255) {
      const message = this.#buildInvalidNumberErrorMessage(this.text, text, this.position);
      throw message;
    }

    return result;
  }

  /**
   * Build error message
   * For example:
   *
   * 1. Invalid char
   * Invalid format: char 'a' should not be there
   *
   * 192.1a68.0.1
   *      ^
   *      |------ char 'a' should not be there
   *
   *
   * 2. Invalid number
   * Invalid format: number 256 should less or equal than 255
   *
   * 192.256.0.1
   *     ^^^
   *       |---- number 256 should less or equal than 255
   *
   * @param text
   * @param match
   * @param position
   * @returns
   */
  #buildErrorMessage(text, match, position, message) {
    const arrow = '^'.repeat(match.length).padStart(position + 1, ' ');
    const arrowMessage = '|'.padStart(position - match.length / 2 + 2) + '-'.repeat(5) + ' ' + message;
    return `Invalid format: ${message}\n` +
      `${text}\n` +
      `${arrow}\n` +
      arrowMessage;
  }

  #buildInvalidCharErrorMessage(text, match, position) {
    return this.#buildErrorMessage(text, match, position, `char '${match}' should not be there`);
  }

  #buildInvalidNumberErrorMessage(text, match, position) {
    return this.#buildErrorMessage(text, match, position - 1, `number ${match} should less than or equal to 255`);
  }
}
