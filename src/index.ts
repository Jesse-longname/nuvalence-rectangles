import { RectangleService } from './services/rectangle/rectangle.service';
import { testCases } from './services/rectangle/rectangle.testcases';

const rectService = new RectangleService();
const test = testCases.find(x => x.description.includes('is a line'));
if (test) {
  const res = rectService.getIntersections(test.rectangleA, test.rectangleB);
}
