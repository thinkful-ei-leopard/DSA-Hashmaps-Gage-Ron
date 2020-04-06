const LinkedList = require('./Linked-List');

class HashMapChain {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
  // O(1) CONSTANT TIME
  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }
  // O(1) CONSTANT TIME- for best and average case
  // O{n} LINEAR TIME - for worst case (if you have a collision)
  set(key, value) { 
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);
  
    if(!this._hashTable[index]){
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    }; 
  }
  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }
  
  _findSlot(key) {
    const hash = HashMapChain._hashString(key); // 4
    const start = hash % this._capacity; // 4 % 8, 4
         // i=4; i < 12; i++
    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
    // When you have a collison
    // then create a LinkedList
    // use the index(which was conflicted) AND the key to determine which
    // node operate on
    // we always have to RETURN the index
    //
    // rather than
    // when you hit an index that cant be used
    // 
    // We are using Separate Chaining for our collision resolution mechanism
    // if (slot === undefined || (slot.key === key && !slot.DELETED)) {
    //   let sll = new LinkedList();
    //   // We use a Queue
    //   sll.insertLast();
    //   sll
    // }
  }
  // O(n) for best and average case (because you hae to call set(1) time for each item)
  // O(n^2) for the worst case 
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];
  
    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
  static _hashString(string) {
    let hash = 5381;
    // OR THIS?   for (let i = 0, n = string.length; i < n; i++) { 
    for (let i = 0; i < string.length; i++) { 
      hash = (hash << 5) + hash + string.charCodeAt(i); // bit shifting over 5
      hash = hash & hash; // keep the size within the 2^32 (uses truncating)
    }
    return hash >>> 0;
  }
}
  
module.exports = HashMapChain;