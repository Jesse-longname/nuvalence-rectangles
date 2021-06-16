# Assumptions
## The input will be a pair of rectangles
- Opposed to lists of lines, where the code would have to determine if those lines make up rectangles, then perform the calculations.
- This could be added as a "pre-processor" in the future.

## Rectangles will be defined by using opposing corners
- There are multiple ways to define a rectangle. I am choose to use opposing corners to define the rectanges. 
- e.g. (0,0), (10,10) would define a rectangle with one corner at the origin, and one corner at (10,10). 

## Rectangles will always align with the x and y axis
- Not including any code to accomodate for rotations of rectangles. 
- This would make every step more complicated, including defining the rectangles.

## Points will be defined using whole numbers
- This just simplifies the dev effort, because then a tolerence doesn't have to be factored in due doubles being imprecise.
- Should be relatively straight forward to migrate away from if needed in the future.

## Lines and Points don't count as a Rectangle
- In my world, rectangles must have some area. So points and lines will be rejected. 
- I don't really see algorithmic issues with this, it's more to save some dev effort and show some error handling/validation.

## Corners touching is considered Adjacent
- Could be argued, but I consider the corner to be part of the side of the rectangle
- Even if we need to change this, we should just have to make the checks non-inclusive of the endpoints.

## Containment will be inclusive
- This means that even though sides are touching, one rectangle can still "contain" the other.
- This does mean that two of the exact same rectangle will contain each-other. I don't see a problem with this.
- This also means that it is possible for rectangleA to contain rectangleB, as well as be adjacent to it.

## Endpoints on a shared line will count as an intersection
- Pretty straight forward. Just needed to make a decision here.
