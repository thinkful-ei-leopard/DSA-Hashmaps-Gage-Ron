const HashMap = require('./HashMap');

function removeDupes(string) {
  let noDupes = new HashMap;
  for(let i = 0; i < string.length; i++) {
    console.log('stuff');
  }
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

console.log(main());