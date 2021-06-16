# Nuvalence Rectangles Problem

## Requirements
- Node v14.15.0 or above
  - **Note**: May work with versions below this, but I have not tested that.

## How to Run
In the root directory, run `npm install`.

There is a simple harness that will allow you to run the code with either custom test cases, or some sample test cases. You can run it by using the command `npm run start`.

You can also run the tests by using `npm run test`. 

## Files of interest
The two main files of interest are 
1. `src/services/rectangle/rectangle.service.ts` 
  - This contains all of the logic to accomplish the desired tasks
2. `src/services/rectangle/rectangle.testcases.ts`
  - This contains all of the test cases that I created. It should cover most of the edge cases.

## Special Notes
- I only had 1 evening to work on this, so it is still pretty raw. See `PLAN.MD` to take a look at a very rough master plan of where this project could go. This was created when I first started working on this, and wasn't modified too much afterwards. 
- Sometimes the requirements weren't explicit, or could be interpreted in multiple ways. Since there was no PM to talk to, I had to make some assumptions. Those assumptions are recorded in `ASSUMPTIONS.MD`.
- I used a started template for this project. You can find the starter template [here](https://github.com/stemmlerjs/simple-typescript-starter)
