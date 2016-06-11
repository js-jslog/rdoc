# RDoc
A block comment specification and documentation generation program based on rtypes

# Relation to Rtypes
Rtypes offer an expressive way of representing function signatures and defining types & interfaces in JavaScript code.

RDoc allows developers to make use of Rtypes in expressive block comments which can generate documentation and also open the potential for powerful browser/IDE tooling.

# Comparison with RFX
RFX provides developers with the same benefits listed above with the added benefit that code written in RFX is effectively _self documenting_. There are also potential performance benefits driving the project.

For existing code, or new projects which cannot employ RFX, RDoc will offer a familiar pattern of block comment documentation similar to JSDoc, but with enhanced readability & maintainability in code, richer generated docs & powerful tooling potential.
 
# Block comment
The block comments are a natural and established way to want to document your code. But the comments you write bear little resemblance to the code they describe, and they require a lot of text which both make them difficult to maintain.
### Old 'n' busted
```javascript
/**
 * Add two numbers together
 *
 * @function add
 * @param  {number} op1
 * @param  {number} op2
 * @return {number}
 *
 * (Not too readable. Not javascript native. Difficult to maintain)
 */
 let add = (op1, op2) => op1 + op2;
```
### Other hotness
```javascript
/**
 * (Number, Number) => Number
 * doc: Add two numbers together
 */
 let add = (op1, op2) => op1 + op2;
```
 
# Complex types
With the ability to define interrelated, custom types either in specialised variables within the file or in external .rtype files, the descriptive potential is apparent.
#### data_types.rtype
```javascript
 interface Transaction {
     id          : String,
     session     : Session,
     db_conn     : DatabaseConnection,
     rowsAffected: [Key]
 }
 interface DatabaseConnection {
     id: String,
     host: String,
     user: String,
     pass: String
 }
 interface Session {
     id: String
 }
 interface Key : String
```
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
