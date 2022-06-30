import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value) {
    // 선두가 될 새 노드를 만듭니다.(Make new node to be a head.)
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // 아직 꼬리가 없다면 새 노드를 꼬리로 만들자.(If there is no tail yet let's make new node a tail.)
    // 꼬리가 없다 = 새로 만든 노드만 존재함.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);

    // 아직 헤드가 없다면 새로운 노드를 먼저 만들자.(If there is no head yet let's make new node a head.)
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // 링크된 목록의 끝에 새 노드를 연결합니다.(Attach new node to the end of linked list.)
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {*} value
   * @param {number} index
   * @return {LinkedList}
   */
  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 헤드를 삭제해야 하는 경우 헤드와 다른 다음 노드를 새 헤드로 만드십시오.
    // (If the head must be deleted then make next node that is different
    // from the head to be a new head.)
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // 다음 노드를 삭제해야 하는 경우 다음 노드를 다음 노드로 만듭니다.
      // (If next node must be deleted then make next node to be a next next one.)
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Tail을 삭제해야 하는지 확인합니다.(Check if tail must be deleted.)
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // 콜백함수가 지정된 경우 콜백함수를 기준으로 노드를 찾으십시오.
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // 값이 지정된 경우 값을 기준으로 비교합니다.
      // If value is specified then try to compare by value.
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // 링크드 리스트에 노드가 하나만 있는 경우
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // 링크된 목록에 노드가 많은 경우...
    // If there are many nodes in linked list...

    // 마지막 노드로 되돌아가 마지막 노드 직전 노드의 "next" 링크를 삭제합니다.
    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // 다음 노드를 저장
      // Store next node.
      nextNode = currNode.next;

      // 이전 노드에 연결되도록 현재 노드의 다음 노드를 변경합니다.
      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      // prevNode 및 currNode 노드를 한 단계 발전시킵니다.
      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
