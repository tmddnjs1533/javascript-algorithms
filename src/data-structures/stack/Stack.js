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
    // 링크드 리스트에 헤드가 없으면 스택이 비어 있습니다.
    // The stack is empty if its linked list doesn't have a head.
    return !this.linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      // 링크된 목록이 비어 있으면 엿볼 수 있는 항목이 없습니다.
      // If the linked list is empty then there is nothing to peek from.
      return null;
    }

    // 링크된 목록의 시작부터 값을 삭제하지 않고 읽기만 하면 됩니다.
    // Just read the value from the start of linked list without deleting it.
    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  push(value) {
    // 푸시(push)는 스택의 맨 위에 값을 놓는 것을 의미합니다. 따라서 링크된 목록의 시작 부분에 새 값을 추가합니다.
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
