import { RectangleService } from '../services/rectangle/rectangle.service';
import { testCases } from '../services/rectangle/rectangle.testcases';
import { prompt } from 'inquirer';
import { Rectangle } from '../services/rectangle/rectangle';
import { RectangleComparer } from '../services/rectangle/rectangle';
import { TestCase } from '../services/rectangle/rectangle.testcases';

export class Harness {
  readonly initialPrompts = [
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action',
      choices: [
        {
          name: 'Enter in a custom test case',
          value: 'custom',
        },
        {
          name: 'Select from pre-existing test cases',
          value: 'pre-existing',
        },
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    },
  ];

  readonly customTestCasePrompts = [
    {
      type: 'input',
      name: 'r1c1',
      message: 'First rectangle: Enter the co-ordinates of the top left corner (e.g. "5,5")',
      validate: this.validateCoordinateInput,
    },
    {
      type: 'input',
      name: 'r1c2',
      message: 'First rectangle: Enter the co-ordinates of the bottom right conrer',
      validate: this.validateCoordinateInput,
    },
    {
      type: 'input',
      name: 'r2c1',
      message: 'Second rectangle: Enter the co-ordinates of the top left corner',
      validate: this.validateCoordinateInput,
    },
    {
      type: 'input',
      name: 'r2c2',
      message: 'Second rectangle: Enter the co-ordinates of the bottom right conrer',
      validate: this.validateCoordinateInput,
    },
  ];

  rectangleComparer: RectangleComparer;

  constructor() {
    this.rectangleComparer = new RectangleService();
  }

  validateCoordinateInput(input: string): any {
    const pass = input.match(/(\d+),(\d+)/);
    if (!pass) return 'Please enter 2 comma-separated numbers';
    else return true;
  }

  parseValues(csv: string): number[] {
    return csv.split(',').map(x => +x);
  }

  async logResultsAndRestart(rectA: Rectangle, rectB: Rectangle): Promise<void> {
    try {
      const intersections = this.rectangleComparer.getIntersections(rectA, rectB);
      const firstContainsSecond = this.rectangleComparer.isContained(rectA, rectB);
      const secondContainsFirst = this.rectangleComparer.isContained(rectB, rectA);
      const isAdjacent = this.rectangleComparer.isAdjacent(rectA, rectB);

      console.log('Intersections: ', intersections);
      console.log(`Are the rectangles adjacent? ${isAdjacent ? 'yes' : 'no'}`);
      console.log(`Does the first rectangle contain the second? ${firstContainsSecond ? 'yes' : 'no'}`);
      console.log(`Does the second rectangle contain the first? ${secondContainsFirst ? 'yes' : 'no'}`);
    } catch (err) {
      console.log(err.message);
    }

    await prompt([
      {
        type: 'input',
        message: 'Press <enter> to continue',
        name: 'continue',
      },
    ]);

    await this.run();
  }

  async customFlow(): Promise<void> {
    const answers = await prompt(this.customTestCasePrompts);

    const [r1x1, r1y1] = this.parseValues(answers.r1c1);
    const [r1x2, r1y2] = this.parseValues(answers.r1c2);
    const [r2x1, r2y1] = this.parseValues(answers.r2c1);
    const [r2x2, r2y2] = this.parseValues(answers.r2c2);
    const rect1: Rectangle = {
      x1: r1x1,
      x2: r1x2,
      y1: r1y1,
      y2: r1y2,
    };
    const rect2: Rectangle = {
      x1: r2x1,
      x2: r2x2,
      y1: r2y1,
      y2: r2y2,
    };

    await this.logResultsAndRestart(rect1, rect2);
  }

  async existingFlow(): Promise<void> {
    const testCaseChoices = testCases.map((x: TestCase) => {
      return {
        name: `${x.description}: ${this.getStringRep(x.rectangleA)} ${this.getStringRep(x.rectangleB)}`,
        value: x,
      };
    });
    const answer = await prompt([
      {
        type: 'list',
        name: 'testCaseSelection',
        message: 'Choose a test case',
        choices: testCaseChoices,
      },
    ]);
    const rectA = answer.testCaseSelection.rectangleA;
    const rectB = answer.testCaseSelection.rectangleB;
    console.log('Running with the following values:');
    console.log('First rectangle: ', rectA);
    console.log('Second rectangle: ', rectB);
    await this.logResultsAndRestart(rectA, rectB);
  }

  async run(): Promise<void> {
    console.clear();
    const initialAnswers = await prompt(this.initialPrompts);
    switch (initialAnswers.action) {
      case 'custom':
        await this.customFlow();
        break;
      case 'pre-existing':
        await this.existingFlow();
        break;
      case 'exit':
        console.log('Thanks!');
        return;
    }
  }

  getStringRep(rect: Rectangle): string {
    return `[(${rect.x1}, ${rect.y1}), (${rect.x2}, ${rect.y2})]`;
  }
}
