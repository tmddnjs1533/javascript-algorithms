import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    // 링크드 리스트와 큐 두 구조가 상당히 유사하기 때문에 링크드 리스트를 기반으로
    // 큐를 구현합니다 즉, 둘 다 시작과 끝에 있는 요소에서 주로 작동한다는 겁니다.
    // 링크드 리스트의 append/deleteHead 작업과 큐의 enqueue/dequeue 작업을
    // 비교하십시오.
    // We're going to implement Queue based on LinkedList since the two
    // structures are quite similar. Namely, they both operate mostly on
    // the elements at the beginning and the end. Compare enqueue/dequeue
    // operations of Queue with append/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * 요소를 제거하지 않고 대기열 맨 앞에 있는 요소를 읽습니다.
   * Read the element at the front of the queue without removing it.
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * 큐의 끝(링크드 리스트의 끝)에 새 요소를 추가합니다.
   * 이 요소는 앞에 있는 모든 요소 후에 처리됩니다.
   * Add a new element to the end of the queue (the tail of the linked list).
   * This element will be processed after all elements ahead of it.
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * 대기열의 맨 앞에 있는 요소(링크드 리스트의 맨 앞)를 제거합니다.
   * 대기열이 비어 있으면 null을 반환합니다.
   * Remove the element at the front of the queue (the head of the linked list).
   * If the queue is empty, return null.
   * @return {*}
   */
  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @param [callback]
   * @return {string}
   */
  toString(callback) {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}
