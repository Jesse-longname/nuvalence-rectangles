export interface Point {
  x: number;
  y: number;
}

export interface Rectangle {
  points: Point[];
}

export interface RectangleCompaerer {
  /**
   * Returns the points at which the two rectangles intersect.
   * @param  {Rectangle} rectangleA
   * @param  {Rectangle} rectangleB
   * @returns An array of Points for where the rectangles intersect. If they do not intersect, an empty list will be returned
   */
  getIntersections(rectangleA: Rectangle, rectangleB: Rectangle): Point[];

  /**
   * Returns true if the container rectangle contains the containee rectangle
   * @param  {Rectangle} container
   * @param  {Rectangle} containee
   * @returns True if the container contains the containee, otherwise false
   */
  isContained(container: Rectangle, containee: Rectangle): boolean;

  /**
   * Returns true if the two rectangles are adjacent (i.e share part of a side)
   * @param  {Rectangle} rectangleA
   * @param  {Rectangle} rectangleB
   * @returns true if the two rectangles share a side, otherwise false
   */
  isAdjacent(rectangleA: Rectangle, rectangleB: Rectangle): boolean;
}
