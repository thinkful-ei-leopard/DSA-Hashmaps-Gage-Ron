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

function palindrome(string){
  // INPUT: acecarr
  // racecar
  // OUTPUT: TRUE

  // INPUT: north
  // OUTPUT: false
  // DEFININTION:
  // not only a "paired" mirror letter (excpet possible center)
  // but also, they need to be distanced according to their pair (MIRRORED)
  // EXCEPT for the possible center, all letters need to occur in pairs of 2 and be spaced in a MIRROR 
  // we dont care if its actually an english word
  // we dont care about it being mirrored as input, because we just need ANY PERMUTATION 


  let permPalin = new HashMap;
  // INPUT: key: letter, value: # of times occured?
  // if they are mirroring, then the length of the hashmap must be 1/2 the length of string or 1/2 string rounded up
  
  //permPalin.set(key, value); 
  // d a d
  for(let i=0; i < string.length; i++){
    permPalin.set(string[i], i);
  }
  return permPalin;
}

function separateChaining(){
    
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
//console.log(removeDupes('google'));
console.log(palindrome('racecarebbhhzzyyn'));
aboba 2n || 2n + 1 (technically 4n, 6n, 8n) abbccddeeffgghh
//console.log(main());