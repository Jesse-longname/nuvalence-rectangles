import { RectangleCompaerer } from './rectangle';
import { RectangleService } from './rectangle.service';
import { testCases } from './rectangle.testcases';

describe('Rectangle Service Tests', () => {
  const rectangleService: RectangleCompaerer = new RectangleService();

  it('should be initialized', () => {
    expect(rectangleService).toBeDefined();
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
          expect(
            rectangleService.getIntersections(
              testCase.rectangleB,
              testCase.rectangleA,
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
