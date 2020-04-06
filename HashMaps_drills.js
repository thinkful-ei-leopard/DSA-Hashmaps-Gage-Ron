const HashMap = require('./HashMap');

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
};

function removeDupes(string) {
  let noDupes = new HashMap;

  // CURRENTLY: Key: string letter, Value: order it was over written (or entered)
  for(let i = string.length - 1; i >= 0; i--) {
    noDupes.set(string[i], i);
  }
  return noDupes._hashTable.sort((x, y) => x.value - y.value).map(x => x.key).join('');
}

function main() {
  // Once the MAX_LOAD_RATIO is EXCEEDED, then we increase the capacity by SIZE_RATIO
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;
  let lotr = new HashMap;
  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo'); // overwriting, not colliding. Since they both have the key "Hobbit"
  lotr.set('Wizard', 'Gandalf'); 
  lotr.set('Human', 'Aragorn'); 
  lotr.set('Elf', 'Legolas'); 
  lotr.set('Maiar', 'The Necromancer'); 
  lotr.set('Maiar', 'Sauron'); 
  lotr.set('RingBearer', 'Gollum'); 
  lotr.set('LadyOfLight', 'Galadriel'); 
  lotr.set('HalfElven', 'Arwen'); 
  lotr.set('Ent', 'Treebeard');
  return lotr;
}

//WhatDoesThisDo();
//console.log(removeDupes('abcb'));
console.log(removeDupes('google'));
//console.log(main());