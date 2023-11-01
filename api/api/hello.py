from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import EmotionModelWrapper, EmotionTokenizerWrapper
from .api_models import Text
import asyncio

app = FastAPI()
tokenizer = EmotionTokenizerWrapper()
model = EmotionModelWrapper()

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


@app.post("/inputText")
async def send_input(text: Text):
    loop = asyncio.get_event_loop()
    tokens = tokenizer.tokenize(text.text)
    model_task = loop.run_in_executor(None, model.produce_emotions, tokens)
    logits, labels = await model_task
    return {"logits": logits,
            "labels": labels}
