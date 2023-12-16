# EmotionVisualisation

This project is done for WUST course called "Visualisation of large data sets".
We decided to go with monorepo design using **nx**.
Project consists of 2 parts:

- **api** - backend part of the project, done using FastAPI, transformers and pytorch
- **front** - frontend part of the project, done using React

## How to run

Generally you should be able to run the project using `npm install` and `npm run serve` commands which is going to automatically run both API and front, but due to difficulty combining Python packages with JS packages inside monorepo, you might need to install dependencies in api project manually. To do so, you need to go to `api` directory and run `poetry install` command. After that you should be able to run the project using `npm run serve` command.
