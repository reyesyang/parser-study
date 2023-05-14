export default class Token {
  static {
    this.TYPE_TEXT = "text";
    this.TYPE_BEGIN_TAG = "begin_tag";
    this.TYPE_END_TAG = "end_tag";
  }

  #type;
  #content;

  constructor(type, content) {
    this.#type = type;
    this.#content = content;
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
