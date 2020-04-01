This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TASK

Branches:
- result-redux - Final implementation of all step below using Redux
- result-mobx-mst - Final implementation with MST (Mobx-State-Tree)
- demo-begins - Product Counter demo app - starting point, clean React (state and props)
- demo-results - Product Counter demo app - Redux version
- demo-results-items-to-buy - Product Counter demo app - more complex Redux multi-component version with router (to demonstrate shared state across multiple components)
- demo-results-items-to-buy-mobx - Same as above but with Mobx - WIP

Extend the initial application with the following functionality:
- Implement create product form
- Implement update product form
- Implement delete product functionality
- Implement update product functionality
Each form should be implemented on the new page.
The create and update product forms should have the following validation:
- Name is required, length not greater than 200
- Rating is required, integer, not greater than 10
- A product should have from 1 to 5 categories
- If a product has an expiration date it should expire not less than 30 days since now
- If a product rating is greater than 8 it should automatically become “featured” product

## Available Scripts

In the project directory, you can run:

### `npm run start`
