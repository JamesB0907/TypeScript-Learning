// NARROWING

function padLeft(padding: number | string, input: string): string {
    if (typeof padding === "number") {
   return " ".repeat(padding) + input;
    }
    return padding + input;
}

// typeof TYPE GUARDS

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // // for (const s of strs) { // You can't check null with typeof
    //   console.log(s);
    // }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

// TRUTHINESS NARROWING

// Falsy values:
/*
    0
    NaN
    "" (the empty string)
    0n (the bigint version of zero)
    null
    undefined
*/

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// false && false = false
// false && true = false
// true || false = true
// true || true = true

// EQWUALITY NARROWING

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();    
// (method) String.toUpperCase(): string
    y.toLowerCase();     
// (method) String.toLowerCase(): string
  } else {
    console.log(x);            
// (parameter) x: string | number
    console.log(y);         
// (parameter) y: string | boolean
  }
}

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);                    
// (property) Container.value: number
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

// The 'in' operator narrowing

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

type Fish2 = { swim: () => void };
type Bird2 = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move2(animal: Fish2 | Bird2 | Human) {
  if ("swim" in animal) {
    animal;
// (parameter) animal: Fish | Human
  } else {
    animal;
// (parameter) animal: Bird | Human
  }
}

// instnanceof narrowing

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
               
// (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
               
// (parameter) x: string
  }
}

// ASSIGNMENTS

let x2 = Math.random() < 0.5 ? 10 : "hello world!";
// let x: string | number
x2 = 1;
console.log(x);       
// let x: number
x2 = "goodbye!";
console.log(x);  
// let x: string

let x3 = Math.random() < 0.5 ? 10 : "hello world!";
// let x: string | number
x3 = 1;
console.log(x3);     
// let x: number
// x3 = true;
// Type 'boolean' is not assignable to type 'string | number'.
console.log(x3);        
// let x: string | number

// CONTROL FLOW ANALYSIS

function example2() {
  let x4: string | number | boolean;
  x4 = Math.random() < 0.5;
  console.log(x4);   
// let x4: boolean
  if (Math.random() < 0.5) {
    x4 = "hello";
    console.log(x4);      
// let x4: string
  } else {
    x4 = 100;
    console.log(x4);            
// let x4: number
  } 
  return x4;
// let x4: string | number
}

// USING TYPE PREDICATES

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
// let pet =  getSmallPet();
 
// if (isFish(pet)) {
//   pet.swim();
// } else {
//   pet.fly();
// }


