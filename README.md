# YAGRO Technical Test

This repository contains a solution for the YAGRO Junior Software Engineer technical test. The project simulates a conveyor belt system where components are picked up and assembled into finished products by two workers.

## Assumptions

- **Component Assignment**:  
  When both workers are available to pick up a component, the component is randomly assigned to one of the workers.

- **Counting Finished Products**:  
  Finished products and unused items are counted at the last slot of the conveyor belt once the number of movements in the simulation has been reached.

- **Finished Product Placement**:  
  Finished products can only be placed in an empty slot on the conveyor belt.

## How to Run the Application

To run this project locally, follow these steps:

1. **Initialize the project:**

   ```bash
   npm init
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   node index.js
   ```

4. **View the results:**
   The results, including finished product counts and unused items, will be printed to the terminal.

## Running Tests

This project uses Jest for unit testing. To run the tests, follow these steps:

1. **Install Jest:**

   ```bash
   npm install --save-dev jest
   ```

2. **Run the tests:**

   ```bash
   npm test
   ```

3. **View the test results:**
   Test results will be displayed in the terminal, indicating the success or failure of individual tests.

---
