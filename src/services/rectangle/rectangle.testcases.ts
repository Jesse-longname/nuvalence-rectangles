import { Rectangle, Point } from './rectangle';

export interface TestCase {
  rectangleA: Rectangle;
  rectangleB: Rectangle;
  intersections: Point[];
  isAdjacent: boolean;
  doesAContainB: boolean;
  doesBContainA: boolean;
  description: string;
  shouldThrowError: boolean;
}

function createTestCase(
  rectangleA: Rectangle,
  rectangleB: Rectangle,
  intersections: Point[],
  isAdjacent: boolean,
  doesAContainB: boolean,
  doesBContainA: boolean,
  description: string,
  shouldThrowError = false,
): TestCase {
  return {
    rectangleA,
    rectangleB,
    shouldThrowError,
    intersections,
    isAdjacent,
    doesAContainB,
    doesBContainA,
    description,
  };
}

function createRectangle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Rectangle {
  return {
    x1,
    y1,
    x2,
    y2,
  };
}

export const testCases: TestCase[] = [
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(30, 10, 40, 20),
    [],
    false,
    false,
    false,
    'two rectangles mirroring each other, with space between',
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(15, 30, 25, 40),
    [],
    false,
    false,
    false,
    'two rectangles with space between and slightly offset',
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(30, 20, 40, 30),
    [],
    false,
    false,
    false,
    'two rectangles with space between, but have 1 side each at the same level on the y axis',
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(45, 83, 60, 92),
    [],
    false,
    false,
    false,
    'two rectangles that are nowhere near eachother',
  ),
  createTestCase(
    createRectangle(10, 10, 10, 10),
    createRectangle(20, 30, 40, 50),
    [],
    false,
    false,
    false,
    'Rectangle 1 is a point',
    true,
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(10, 10, 5, 5),
    [],
    false,
    false,
    false,
    'Rectangle 2 is a line',
    true,
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(20, 20, 30, 30),
    [{ x: 20, y: 20 }],
    true,
    false,
    false,
    'two rectangles with bottom right and top left corner touching',
  ),
  createTestCase(
    createRectangle(10, 10, 20, 20),
    createRectangle(20, 0, 30, 10),
    [{ x: 20, y: 10 }],
    true,
    false,
    false,
    'two rectangles with bottom left and top right corner touching',
  ),
  createTestCase(
    createRectangle(0, 0, 20, 20),
    createRectangle(10, 10, 20, 20),
    [
      { x: 20, y: 20 },
      { x: 10, y: 20 },
      { x: 20, y: 10 },
    ],
    true,
    true,
    false,
    'one rectangle is a corner of the other rectangle, sharing two edges',
  ),
  createTestCase(
    createRectangle(10, 5, 20, 15),
    createRectangle(0, 0, 20, 20),
    [
      { x: 20, y: 5 },
      { x: 20, y: 15 },
    ],
    true,
    false,
    true,
    'one rectangle is inside another rectangle, sharing an edge',
  ),
  createTestCase(
    createRectangle(0, 0, 20, 20),
    createRectangle(5, 0, 20, 20),
    [
      { x: 5, y: 0 },
      { x: 5, y: 20 },
      { x: 20, y: 0 },
      { x: 20, y: 20 },
    ],
    true,
    true,
    false,
    'one rectangle is inside another rectangle, sharing three edges',
  ),
  createTestCase(
    createRectangle(0, 0, 20, 20),
    createRectangle(0, 0, 20, 20),
    [
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 0, y: 20 },
      { x: 20, y: 20 },
    ],
    true,
    true,
    true,
    'two rectangles that are exactly the same',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 20),
    createRectangle(10, 5, 15, 15),
    [
      { x: 10, y: 5 },
      { x: 10, y: 15 },
    ],
    true,
    false,
    false,
    'a sub-line adjacency',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(10, 5, 20, 15),
    [
      { x: 10, y: 5 },
      { x: 10, y: 10 },
    ],
    true,
    false,
    false,
    'a partial adjacency',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(10, 0, 20, 10),
    [
      { x: 10, y: 0 },
      { x: 10, y: 10 },
    ],
    true,
    false,
    false,
    'a proper adjacency',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(8, 8, 20, 20),
    [
      { x: 8, y: 10 },
      { x: 10, y: 8 },
    ],
    false,
    false,
    false,
    'rectangles where the corners overlap',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(0, 7, 15, 14),
    [
      { x: 0, y: 7 },
      { x: 0, y: 10 },
      { x: 10, y: 7 },
    ],
    true,
    false,
    false,
    'rectangles with part of one side shared and three intersections',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(-5, 8, 15, 20),
    [
      { x: 0, y: 8 },
      { x: 10, y: 8 },
    ],
    false,
    false,
    false,
    'rectangle overlapping the bottom part of another rectangle, with no shared sides',
  ),
  createTestCase(
    createRectangle(5, 0, 15, 10),
    createRectangle(0, 6, 20, 10),
    [
      { x: 5, y: 6 },
      { x: 5, y: 10 },
      { x: 10, y: 6 },
      { x: 10, y: 10 },
    ],
    true,
    false,
    false,
    'rectangle overlapping the bottom part of another rectangle, with bottom side shared',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(3, -2, 5, 15),
    [
      { x: 3, y: 0 },
      { x: 5, y: 0 },
      { x: 3, y: 10 },
      { x: 5, y: 10 },
    ],
    false,
    false,
    false,
    'rectangle ovelapping the middle of another rectangle',
  ),
  createTestCase(
    createRectangle(0, 0, 10, 10),
    createRectangle(2, 2, 8, 8),
    [],
    false,
    true,
    false,
    'a rectangle clearly contained in another rectangle',
  ),
];
