// Greets the world.

console.log("Hello world!");
function greet (person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Brendan", new Date()); // Omitting the 'new' keyword will result in a runtime error in TypeScript, whereas in JavaScript it will not.