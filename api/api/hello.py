from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import EmotionModelWrapper, EmotionTokenizerWrapper
from .api_models import Text

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
    tokens = tokenizer.tokenize(text.text)
    logits = model.produce_emotions(tokens)
    return {"output": logits}
