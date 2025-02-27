// THE BASICS

    // Every value's behavior in JavaScript can be observed by running a different operation on it. Example:

    const message = 'Hello World';
    // Accessing the property 'toLowerCase' on 'message and then calling it
    message.toLowerCase();

    // Calling 'message'
    //message(); // TypeError: message is not a function

    // Now let's say message was define at the top of the file (look at the top of the file)

    // If 'message' is assigned to a string it is no longer callable(note the error on line 8)

    // In vanilla JavaScript, primitves can be identified at runtime using the 'typeof' operator. But for functions and other more complex types there is no corresponding way to identify them at runtime. Example:

    function fn(x) {
        return x.flip();
    }

    // Just by actually reading the function we can see that it expects object 'x' so that it can perform the 'flip' operation, but while the code it running the only way in vanilla JavaScript that we can tell what it does is by executing it and observing the error.

    // A personal example: Not knowing the execution context of a function might be frustrating when you are taking over someone else's codebase. You might have to read through the entire codebase to understand what the function does and what it expects.

    // Here we introduce a concept called 'type' which is a set of values and operations that a value can have. These values can be passed to 'fn' or they will crash. JavaScript provides 'dynamic typing' (just running the thing and seeing what works)

    // TypeScript provides 'static typing' which allows us to catch these errors at compile time. TypeScript can infer the type of a value by looking at the value itself.

// STATIC TYPE-CHECKING

    // JavaScript is limited by the fact that we need to run the code over and over to isolate the error.

    // Static types systems describe the shapes and behaviors of what our values will be when we run our programs. TypeScript is a static type system.

    // The error above in Typescipt would look like this:
    // This expression is not callable. Type 'string' has no call signatures.

// NON-EXCEPTION FAILURES

    // Runtime errors occur when JavaScript runtime finds and points out something nonsensical in the code. Example:

const user = {
    name: "Daniel",
    age: 26,
};

// user.location; // undefined

    // JavaScript will not immediately catch the error above. Since we are in a TypeScript file, though, the error will be caught at compile time.

    // Typos:

const announcement =  'Hello World';

// announcement.toLocaleLowercase();
// announcement.toLocalLowerCase();

announcement.toLocaleLowerCase();

    //Uncalled functions:

function flipCoin() {
    // Meant to be Math.random()
    // return Math.random < 0.5;
} // Operator '<' cannot be applied to types '() => number' and 'number'

    //Basic Logic Errors:

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
    // ...
// } else if (value === "b") { // This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
    // Oops, unreachable
}

// TYPES FOR TOOLING

    // TypeScript can be used to provide tooling for JavaScript. Example:

 /*
import express from 'express';
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World'); // With TypeScript tooling typing "se.." will suggest "send"
});

app.listen(3000, function () {
    console.log('App is listening on port 3000');
});
*/

// tsc, THE TYPESCRIPT COMPILER

    // npm install -g typescript

    // With this command we can compile TypeScript files to JavaScript files. Example:

    // See hello.ts for tsc illustration

// EMITTING WITH ERRORS

    // tsc will by default emit JavaScript even when there are type errors.

    // You can add an optional flag to stop this behavior:
    //tsc --noEmitOnError hello.ts

    // ERROR:
    /*
        hello.ts:8:1 - error TS2554: Expected 2 arguments, but got 1.

        8 greet("Brendan");
        ~~~~~

        hello.ts:4:24
            4 function greet(person, date) {
                                ~~~~
            An argument for 'date' was not provided.

        Found 1 error in hello.ts:8
    */

// EXPLICIT TYPES

    // Here we updated the hello.ts file to include explicit types and provide a second argument to illustrate the error catching abilities of TypeScript.

    // We do not always have to provide explicit types. Sometimes these can be inferred.

    let msg = 'hello there'; // This will not throw an error.

// ERASED TYPES

    // Now let's see what JavaScript is outputted when we compile the TypeScript file. (refer to hello.js)

    // The TypeScript compiler will erase all types when it compiles to JavaScript.

// DOWNLEVELING

    // In regards to the differences between using template literal and normal strings, the TypeScript compiler will downlevel the template literal to a normal string.

    // This is because TypeScript specifically targets ES5 which was before the introduction of template literals.

    // We can add a flag to the tsc command to target the version of ECMAScript that we want to compile to. Example:

    // tsc --target es2015 hello.ts

// STRICTNESS

    // TypeScript allows for different levels of tooling for users who want to use TypeScript in different ways.

    // Some users only want the bare minimum of type-checking while others want the most strict type-checking possible.

    // In instances of stricter versions, flags can be added to the tsc command to enforce these rules.

// noImplicitAny

    // This flag will throw an error when TypeScript cannot infer a type.

    // Example:
    function fn1(arg) {
        return arg;
    } // tsc --noImplicitAny the-basics.ts

    // This will throw an error because TypeScript cannot infer the type of 'arg'.

// strictNullChecks

    // This flag will throw an error when a variable is not explicitly defined as nullable.

    // Example:
    let x = 10;
    // x = null; 
    // tsc --strictNullChecks the-basics.ts

    // // This will throw an error because 'x' is not explicitly defined as nullable.

// END - Move to everyday-types.ts