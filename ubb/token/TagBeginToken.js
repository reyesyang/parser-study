import Token from "./Token.js";

export default class TagBeginToken extends Token {
    constructor(tagName) {
        super(Token.TYPE_BEGIN_TAG, tagName);
    }
}
