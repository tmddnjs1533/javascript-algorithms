import LinkedList from '../linked-list/LinkedList';

// 해시 테이블 크기는 충돌 횟수에 직접적인 영향을 미칩니다.해시 테이블 크기가 클수록 충돌이 줄어듭니다.
// 해쉬 테이블 크기는 충돌이 어떻게 처리되는지 보여주기 위해 작습니다.
// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // 특정 크기의 해시 테이블을 만들고 각 버킷을 빈 링크드 리스트로 채웁니다.
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

    // 모든 실제 키를 빠르게 추적하기 위해서입니다.
    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * 해시 함수
   * 키 문자열을 해시 번호로 변환합니다.
   * Converts key string to hash number.
   *
   * @param {string} key
   * @return {number}
   */
  hash(key) {
    // 간단한 이유로 우리는 단지 해시를 계산하기 위해 키의 모든 문자의 문자 코드 합계를 사용할 것이다.
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // 그러나 충돌 횟수를 줄이기 위해 다항식 문자열 해시와 같은 보다 정교한 접근 방식을 사용할 수도 있습니다.
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // 여기서 charCodeAt(i)는 키의 i번째 문자 코드이고, n은 키의 길이이며, PRIME은 31과 같은 소수입니다.
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // 해시 테이블 크기에 맞도록 해시 수를 줄입니다.
    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key); // 키값의 해시함수가 가리키는 버켓 참조
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
