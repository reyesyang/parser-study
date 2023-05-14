export default class Node {
    static {
        this.TYPE_TAG = "Tag";
        this.TYPE_TEXT = "Text";
    }

    #type;
    #tokens;

    constructor(type, tokens) {
        this.#type = type;
        this.#tokens = tokens;
    }

    get type() {
        return this.#type;
    }

    get tokens() {
        return this.#tokens;
    }

    toJSON() {
        return {
            type: this.#type,
            tokens: this.#tokens,
        }
    }
}
