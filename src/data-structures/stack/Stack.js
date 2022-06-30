import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    // 링크드 리스트와 스택 두 구조가 상당히 유사하기 때문에 링크드 리스트를 기반으로
    // 스택을 구현합니다.
    // 링크드 리스트의 prepend/deleteHead 작업과 스택의 push/pop 작업을
    // 비교하십시오.
    // We're going to implement Stack based on LinkedList since these
    // structures are quite similar. Compare push/pop operations of the Stack
    // with prepend/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    // The stack is empty if its linked list doesn't have a head.
    return !this.linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      // If the linked list is empty then there is nothing to peek from.
      return null;
    }

    // Just read the value from the start of linked list without deleting it.
    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  push(value) {
    // Pushing means to lay the value on top of the stack. Therefore let's just add
    // the new value at the start of the linked list.
    this.linkedList.prepend(value);
  }

  /**
   * @return {*}
   */
  pop() {
    // Let's try to delete the first node (the head) from the linked list.
    // If there is no head (the linked list is empty) just return null.
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
