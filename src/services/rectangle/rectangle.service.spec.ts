import { Line, Rectangle } from './rectangle';
import { RectangleService } from './rectangle.service';
import { testCases } from './rectangle.testcases';

describe('Rectangle Service Tests', () => {
  const rectangleService = new RectangleService();

  it('should be initialized', () => {
    expect(rectangleService).toBeDefined();
  });

  describe('createLines', () => {
    it('should create the proper lines from a rectangle', () => {
      const rect: Rectangle = {
        x1: 5,
        y1: 5,
        x2: 15,
        y2: 15,
      };
      const toTest = rectangleService.createLines(rect);
      const expected: Line[] = [
        { x1: 5, y1: 5, x2: 5, y2: 15 },
        { x1: 5, y1: 5, x2: 15, y2: 5 },
        { x1: 5, y1: 15, x2: 15, y2: 15 },
        { x1: 15, y1: 5, x2: 15, y2: 15 },
      ];
      expect(toTest).toEqual(expected);
    });
  });

  describe('predefined testcases', () => {
    testCases.forEach(testCase => {
      describe(testCase.description, () => {
        if (testCase.shouldThrowError) {
          it(`should error`, () => {
            expect(() =>
              rectangleService.getIntersections(
                testCase.rectangleA,
                testCase.rectangleB,
              ),
            ).toThrowError();
          });
          return;
        }

        it('should have correct intersections', () => {
          expect(
            rectangleService.getIntersections(
              testCase.rectangleA,
              testCase.rectangleB,
            ),
          ).toEqual(testCase.intersections);
        });

        it('should correctly identify adjacency', () => {
          expect(
            rectangleService.isAdjacent(
              testCase.rectangleA,
              testCase.rectangleB,
            ),
          ).toBe(testCase.isAdjacent);
          expect(
            rectangleService.isAdjacent(
              testCase.rectangleB,
              testCase.rectangleA,
            ),
          ).toBe(testCase.isAdjacent);
        });

        it('should correctly identify containment', () => {
          expect(
            rectangleService.isContained(
              testCase.rectangleA,
              testCase.rectangleB,
            ),
          ).toBe(testCase.doesAContainB);
          expect(
            rectangleService.isContained(
              testCase.rectangleB,
              testCase.rectangleA,
            ),
          ).toBe(testCase.doesBContainA);
        });
      });
    });
  });
});
