import Token from "./Token.js";

export default class TextToken extends Token {
    constructor(text) {
        super(Token.TYPE_TEXT, text);
    }
}
