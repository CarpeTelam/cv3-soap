# CV3-Soap

Simple nodejs library to make requests to the CV3 soap service for debugging purposes.

## Installation

1. Clone the repo
2. Create a new dotenv file named `.env` with the following contents (this file should NOT be checked into git and has been added to the `.gitignore`)
        CV3_USER=<cv3-username>
        CV3_PASS=<cv3-password>
        CV3_SERVICE_ID=<cv3-service-id>
3. Run `npm install` or `yarn`

## Usage

1. Add your XML file to the `./data/` diretory
2. Update `xmlData` in `./bin/index.js` with the path to your xml file (e.g. `./data/jld-5053.xml`)
3. Run `npm start` or `yarn start` to process your XML file and push the data to CV3
