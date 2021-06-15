import { Point, Rectangle, RectangleCompaerer } from './rectangle';

export class RectangleService implements RectangleCompaerer {
  getIntersections(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
    throw new Error('Method not implemented.');
  }
  isContained(container: Rectangle, containee: Rectangle): boolean {
    throw new Error('Method not implemented.');
  }
  isAdjacent(rectangleA: Rectangle, rectangleB: Rectangle): boolean {
    throw new Error('Method not implemented.');
  }
}
