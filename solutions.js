//The last question is done here first - implementing a hasmap using seperate chaining so we can use the hashmap in solving the other problems

//==================================================================
//Write a hash map implementation which uses separate chaining.
class _Node {
    constructor(key=null,value=null,next=null){
        this.key=key;
        this.value=value;
        this.next=next;
    }

}

class HashMap {
    constructor(initialCapacity=8) {
        this._length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        //this._deleted = 0;
    }
    //_findSlot(key, retrieve) {
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        //let slot = this._hashTable[index];
        //Fast path - no chain to follow.
        /*
        if (!slot) {
            return this._hashTable[index] = {key};
        }
        if (slot.key === key) 
            return slot;
        //Slow path - follow the chain.
        while (slot.next) {
            slot = slot.next;
            if (slot.key == key) 
                return slot;
        }
        */
        //We reached the end of the chain without finding the key.
        //Error out, or create a new slot at the end of the chain.
        //return slot.next = {key};
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
     _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        //this._deleted = 0;
        this._hashTable = [];
        for (let i=0; i<oldSlots.length; i++)
            for (let slot = oldSlots[i]; slot; slot = slot.next) {
                if (!slot.deleted)
                    //copy to a new array
                    this.insert(slot.key, slot.value);
            }
                
    }
    insert(key, value){
        const loadRatio = (this._length + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        console.log(this._hashTable[index])
        if(this._hashTable[index] === undefined){
            //this._hashTable[index] = new _Node(key, value, null);
            this._hashTable[index] = {}
            this._hashTable[index].next = new _Node(key, value, null);
            this._length++;
        }
        else{
            let node = this._hashTable[index];
            while(node.next !== null && node.key !== key){
                node = node.next;
            }
            if(node.key === key){
                node.value = value;
                this._length++;
            }
            else{
                node.next = new _Node(key,value, null);
                this._length++;
            }
        }
    }



    remove(key){
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        let previous= null;
        let current = this._hashTable[index];

        if(this._hashTable[index] !== undefined){ 
            while(current.next !== null && current.key !== key){
                previous = current;
                current = current.next;
            }
            if(current === null){
                console.log('Item not found');
                return;
            }
            if()
            if(current.key === key){
                previous.next = current.next;
                this._length--;
            }

        }
    
    }
    get(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;
        if (this._hashTable[index] === NULL){
            return -1;
        }
        else {
            let node = this._hashTable[index];
            while (node !== NULL && node.key !== key){
                node = node.next;
            }
            if (node === NULL)
                  return -1;
            else
                  return node.value;
    }

}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;


module.exports = HashMap;
/****************************************/
const HashMap = require('./Hashmaps')

function main(){
    
    let hTable = new HashMap();
    let names = [{Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, {Human:"Aragon"},
    {Elf: "Legolas"}, {Maiar:"The Necromancer"}, {Maiar: "Sauron"}, {RingBearer: "Gollum"},
    {LadyOfLight: "Galadriel"}, {HalfElven: "Arwen"}, {ShepherdOfTheTrees: "Treebeard"}];
    
    for (let i = 0; i < names.length; ++i) {
      for (let keys in names[i]){
        hTable.set(keys,names[i][keys]);
      }
    }
    console.log(hTable);
}

main();

/**********************************************/
//DO NOT run the following code before solving the problem.
//What is the output of the following code? explain your answer.
const HashMap = require('./Hashmaps')

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

WhatDoesThisDo();

//The keys are the same - Therefore, it will hash the first key str1 (and its value 10) and since the
//2nd key is the same it will override the value to 20.

/*************************************/

/*
3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. 
use any drawing app or simple pen and paper *

************

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 
into a hash map of length m = 11 using open addressing and a hash function k mod m.
************

| 22 | 88  |   |   | 4  | 15  | 28 | 17  | 59 | 31 |  10
-----------------------------------------------------------
  0    1     2   3   4    5     6    7     8    9     10

15 has a collision so it will go to slot 5
17 has a collision and will go to slot 7
88 has a collision and will go to slot 1
59 has a collision and will go to slot 8


2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 
into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.




*/

/**********************************/
/* Implement a function to delete all duplicated characters in a string and 
keep only the first occurrence of each character. 
For example, if the input is string “google”, the result after deletion is
“gole”.
*/

function RemoveDuplicates(str){
    let map = new Map();
    let nonDupe = '';
    for(let i=0; i<str.length; i++){
        if(!map.has(str[i].toLowerCase())){
            map.set(str[i])
            nonDupe+=str[i];
        }
    }
    return nonDupe;
}
console.log(RemoveDuplicates('google all that you think can think of'))

//gole athyuinkcf
//can you explain why you don't have it as "gole a th yu ink c f"?
//   ----- because space is counted as a valud key and its duplicates are removed

// /**********************************/
// Write an algorithm to check whether any permutation of a string is a
// palindrome (a string which reads the same forwards and backwards).
// There are many ways to solve this problem.
// YOu can create a containKey method, OR
// You can use try/catch
// */
function coantainsKey(hTable, key){
    for(let i=0; i<hTable.hashTable.length; i++){
        if(hTable.get(key)){
            return true;
        }
    }
    return false;
}

function PermutationString(string){
    let oddChar = false;
    let hm = new HashMap();
    for(let i=0;i<string.length;i++){
        if(coantainsKey(hm,string[i])){
            let value = hm.get(string[i])
            hm.insert(string[i],(value+1))
        }
       else{
            hm.insert(string[i],1);
       }
    }
     for (let i = 0; i < hm.hashTable.length; i++){ 
       for (let keys in hm.hashTable[i]){
            if (hm.hashTable[i][keys] & 1){
                if (oddChar){
                    return false;
                } 
	    oddChar = true;
            }
        }  
     }
        
     displayHashMapKeys(hm);
     return true;;
}

// YOu can also use JS Map() class
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/

function isItPalindrome(string){
    let oddChar = false;
    let hm = new Map(); //JS built in HashMap
    let value;
    for(let i=0;i<string.length;i++){
        if(hm.has(string[i])){
            let value = hm.get(string[i]);
            hm.set(string[i],(value+1));
        }
        else{
            hm.set(string[i],1);
       }
    }
    const iterator = hm.values(); //just getting the values
    if(Math.floor(iterator.next().value) % 2 !== 0){
        oddChar = true;
    }
    if(oddChar) return false;
    return true;
}

//here is another version
const palindromic = (word) => {
    const unpaired = new Map();
    for (let character of word) {
        if (unpaired.has(character)) {
            unpaired.delete(character);
        } else {
            unpaired.set(character, true);
        }
    }
    return unpaired.size <= 1;
}

function mainPalindromString(){
    //console.log(PermutationString('madam'));
    console.log(PermutationString('cllic'));
    //console.log(PermutationString('aaxxis'));
    //console.log(PermutationString('caabl'));
}

mainPalindromString();
//*******************************************************************
//Write an algorithm to group a list of words into anagrams.

function _sortword(word) {
	//Helper function: sort a word into some form of canonical order.
	//The exact order is insignificant and need not be lexicographical,
	//as long as it is utterly consistent: any two anagrams of the same
	//letter sequence must return the same string.
	return word.split('').sort().join('')
}
function group_into_anagrams(words) {
    let anagrams = new Map(), ret = [];
    for (let word of words) {
        let key = _sortword(word); //east 
        if (anagrams.has(key)){
            anagrams.get(key).push(word);
        } 
        else {
          ret.push(anagrams.set(key, [word]));
        }
    }
    return ret;
}

//You can use Map() class

const sort = (word) => word.split('').sort().join('');

const anagrams = (words) => {
    const groups = new Map();
    words.forEach(word => {
        const sorted = sort(word);
        const group = groups.get(sorted) || [];
        groups.set(sorted, [...group, word]);
    })
    return Array.from(groups.values());
};

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
/* should output:
[ [ 'east', 'teas', 'eats' ],
  [ 'cars', 'arcs' ],
  [ 'acre', 'race' ] ]
*/