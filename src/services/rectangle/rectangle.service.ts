import { Point, Rectangle, RectangleCompaerer } from './rectangle';

export class RectangleService implements RectangleCompaerer {
  getIntersections(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
    rectangleA = this.sanitizeRectangle(rectangleA);
    rectangleB = this.sanitizeRectangle(rectangleB);
    return [];
  }

  isContained(container: Rectangle, containee: Rectangle): boolean {
    container = this.sanitizeRectangle(container);
    containee = this.sanitizeRectangle(containee);

    const containeeBetweenContainerX =
      containee.x1 >= container.x1 && containee.x2 <= container.x2;
    const containeeBetweenContainerY =
      containee.y1 >= container.y1 && containee.y2 <= container.y2;
    return containeeBetweenContainerX && containeeBetweenContainerY;
  }

  isAdjacent(rectangleA: Rectangle, rectangleB: Rectangle): boolean {
    const { x1: ax1, x2: ax2, y1: ay1, y2: ay2 } = this.sanitizeRectangle(
      rectangleA,
    );
    const { x1: bx1, x2: bx2, y1: by1, y2: by2 } = this.sanitizeRectangle(
      rectangleB,
    );

    // If they have a matching edge on the x axis
    if (ax1 === bx1 || ax2 === bx1 || ax1 === bx2 || ax2 === bx2) {
      // Make sure y axis overlaps
      const aAboveB = ay2 < by1; // We can use simple checks like this because we standardized our rectangles
      const aBelowB = ay1 > by2;
      return !(aAboveB || aBelowB);
    }
    // If they have a matching edge on the y axis
    if (ay1 === by1 || ay2 === by1 || ay1 === by2 || ay2 === by2) {
      // Make sure x axis overlaps
      const aRightOfB = ax1 > bx2;
      const aLeftOfB = ax2 < bx1;
      return !(aRightOfB || aLeftOfB);
    }
    return false;
  }

  private sanitizeRectangle(rect: Rectangle): Rectangle {
    if (this.isPoint(rect)) {
      throw new Error('A point is not a rectangle');
    }
    if (this.isLine(rect)) {
      throw new Error('A line is not a rectangle');
    }

    // Arrange the rectangle so the top left corner is x1,y1.
    // Also create a copy, so we don't modify the original
    const { x1, x2, y1, y2 } = rect;
    return {
      x1: x1 < x2 ? x1 : x2,
      y1: y1 < y2 ? y1 : y2,
      x2: x1 < x2 ? x2 : x1,
      y2: y1 < y2 ? y2 : y1,
    };
  }

  private isPoint(rect: Rectangle): boolean {
    return rect.x1 === rect.x2 && rect.x2 === rect.y1 && rect.y1 === rect.y2;
  }

  private isLine(rect: Rectangle): boolean {
    return rect.x1 === rect.x2 || rect.y1 === rect.y2;
  }

  private anyMatch(numbers: number[]): boolean {
    const lazyMap: { [num: number]: boolean } = {};
    for (const num in numbers) {
      if (lazyMap[num]) return true;
      lazyMap[num] = true;
    }
    return false;
  }
}
