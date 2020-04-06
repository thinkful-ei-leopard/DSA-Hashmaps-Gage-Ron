class _Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  find(item) {
    let currNode = this.head;
    if (!this.head){
      console.log('List is empty');
      return;
    }
    while (currNode.value !== item) {
      if(currNode.next === null) {
        console.log('Item not found');
        return;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  findBefore(item) {
    let currNode = this.head;
    if (!this.head){
      console.log('List is empty');
      return;
    }
    if (currNode.value === item) {
      console.log('Item is first in list, nothing before to return.');
      return;
    }
    while (currNode.next.value !== item) {
      if(currNode.next === null) {
        console.log('Item not found');
        return;
      }
      else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  findAtIndex(index) {
    let currNode = this.head;
    for(let i = 0; i < index; i++) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      while (currNode.next !== null) {
        currNode = currNode.next;
      }
      currNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, beforeItem){
    if (this.head === null) {
      this.head = new _Node(item);
    }
    let currentNode = this.find(beforeItem);
    let previousNode = this.findBefore(currentNode.value);
    previousNode.next = new _Node(item, currentNode);
  }

  insertAfter(item, afterItem){
    if (afterItem.next === null) {
      this.insertLast(item);
    }
    let currentNode = this.find(afterItem);
    currentNode.next = new _Node(item, currentNode.next);
  }

  insertAt(item, index){
    if (index === 0 || this.head === null) {
      this.insertFirst(item);
      return;
    }
    let currNode = this.head;
    for (let i = 1; i < index; i++) {
      if (currNode.next === null) {
        console.log(`There are only ${i + 1} items in this list.`);
        return;
      } else {
        currNode = currNode.next;
      }
    }
    this.insertAfter(item, currNode.value);
  }

  remove(item) {
    if (!this.head) {
      console.log('List is empty, no items to remove');
      return;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
}

function size(linkedList) {
  let count = 0;
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
    count++;
  }
  count++;
  return count;
}

function display(linkedList) {
  let count = size(linkedList);
  let list = '';
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    list += (`${currNode.value} -> `);
    currNode = currNode.next;
  }
  list += (`${currNode.value}`);
  return `This list has ${count} items in it, and are linked in this order: ${list}`;
}

function isEmpty(linkedList) {
  if (linkedList.head === null) {
    console.log("True - List is empty");
    return;
  } else {
    console.log(`False - List has ${size(linkedList)} items`);
    return;
  }
}

function findPrevious(linkedList, item) {
  return linkedList.findBefore(item);
}

function findLast(linkedList) {
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  return currNode;
}

function reverseList(linkedList) {
  let firstNode = linkedList.head;
  let prevConsecNode = firstNode.next;
  let consecNode = prevConsecNode.next;
  firstNode.next = null;
  prevConsecNode.next = firstNode;

  while (consecNode.next !== null) {
    firstNode = prevConsecNode;
    prevConsecNode = consecNode;
    consecNode = prevConsecNode.next;
    prevConsecNode.next = firstNode;
  }

  consecNode.next = prevConsecNode;
  linkedList.head = consecNode;
  return display(linkedList);
}

function reverseSecondHalf(linkedList) {
  let count = 1;
  let curr = linkedList.head;
  while (curr.next !== null) {
    curr = curr.next;
    count++;
  }
  curr = linkedList.head;
  for(let i = 1; i < Math.ceil(count /2); i++) {
    curr = curr.next;
  }
  const midRoot = curr;
  let prev = null;
  curr = curr.next;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  midRoot.next = prev;
  return linkedList;
}

function thirdFromEnd(linkedList) {
  let currNode = linkedList.head;
  let count = size(linkedList) - 3;
  for (let i = 1; i < count; i++) {
    currNode = currNode.next;
  }
  return currNode;
}

function middleOfList(linkedList) {
  let listSize = size(linkedList);
  if (listSize % 2 !== 0) {
    return linkedList.findAtIndex(Math.ceil(listSize / 2));
  } else {
    let results = [linkedList.findAtIndex(listSize / 2 - 1), linkedList.findAtIndex(listSize / 2)];
    return results;
  }
}

function cycleInList(linkedList) {
  let cycleTrue = false;
  let pointers = [];
  let currNode = linkedList.head;
  while (currNode.next !== null) {
    if (pointers.includes(currNode.next)) {
      cycleTrue = true;
      break;
    }
    pointers.push(currNode.next);
    currNode = currNode.next;
  }
  return `Cycle in list?: ${cycleTrue}`;
}

function main() {
  let SLL = new LinkedList;
  let empty = new LinkedList;
  let CycleList = new LinkedList;
  //SLL.insertFirst('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertFirst('Helo');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  SLL.insertFirst('Tauhida');
  // SLL.remove('squirrel');
  SLL.insertBefore('Athena', 'Boomer');
  SLL.insertAfter('Hotdog', 'Helo');
  SLL.insertAt('Kat', 1);
  //SLL.remove('Tauhida');
  CycleList.insertFirst('Gage');
  CycleList.insertLast('Charles');
  CycleList.insertLast('Robert');
  CycleList.insertLast('Ethan');
  CycleList.insertLast('Jeff');
  let loopNode = CycleList.findAtIndex(1);
  let last = findLast(CycleList);
  last.next = new _Node('Loop!', loopNode);
  return display(reverseSecondHalf(SLL));
}

module.exports = LinkedList;