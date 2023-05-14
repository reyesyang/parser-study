export default class StateMatchine {
  #state;

  static {
    this.STATE_PRE_MATCH = "PreMatch";
    this.STATE_MATCHING = "Matching";
    this.STATE_MATCHED = "Matched";
  }

  constructor() {
    this.#state = StateMatchine.STATE_PRE_MATCH;
  }

  isPreMatch() {
    return this.#state === StateMatchine.STATE_PRE_MATCH;
  }

  isMatching() {
    return this.#state === StateMatchine.STATE_MATCHING;
  }

  isMatched() {
    return this.#state === StateMatchine.STATE_MATCHED;
  }

  transferToMatching() {
    if (this.isPreMatch) {
      this.#state = StateMatchine.STATE_MATCHING;
    } else {
      throw `${this.#state} can not transfer to ${StateMatchine.STATE_MATCHING}`
    }
  }

  transferToMatched() {
    if (this.isMatching) {
      this.#state = StateMatchine.STATE_MATCHED;
    } else {
      throw `${this.#state} can not transfer to ${StateMatchine.STATE_MATCHED}`
    }
  }

  reset() {
    this.#state = StateMatchine.STATE_PRE_MATCH;
  }
}
