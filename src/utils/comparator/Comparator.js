export default class Comparator {
  /**
   * Constructor.
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   * 사용자 정의 개체를 함께 비교할 수 있는 사용자 정의 비교 함수일 수 있습니다.
   */
  constructor(compareFunction) {
    /** 기본 비교 함수 또는 사용자 정의 비교함수 */
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * 기본 비교 함수. 단, "a"와 "b"가 문자열 또는 숫자라고 가정한다.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */
  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   * 두 변수가 동일한지 확인합니다.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * 변수 "a"가 "b"보다 *작은지* 확인합니다.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * 변수 "a"가 "b"보다 *큰지* 확인합니다.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * 변수 "a"가 "b"보다 작거나 같은지 확인합니다.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * 변수 "a"가 "b"보다 크거나 같은지 확인합니다.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   * 비교 순서를 반대로 적용합니다.
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
