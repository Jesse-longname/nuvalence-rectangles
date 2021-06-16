# Nuvalence Rectangles Problem

## Problem Description:
You are required to write code in the language of your choice implementing certain algorithms that
analyze rectangles and features that exist among rectangles. Your implementation is required to cover
the following:
1. Intersection: You must be able to determine whether two rectangles have one or more
intersecting lines and produce a result identifying the points of intersection. For your
convenience, the scenario is diagrammed in Appendix 1.
2. Containment: You must be able to determine whether a rectangle is wholly contained within
another rectangle. For your convenience, the scenario is diagrammed in Appendix 2.
3. Adjacency: Implement the ability to detect whether two rectangles are adjacent. Adjacency is
defined as the sharing of at least one side. Side sharing may be proper, sub-line or partial. A
sub-line share is a share where one side of rectangle A is a line that exists as a set of points
wholly contained on some other side of rectangle B, where partial is one where some line
segment on a side of rectangle A exists as a set of points on some side of Rectangle B. For your
convenience, these scenarios are diagrammed in Appendix 3 (see PDF).


## Submission Requirements:
1. An implementation of the rectangle entity as well as implementations for the algorithms that
define the operations listed above.
2. Appropriate documentation
3. Test cases/unit tests
Feel free to expand on this problem as you wish. Document any expansion and provide it as part of your
submission.

Your submitted source code must compile (if necessary) and the resulting executable must run on Linux.
Please document any library or framework dependencies.

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


