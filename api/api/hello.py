from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import EmotionModelWrapper, EmotionTokenizerWrapper
from .api_models import Text
from .dataset import Dataset
import asyncio

app = FastAPI()
tokenizer = EmotionTokenizerWrapper()
model = EmotionModelWrapper()
dataset = Dataset()


origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main_route():
    return {"message": "FastAPI working!"}


@app.get("/pca")
async def get_pca_data(size: int | None = None):
    data_dimensions, labels = dataset.retrieve_train_set()

    if size is not None:
        data_dimensions = data_dimensions[:size, :]
        labels = labels[:size]

    converted_dimensions = data_dimensions.tolist()
    converted_labels = labels.tolist()

    return {
        "points": converted_dimensions,
        "points_labels": converted_labels
    }


@app.post("/inputText")
async def send_input(text: Text):
    loop = asyncio.get_event_loop()
    tokens = tokenizer.tokenize(text.text)
    model_task = loop.run_in_executor(None, model.produce_emotions, tokens)
    features, logits, labels = await model_task
    points = dataset.count_pca_for_point(features).tolist()

    return {"logits": logits,
            "labels": labels,
            "points": points}
