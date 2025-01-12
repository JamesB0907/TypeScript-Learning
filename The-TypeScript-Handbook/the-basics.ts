// THE BASICS

    // Every value's behavior in JavaScript can be observed by running a different operation on it. Example:

    const message = 'Hello World';
    // Accessing the property 'toLowerCase' on 'message and then calling it
    message.toLowerCase();

    // Calling 'message'
    message(); // TypeError: message is not a function

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

    