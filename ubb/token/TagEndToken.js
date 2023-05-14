import Token from "./Token.js";

export default class TagEndToken extends Token {
    constructor(tagName) {
        super(Token.TYPE_END_TAG, tagName);
    }
}
