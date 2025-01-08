# EmotionVisualisation

This project is done for WUST course called "Visualisation of large data sets".
We decided to go with monorepo design using **nx**.
Project consists of 2 parts:

- **api** - backend part of the project, done using FastAPI, transformers and pytorch
- **front** - frontend part of the project, done using React, DaisyUI, d3, recharts, react-konva, react-three-fiber

## How to run

First, you need the pickle file with the dataset (too large to put in git), which is available here: https://drive.google.com/file/d/1GbasT_j_SjZT050Xy0fZhZGWoGMLFIq9/view?usp=sharin

In order for API to work, put it in `api/dataset/`

After that you should be able to run the project using `npm install` and `npm run serve` commands which is going to automatically run both API and front, but due to difficulties we had combining Python packages with JS packages inside monorepo, you might need to install dependencies in api project manually. To do so, you need to go to `api` directory and run `poetry install` command. After that you should be able to run the project using `npm run serve` command.



## Demo
New messages added by the textbox above are displayed as stars. The slider limits the dataset size for performance.
<img width="1506" alt="image" src="https://github.com/user-attachments/assets/5dd74fcd-e3f3-436b-b70f-46b02950e3fe" />
<img width="1506" alt="image" src="https://github.com/user-attachments/assets/7a27ff40-e11a-43a2-97bc-0f45a9667283" />
<video src="https://github.com/user-attachments/assets/717b81dd-b237-4692-8ab4-814611b7fd08" width="300" />


