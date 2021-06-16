import { Point, Rectangle, RectangleComparer, LineSegment } from './rectangle';

export class RectangleService implements RectangleComparer {
  getIntersections(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
    rectangleA = this.sanitizeRectangle(rectangleA);
    rectangleB = this.sanitizeRectangle(rectangleB);

    const lineSegmentsA = this.createLineSegments(rectangleA);
    const lineSegmentsB = this.createLineSegments(rectangleB);

    let points: Point[] = [];

    lineSegmentsA.forEach(segmentA => {
      lineSegmentsB.forEach(segmentB => {
        const point = this.getIntersectingPoint(segmentA, segmentB);
        if (point) {
          points.push(point);
        }
      });
    });

    points = this.sortPoints(points);
    this.removeDuplicates(points);

    return points;
  }

  isContained(container: Rectangle, containee: Rectangle): boolean {
    container = this.sanitizeRectangle(container);
    containee = this.sanitizeRectangle(containee);

    const containeeBetweenContainerX = containee.x1 >= container.x1 && containee.x2 <= container.x2;
    const containeeBetweenContainerY = containee.y1 >= container.y1 && containee.y2 <= container.y2;
    return containeeBetweenContainerX && containeeBetweenContainerY;
  }

  isAdjacent(rectangleA: Rectangle, rectangleB: Rectangle): boolean {
    const { x1: ax1, x2: ax2, y1: ay1, y2: ay2 } = this.sanitizeRectangle(rectangleA);
    const { x1: bx1, x2: bx2, y1: by1, y2: by2 } = this.sanitizeRectangle(rectangleB);

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

  private isBetweenInclusive(toCheck: number, lowerEndpoint: number, higherEndpoint: number): boolean {
    return toCheck >= lowerEndpoint && toCheck <= higherEndpoint;
  }

  private createLineSegments(rect: Rectangle): LineSegment[] {
    const lineSegments: LineSegment[] = [];
    const xs = [rect.x1, rect.x2];
    const ys = [rect.y1, rect.y2];

    for (let i = 0; i < 4; i++) {
      const x1 = xs[Math.floor(i / 2)];
      const y1 = ys[Math.floor(i / 2)];
      const x2 = xs[i % 2];
      const y2 = ys[(i + 1) % 2];

      // linear algebra to find constants defining this line
      const A = y2 - y1;
      const B = x1 - x2;
      const C = A * x1 + B * y1;
      const lineSegment: LineSegment = {
        startPoint: { x: x1, y: y1 },
        endPoint: { x: x2, y: y2 },
        A,
        B,
        C,
      };
      lineSegments.push(lineSegment);
    }

    return lineSegments;
  }

  private getIntersectingPoint(line1: LineSegment, line2: LineSegment): Point | undefined {
    const { A: A1, B: B1, C: C1 } = line1;
    const { A: A2, B: B2, C: C2 } = line2;

    const det = A1 * B2 - A2 * B1;

    if (det != 0) {
      let x = (B2 * C1 - B1 * C2) / det;
      let y = (A1 * C2 - A2 * C1) / det;

      // Convert -0 to 0
      if (x === 0) x = 0;
      if (y === 0) y = 0;

      const point: Point = { x, y };

      if (this.pointIsOnSegment(point, line1) && this.pointIsOnSegment(point, line2)) {
        return point;
      }
    }
  }

  private pointIsOnSegment(point: Point, lineSegment: LineSegment): boolean {
    const { x: startX, y: startY } = lineSegment.startPoint;
    const { x: endX, y: endY } = lineSegment.endPoint;
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    return this.isBetweenInclusive(point.x, minX, maxX) && this.isBetweenInclusive(point.y, minY, maxY);
  }

  private sortPoints(points: Point[]): Point[] {
    return points.sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y;
      }
      return a.x - b.x;
    });
  }

  private removeDuplicates(points: Point[]): void {
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      if (curr.x === next.x && curr.y === next.y) {
        points.splice(i + 1, 1);
      }
    }
  }
}
