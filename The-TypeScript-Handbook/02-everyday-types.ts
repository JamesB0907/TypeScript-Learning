// EVERYDAY TYPES

//PRIMITIVE TYPES
// We know 'em, we love 'em. Primitives are the most basic data types in TypeScript. They include:
// - string
// - number
// - boolean

// Here is how we can explicitly declare them in TypeScript (not necessary, but good practice):
let myString: string = "Hello, TypeScript!";
let myNumber: number = 42;
let myBoolean: boolean = true;

// ARRAYS

// Arrays in TypeScript can only contain elements of a single type. You can declare an array of strings like this (also not necessary as the compiler will infer the type from the values):
let stringArray: string[] = ["apple", "banana", "cherry"];

// ANY
// Uh oh, the dreaded 'any' type. This is a type that can hold any value, and it effectively turns off type checking for that variable. It's generally best to avoid using 'any' unless absolutely necessary, as it defeats the purpose of TypeScript's type system.

//Here's the example from the handbook, that shows how 'any' type can be problematic:

let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo(); // no error despite foo not existing on obj
obj(); // no error despite obj not being callable
obj.bar = 100; // no error despite bar not existing on obj
obj = "hello"; // no error despite being a string now
const n: number = obj; // no error despite obj being a string at this point

// noImplicitAny
// Use this flag to raise errors on 'any' types

// TYPE ANNOTATIONS ON VARIABLES
// As shown above (see primitive types), you can optionally annotate variables with a type at time of declaration.

// FUNCTIONS

// The parameters of every function in TypeScript, at time of construction, must be annotated with a type.

// Parameter type annotations:
function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}

const arrowGreet = (name: string) => {
    console.log("Hello, " + name.toUpperCase() + "!!");
}

// greet(42) // This will throw an error because 42 is not a string. TypeScript enforces the type of the parameter.

// Return type annotations:
function getFavoriteNumber(): number {
    return 26;
}

// Both?

function add(x: number, y: number): number {
    return x + y;
}

// Anonymous functions

// TypeScript contextually infers anonymous callback parameter types from the call site.
// For example, the parameter 's' in the following function is inferred to be of type string because it is used in a context where a string is expected (the forEach method of an array of strings).

const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});

//Contextual typing also applies to arrow functions
names.forEach((s) => {
    console.log(s.toUpperCase());
})

// OBJECT TYPES
// When add an object as a parameter to a function, you must also annotate the types of each value related to the object's properties.

//The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// Optional Properties
// Similar to how you can optionally call the property of an object with the '?' operator, you can also optionally annotate a property of an object type with the '?' operator. This means that the property may or may not be present in the object.

function printName(obj: { first: string; last?: string }) {
    // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// Back to using object options, if you're not sure if a property will exist you have to add a check to see if it exists before using it. This is because TypeScript will throw an error if you try to access a property that may not exist.

function printName2(obj: { first: string; last?: string }) {
    //Error - might crash if 'obj.last' wasn't provided!
    // console.log(obj.last.toUpperCase());
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax
    console.log(obj.last?.toUpperCase());
}

// Union Types
// Speaking of optional properties, you can declare a parameter to be either one type or another using the '|' operator.

function printId(id: number | string) {
    console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 });

// You can also add more than 2 options. The preferrence for writing this looks like this:

function printTextOfNumberOfBool(
    textOrNumberOrBool:
        | string
        | number
        | boolean
) {
    console.log(textOrNumberOrBool);
}

// Working with Union Types
// Because you are speculating on the type a parameter may take, you need to solve the ambiguity with more code.

function printId2(id: number | string) {
    // console.log(id.toUpperCase()); // Because this only performs actions on strings, TypeScript will throw an error because it doesn't know if 'id' is a string or a number.
}

function printId3(id: number | string) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    } else {
        // Here, id is of type 'number'
        console.log(id);
    }
}

// You can do the same with arrays using the mothod "Array.isArray()". This will check if the parameter is an array or not.

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]' 
        console.log("Hello, " + x.join(" and "));
    } else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}

// Sometimes by apparent coincidence, can have two types that can be used the same way. '.slice()' works on both strings and arrays, so TypeScript allows you to call it without any errors.
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

// TYPE ALIASES
// If we want to reuse the above logic - accepting more than one type - we can break it out and name it for later use, just the way we refactor functions. This is called a type alias, and it is declared with the 'type' keyword.

type Point = {
    x: number;
    y: number;  
} // We for this type as an object with explicitly declared properties. We can now use this type alias in our function parameter.

function printCoord2(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

// For primitives:
type ID = number | string;

// Using an alias is exactly like using the type assigned to it.

// Below we a assume sanitize() and getInput() exist. I've made placeholder implentations to make this code compile, but you can ignore them for now.
const sanitize = (str: string) => str.trim();//placeholder
const getInput = () => "   user input   ";//placeholder

// Example code from the handbook:
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
    return sanitize(str);
}
// Create a sanitzed input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = "new input";

// INTERFACES
// Interfaces are from JavaScript,but they are also a way to name an object type:
interface Point2 {
    x: number;
    y: number;
}

function printCoord3(pt: Point2) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

// Differences Between Type Aliases and Interfaces
// In short: Types can not be re-opened to admit new properties whereas an interface is always extendable

// Theoretical getBear()
const getBear = (): Bear => {
    return { name: "Winnie", honey: true };
}
// Extedning and Interface
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

// Extending a type via intersections
type Animal2 = {
    name: string;
}

type Bear2 = Animal2 & {
    honey: boolean;
}

const bear2 = getBear();
bear.name;
bear.honey;

// Adding new Fields to an existing interface
type TypeScriptAPI = any; // Placeholder for TypeScriptAPI
// Actual example code
interface Window {
    title: string;
}

interface Window {
    ts: TypeScriptAPI; // Assumes TypeScriptAPI is defined somewhere
}

const src = 'const a = "Hello, World"';
window.ts.transpileModule(src, {})

// A type cannot be changed after being created
type Window2 = {
    title: string;
}
/*
type Window2 = {
    ts: TypeScriptAPI; // This will throw an error because Window2 has already been defined
}
*/

// TYPE ASSERTIONS
// Type assertions are a way to tell the TypeScript compiler "trust me, I know what I'm doing." They are a way to override the inferred type of a variable. This can be useful when you know more about the type of a variable than TypeScript does.

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// These assertions are purely for the purposes of giving more information to the compiler for later reference. They do not change the runtime behavior of the code. In fact, they are completely removed from the emitted JavaScript code.

// If the code is specifically not tsx, you can also use angle-bracket.

const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
