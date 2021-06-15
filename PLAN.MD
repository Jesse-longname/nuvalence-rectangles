# MVP
## Step 1 - Initial Setup (20 min)
- Set up repo
- Set up base documentation
- Plan out steps and add time estimates
- Figure out how far we want to go with this as "MVP", and what is the stretch goal

## Step 2 - Define Assumptions (10 min)
- Read through the problem, and clearly define any assumptions being made.
- Describe how these assumptions will impact the final code

## Step 3 - Code Setup (15 min)
- Create a service with three or four methods
  - `countIntersections`
  - `countContainment`
  - `countAdjacency`
  - `countAll` (convenience method)
- Create a test file for the service
- Define some commands in a package.json that will aid in running and testing the service

## Step 4 - Tests (30 min)
- Try to follow a TDD pattern
- Think of as many tests as possible that will cover the "normal" cases and edge cases

## Step 5 - Coding (1 hr)
- Get all of the tests to pass
- Allotting 1 hour here because there will be algorithmic challenges
- Goal is to "get it working". Performance imporvements will be done in a future step

## Step 6 - Cleanup (30 min)
- Give the code a bit of a shine-up
- Go through previous steps and make sure everything has been covered
- Finish off any documentation

## Step 7 - Algorithmic improvements (30 min)
- Think of ways to improve the algorithm and improve efficiency
- Do some research. I'm sure there is a computational geometry algorithm that will cover this.

# POST MVP 

## Step 8 - React FE (1.5 hr)
- Use the typescript template to spin up a quick React project
- Will have a canvas to allow the user to draw lines or rectangles
- Will automatically show the counts of our three categories
- Algorithmic code will be embedded in the FE

## Step 9 - Separate BE (1.5 hr)
- Move the algorithmic code to a BE service (maybe Node.js Express?)
- Define the endpoint using swagger
- Set up code generation for swagger so we don't have to write the service
- Refactor the FE to call the BE

## Step 10 - Easy testcases (1.5 hr)
- In the FE, show some testcases that are set up for the user
  - Pull from BE. Needs simple db setup (either json db, or in memory for POC)
- Have a history of previously created testcases that the user can go back to
- Allow the user to save testcases

## Step 11 - Deploy (3 hr)
- Deploy the FE + BE to some cloud provider (maybe GCP?)
- Move the DB to the cloud provider
- Manual deploy steps (CI/CD later)
- Set up templates for developers to fill in to allow everything to connect properly

## Step 12 - CI/CD (2 hr)
- Setup a CI/CD pipeline to auto-deploy when code is merged to master.
- Just use one of the pipelines that is available in whichever cloud provider was selected in Step 11.