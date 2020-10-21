# Red Robot

There was no interface spec provided, so I decided to offer two options: cli and REST

## Cli

The cli script reads instructions from a file in the format listed in the spec and parses them to control the robot.

### How to run

`npm run cli -- /path/to/the/file/with/robot/instructions`

Example input file:

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

_Note: Tested with Node version 12._

**The output will be displayed in the system output (terminal).**

The code is fully tested with jest.

| File                          | % Stmts | % Branch | % Funcs | % Lines |
| ----------------------------- | ------- | -------- | ------- | ------- |
| All files                     | 100     | 100      | 100     | 100     |
| cli                           | 100     | 100      | 100     | 100     |
| robot-cli.ts                  | 100     | 100      | 100     | 100     |
| cli/errors                    | 100     | 100      | 100     | 100     |
| UnhandledMoveError.ts         | 100     | 100      | 100     | 100     |
| entities                      | 100     | 100      | 100     | 100     |
| Mars.ts                       | 100     | 100      | 100     | 100     |
| Robot.ts                      | 100     | 100      | 100     | 100     |
| entities/errors               | 100     | 100      | 100     | 100     |
| ExceededMaxColCountError.ts   | 100     | 100      | 100     | 100     |
| ExceededMaxRowCountError.ts   | 100     | 100      | 100     | 100     |
| FallAlreadyRegisteredError.ts | 100     | 100      | 100     | 100     |
| services                      | 100     | 100      | 100     | 100     |
| MarsService.ts                | 100     | 100      | 100     | 100     |
| RobotService.ts               | 100     | 100      | 100     | 100     |
| services/errors               | 100     | 100      | 100     | 100     |
| RobotNotFoundError.ts         | 100     | 100      | 100     | 100     |
| store                         | 100     | 100      | 100     | 100     |
| MarsStore.ts                  | 100     | 100      | 100     | 100     |

## REST

My plan was to provide a React UI to control robots over the API (with multiple people being able to control the same robot if they are on the same planet), unfortunately with the very thorough approach to the backend there was not enough time for the UI. It is still possible to control robots using curl/postman/http client.

### How to run

**The backend is deployed to the cloud and can be accessed with `https://red-robot.optimisedsoftware.co.uk/api`. Feel free to use it instead of spinning up your own server.**

`npm run start:prod`

alternatively, the project can be run inside a docker container

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

### How to use

You can use curl commands to create planets and control robots (use `localhost:3000` instead of `red-robot.optimisedsoftware.co.uk/api` for the local server)

Create a planet:

```bash
curl --location --request POST 'red-robot.optimisedsoftware.co.uk/api/mars' \
--header 'Content-Type: application/json' \
--data-raw '{"x": 5,  "y": 5}'
```

Place a new robot on a planet: (Orientations: N - 0, E - 1, S - 2, W - 3)

```bash
curl --location --request POST 'red-robot.optimisedsoftware.co.uk/api/robot' \
--header 'Content-Type: application/json' \
--data-raw '{"planetId": "planet-uuid-from-the-first-request", "x": 3, "y": 3, "orientation": 0}'
```

Move a robot: (Moves: L - 0, R - 1, F - 2)

```bash
curl --location --request POST 'red-robot.optimisedsoftware.co.uk/api/robot/move' \
--header 'Content-Type: application/json' \
--data-raw '{"move": 2, "planetId": "planet-uuid-from-the-first-request"}'
```
