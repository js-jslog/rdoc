# RDoc
A block comment specification and documentation generation program based on rtypes

Rtypes offer an expressive way of representing function signatures and defining types & interfaces in JavaScript code.

RDoc allows developers to make use of Rtypes in expressive block comments which can generate documentation and also open the potential for powerful browser/IDE tooling.


# Comparison with RFX
RFX provides developers with the same benefits listed above with the added benefit that code written in RFX is effectively _self documenting_. There are also potential performance benefits driving the project.

For existing code, or new projects which cannot employ RFX, RDoc will offer a familiar pattern of block comment documentation similar to JSDoc, but with enhanced readability & maintainability in code, richer generated docs & powerful tooling potential.
 
# Block comment
```javascript
/**
 * (Number, Number) => Number
 * doc: Add two numbers together
 */
 let add = (op1, op2) => op1 + op2;
```
 
# Complex types
#### data_types.rtype
```
 interface AppInitOptions {
    cacheReservedMb   = 34,
    databaseTimeoutMs = 1200
 }
//In this case we need a warning when the developer doesn't develop a default of cacheReserved into the function implementation
```
#### js file
```javascript
 /**
  * (AppInitOptions)
  * doc: Initialise application
  */
 let application.init = (options) => {
     application.cacheReservedMb   = (options.cacheReservedMb   || options.cacheReservedMb   = 34);
     application.databaseTimeoutMs = (options.databaseTimeoutMs || options.databaseTimeoutMs = 1200);
     application.start()
 }
```
# Requires
The requires keyword makes it immediately clear where dependencies exist within code
```javascript
/**
 * (Number, Number) => Number
 * doc: Add two numbers together
 */
 let add = (op1, op2) => op1 + op2;

 /**
  * (Number) => Number, requires: add
  * doc: Double a number
  */
 let double = (op) => add(op, op);
```

This works equally well with imported libraries
```javascript
 import math.js from mathjs

 /**
  * (Number) => Number, requires: mathjs.chain, mathjs.add
  * doc: Double a number
  */
 let double = (op) => mathjs.chain(op).add(op);
```
