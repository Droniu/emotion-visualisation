from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import EmotionModelWrapper, EmotionTokenizerWrapper
from .api_models import Text
from .dataset import Dataset, NumDimm, UMapImpl
import asyncio
from typing import Union
import os
import gdown
import pandas as pd

__SAVE_DIR = "dataset/train_set.pickle"
os.makedirs("dataset/", exist_ok=True)
if not os.path.isfile(__SAVE_DIR):
    gdown.download("https://drive.google.com/uc?id=1J4e9ULUSK0vwvONUgtVhfq34MKHJly7o", __SAVE_DIR)
train_set = pd.read_pickle(__SAVE_DIR)

app = FastAPI()
tokenizer = EmotionTokenizerWrapper()
model = EmotionModelWrapper()
pca = Dataset(train_set, num_dim=3)
umap = UMapImpl(train_set, num_dim=3)

origins = [
    "http://localhost:4200",
]

saved_inputs = []


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
async def get_pca_data(size: Union[int, None] = None, dimensions: Union[NumDimm, NumDimm] = NumDimm.TWO):

    data_dimensions, labels, texts = pca.retrieve_train_set()

    if size is not None:
        data_dimensions = data_dimensions[:size, :]
        labels = labels[:size]
        texts = texts[:size]

    converted_dimensions = data_dimensions[:, :int(dimensions.value)].tolist()
    converted_labels = labels.tolist()
    converted_texts = texts.tolist()

    return {
        "points": converted_dimensions,
        "points_labels": converted_labels,
        "points_texts": converted_texts
    }


@app.get("/umap")
async def get_umap_data(size: Union[int, None] = None, dimensions: Union[NumDimm, NumDimm] = NumDimm.TWO):

    data_dimensions, labels, texts = umap.retrieve_train_set()

    if size is not None:
        data_dimensions = data_dimensions[:size, :]
        labels = labels[:size]
        texts = texts[:size]

    converted_dimensions = data_dimensions[:, :int(dimensions.value)].tolist()
    converted_labels = labels.tolist()
    converted_texts = texts.tolist()

    return {
        "points": converted_dimensions,
        "points_labels": converted_labels,
        "points_texts": converted_texts
    }


@app.post("/inputText")
async def send_input(text: Text):
    loop = asyncio.get_event_loop()
    tokens = tokenizer.tokenize(text.text)
    model_task = loop.run_in_executor(None, model.produce_emotions, tokens)
    features, logits, labels = await model_task
    points_pca = pca.count_pca_for_point(features).tolist()
    points_umap = umap.count_umap_for_point(features).tolist()

    object_to_return = {
        # "logits": logits,
        "labels": labels,
        "points_pca": points_pca,
        "points_umap": points_umap,
        "input": text.text
    }
    saved_inputs.append(object_to_return)
    return object_to_return


@app.get("/savedText")
async def retrieve_saved_emotions(dimensions: Union[NumDimm, NumDimm] = NumDimm.TWO):

    list_to_return = [
        {
            "labels": obj['labels'],
            "points_pca": obj['points_pca'][0][:int(dimensions.value)],
            "points_umap": obj['points_umap'][0][:int(dimensions.value)],
            "input": obj['input']
        }
        for obj in saved_inputs
    ]

    return list_to_return
