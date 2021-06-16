import { RectangleService } from './rectangle.service';
import { testCases } from './rectangle.testcases';

describe('Rectangle Service Tests', () => {
  const rectangleService = new RectangleService();

  it('should be initialized', () => {
    expect(rectangleService).toBeDefined();
  });

  describe('predefined testcases', () => {
    testCases.forEach(testCase => {
      describe(testCase.description, () => {
        it(`should ${testCase.shouldThrowError ? '' : 'not '}error`, () => {
          if (testCase.shouldThrowError) {
            expect(
              rectangleService.getIntersections(
                testCase.rectangleA,
                testCase.rectangleB,
              ),
            ).toThrowError();
          } else {
            expect(
              rectangleService.getIntersections(
                testCase.rectangleA,
                testCase.rectangleB,
              ),
            ).not.toThrowError();
          }
        });

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
