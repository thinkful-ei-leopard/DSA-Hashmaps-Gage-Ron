
class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
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
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
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
  // We are using Open Addressing for our collision
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
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity; // 345783 % 10 = 3

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
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

module.exports = HashMap;