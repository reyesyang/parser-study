import StateMatchine from "./state_machine.js";
import TagBeginToken from "./token/TagBeginToken.js";
import TagEndToken from "./token/TagEndToken.js";
import TextToken from "./token/TextToken.js";
import Token from "./token/Token.js";

export default class Scanner {
  #position;
  #text;

  constructor(text) {
    this.#position = 0;
    this.#text = text;
  }

  nextToken() {
    const sm = new StateMatchine();
    let tokenType = null;
    let match = "";

    while (this.#position < this.#text.length) {
      let char = this.#text[this.#position];

      switch (char) {
        case "[":
          if (sm.isPreMatch()) {
            tokenType = Token.TYPE_BEGIN_TAG;
            sm.transferToMatching();
          }

          if (sm.isMatching() && tokenType === Token.TYPE_TEXT) {
            sm.transferToMatched();
          }

          break;
        case "/":
          if (sm.isMatching && tokenType === Token.TYPE_BEGIN_TAG) {
            tokenType = Token.TYPE_END_TAG;
          }

          break;
        case "]":
          if (tokenType === Token.TYPE_BEGIN_TAG || tokenType === Token.TYPE_END_TAG) {
            sm.transferToMatched();
          }

          break;
        default:
          if (sm.isPreMatch()) {
            tokenType = Token.TYPE_TEXT;
            sm.transferToMatching();
          }

          match += char;
      }

      if (sm.isMatched()) {
        switch (tokenType) {
          case Token.TYPE_BEGIN_TAG:
            return new TagBeginToken(match);
          case Token.TYPE_END_TAG:
            return new TagEndToken(match);
          case Token.TYPE_TEXT:
            return new TextToken(match);
          default:
            throw `Unknow token type: ${tokenType}`
        }
      }

      this.#position += 1;
    }

    return null;
  }
}
