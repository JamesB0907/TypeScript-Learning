// If you hover over the variable, you will see the type of the JavaScript variable even in a .ts file
let helloWorld = "Hello World";

// Defining Types:

    // Object with inferred type:

const userImplicit = {
    name: "Hayes",
    id: 0,  
}

    // Or you can explicity define the type:

interface User {
    name: string;
    id: number;
}

const userExplicit: User = {
    name: "Hayes",
    id: 0,
};

    // If you provide an object that doesn't match the interface you defined, TypeScript will warn you:

/*
const userWhoops: User = {
    username: "Hayes2", // Whoops!
    id: 1,
}
*/

    // JS Classes work just fine in TypeScript:

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user: User = new UserAccount("Murphy", 1); //This works!

// The parameters inside function are also annotated with types:

function deleteUser(user: User) {
    // ...
}

// The syntax below is called a "Union Type". This function can accept either a User or a number:
function getAdminUser(): User { 
    // Placeholder to remove error:
    return {
        name: "Admin",
        id: 3,
    }
}

// Composing Types:

    //Unions:

type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5| 7 | 9;

    //Unions also handle other types like when you have a function that returns different types based on a condition:

function getLength(obj: string | string[]) {
    return obj.length;
}

    // Use the 'typeof' operator to get the type of a variable or property which already exists in vanilla JS

    // Here is a function that returns a different value depending on the type of the argument:

function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}

    // Generics:

    // You can declare your own types that use generics:

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

// This line is a shortcut to tell TypeScript there is a constant called 'backpack', and to not worry about where it came from:
declare const backpack: Backpack<string>;

// object is a string, because we declared it above as the variable part of Backpack:   

const object = backpack.get();

// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.add(23); // Error!

// >> Argument of type 'number' is not assignable to parameter of type 'string'.

backpack.add("23"); // This works!

// Structural Type System:

    // If two objects have the same shape (meaning the types contained within the object) then these object are considered to be themselves of the same type:

interface Point {
    x: number;
    y: number;
}

function logPoint (p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

    // The point variable is not declared as a Point type, but it is given the same type as Point because it has the same shape.

    // The shape-matching only requires a subset of the object's fields to match:

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };