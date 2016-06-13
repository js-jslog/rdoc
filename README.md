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
# Requires
The `requires` keyword makes it immediately clear where dependencies exist within code
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
import mathjs from mathjs;

/**
 * (Number) => Number, requires: mathjs.chain, mathjs.add
 * doc: Double a number
 */
let double = (op) => mathjs.chain(op).add(op);
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
    id  : String,
    host: String,
    user: String,
    pass: String
}
interface Session {
    id     : String,
    basket?: [ProductId]
}
interface PageSubmitResult {
    result_code    : String,
    result_message?: String
}
interface ProductId : Number
interface Key : String
```
### purchase_page.js
```javascript
import page from page;

let purchase_page = Object.create(page, {id: 'purchase_page'});

/**
 * (Transaction, Session) => PageSubmitResult, requires: db.update, throws: NoConnectionError
 * doc: Check stock levels and customer credit, then update stock levels & custom credit
 */
purchase_page.purchase = (trans, session) => {
    let result = /* busines logic to take session's basket, perform the appropriate check's & update's and create result */ 
    return result;
}
```
# More complex types
Here's another example. Without information on what form the data being returned from this nested set of functions, a developer would need to investigate the details of the implementation to know how to deal with the resturned  object.
```javascript
interface Service: String
interface Month: Date
interface Day: Date
interface Cost: Number

interface CostPerService: Dictionary[Service, Cost]
interface CostPerServicePerDay: Dictionary[Day, CostPerService]
interface CostPerServicePerMonth: Dictionary[Month, CostPerService]
```
```javascript
/**
 * (Date,  Date) => CostPerServicePerMonth, requires: getCostData, aggregateCostDataByMonth
 */
let getCostDataByMonth = (startDate, endDate) => {
    let firstDay = // get the first day of the startDate month
    let lastDay  = // get the last day of the endDate month
    let allCostData = getCostData(firstDay, lastDay);
    let aggCostData = aggregateCostDataByMonth(allCostData);
    return aggCostData;
}
/**
 * (Day,  Day) => CostPerServicePerDay
 */
let getCostData = (firstDay, lastDay) => {
    let resultSet = {};
    let query = // perform a query to get all rows of effort record between the two dates
    while (query.next()) {
        let serviceName = query.get("service");
        let day = query.get("date");
        let cost = query.get("cost");
        if (serviceName] === undefined) {
            resultSet[serviceName] = {};
        }
        if (resultSet[serviceName][day] === undefined) {
            resultSet[serviceName][day] = cost;
        } else {
            resultSet[serviceName][day] += cost;
        }
    }
}
/**
 * (CostPerServicePerDay) => CostPerServicePerMonth
 */
let aggregateCostDataByMonth = (csd) => {
    let resultSet = {};
    for (let key_service of Object.keys(csd)) {
        if (resultSet[key_service] === undefined) {
            resultSet[key_service] = {};
        }
        for (let key_date of Object.keys(csd[key_service])) {
            if (resultSet[key_service][new Date(key_date).getMonth()] === undefined) {
                resultSet[key_service][new Date(key_date).getMonth()] = csd[key_service][key_date];
            } else {
                resultSet[key_service][new Date(key_date).getMonth()] += csd[key_service][key_date];
            }
        }
    }
    return resultSet;
}
```