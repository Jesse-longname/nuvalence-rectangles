import { Line, Point, Rectangle, RectangleCompaerer } from './rectangle';

export class RectangleService implements RectangleCompaerer {
  getIntersections(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
    rectangleA = this.sanitizeRectangle(rectangleA);
    rectangleB = this.sanitizeRectangle(rectangleB);

    const aLines = this.createLines(rectangleA);
    const bLines = this.createLines(rectangleB);

    let points: Point[] = [];

    for (const aLine of aLines) {
      for (const bLine of bLines) {
        // do these two overlap?
        const A1 = aLine.y2 - aLine.y1;
        const A2 = bLine.y2 - bLine.y1;
        const B1 = aLine.x1 - aLine.x2;
        const B2 = bLine.x1 - bLine.x2;

        const det = A1 * B2 - A2 * B1;
        if (det === 0) {
          // lines are parallel, we can ignore (they will be handled by the perpendicular counterpart)
        } else {
          const C1 = A1 * aLine.x1 + B1 * aLine.y1;
          const C2 = A2 * bLine.x1 + B2 * bLine.y1;

          let x = (B2 * C1 - B1 * C2) / det;
          let y = (A1 * C2 - A2 * C1) / det;

          if (x === 0) x = 0;
          if (y === 0) y = 0;

          if (
            this.isBetweenInclusive(x, aLine.x1, aLine.x2) &&
            this.isBetweenInclusive(y, aLine.y1, aLine.y2) &&
            this.isBetweenInclusive(x, bLine.x1, bLine.x2) &&
            this.isBetweenInclusive(y, bLine.y1, bLine.y2)
          ) {
            points.push({ x, y });
          }
        }
      }
    }

    points = points.sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y;
      }
      return a.x - b.x;
    });

    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      if (curr.x === next.x && curr.y === next.y) {
        points.splice(i + 1, 1);
      }
    }

    return points;
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

  private isBetweenInclusive(
    toCheck: number,
    lowerEndpoint: number,
    higherEndpoint: number,
  ): boolean {
    return toCheck >= lowerEndpoint && toCheck <= higherEndpoint;
  }

  createLines(rect: Rectangle): Line[] {
    const { x1, x2, y1, y2 } = rect;

    const lines: Line[] = [];
    lines.push({
      x1: x1,
      y1: y1,
      x2: x1,
      y2: y2,
    });
    lines.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y1,
    });
    lines.push({
      x1: x1,
      y1: y2,
      x2: x2,
      y2: y2,
    });
    lines.push({
      x1: x2,
      y1: y1,
      x2: x2,
      y2: y2,
    });

    return lines;
  }
}
