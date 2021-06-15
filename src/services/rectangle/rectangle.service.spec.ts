import { RectangleService } from './rectangle.service';

describe('Rectangle Service Tests', () => {
  const rectangleService = new RectangleService();

  it('should be initialized', () => {
    expect(rectangleService).toBeDefined();
  });
});
