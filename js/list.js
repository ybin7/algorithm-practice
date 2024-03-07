class NodeItem {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class NodeList {
  constructor() {
    this.head = null
  }

  /**
   * 插入链表
   */
  insetAtTail(val) {
    const newNode = new NodeItem(val)

    if (!this.head) {
      this.head = newNode
      return
    }

    let currentNode = this.head

    while(currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
  }

  display() {
    let currentNode = this.head

    while(currentNode) {
      console.log(currentNode.val)
      currentNode = currentNode.next
    }
  }

  find(val) {
    let currentNode = this.head

    while(currentNode) {
      if (currentNode.val === val) {
        return currentNode
      }
      currentNode = currentNode.next
    }

    return null
  }

  delete(val) {
    if (this.head === null) {
      return
    }
    if (this.head.val === val) {
      this.head = this.head.next
      return val
    }
    let preNode = null
    let currentNode = this.head
    while(currentNode) {
      if (currentNode.val === val) {
        preNode.next = currentNode.next
        return currentNode.val
      }
      preNode = currentNode
      currentNode = currentNode.next
    }
  }
}

const myNode = new NodeList()

for (let i = 1; i < 10; i++) {
  myNode.insetAtTail(i)
}

console.log('delte', myNode.delete(1))
 
myNode.display()
