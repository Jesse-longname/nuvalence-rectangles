# Nuvalence Rectangles Problem

## Requirements
- Node v14.15.0 or above
  - **Note**: May work with versions below this, but I have not tested that.

## How to Run
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


## Assumptions
- The input to the service will be a pair of Rectangles (as opposed to a pair of lists of Lines)
  - This means we will not have to determine where a rectangle is by figuring out the intersection of lines.
  - In the future, this extra functionality could be added on as a "pre-processor".
- We will be defining points using whole numbers. 
  - If we were using fractional numbers (i.e. doubles), we would have to incorporate some sort of "delta" for adjacency that would be the "acceptable close-ness" of two rectangles for them to be recognized as adjacent. This is possible, but causes a bit more headache than it is worth
- A rectangle is defined by 4 points in clockwise order
  - This isn't necessary, but will ease development. Prevents a need to order points before they enter the algorithm.
  - In the future, this could be added as a "pre-processor". Probably will be added for convenience anyways.
  - We will still need to add a check to make sure this holds true with the points that we do receive.
- If two rectangles meet at a single point (i.e. Corners touching), this will be considered adjacent.
  - Technically, this means that our adjacency check will be inclusive of the endpoints, which I think is fine. 
  - If it needs to be changed, it will be simple.
- Containment will be inclusive. So it will be possible for a rectangle to be both adjacent and contained.
  - This also means that two rectangles could contain each other. That doesn't sound right, but this is the simplest approach. Otherwise, there would have to be a special check for if the rectangles are equal.
- Endpoints of a line on a shared edge will count as an intersection
  - The whole line will not count as an intersection, because that would be infinite intersections
- A point or line is not considered a rectangle
  - Mostly making this decision so we can showcase throwing errors

## Code Sources
I used a starter project to speed up development. This has typescript and jest support pre-configured. Initial starter project was from this repo: https://github.com/stemmlerjs/simple-typescript-starter


## Steps to Run


## Algorithm Explanation (if required)


