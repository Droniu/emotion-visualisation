from transformers import RobertaTokenizerFast, RobertaForSequenceClassification
from torch.nn.functional import sigmoid
from torch import no_grad, Tensor
from numpy import around


class EmotionTokenizerWrapper():
    """Class that wraps Roberta tokenizer."""

    def __init__(self) -> None:
        self.__tokenizer = RobertaTokenizerFast.from_pretrained("SamLowe/roberta-base-go_emotions")

    def tokenize(self, text_input: str):
        """ Transform text into tokens that model can later process.
        """
        return self.__tokenizer(text_input, return_tensors="pt", padding=True, truncation=True)


class EmotionModelWrapper():
    """Class that wraps Roberta model."""

    def __init__(self) -> None:
        self.__model = RobertaForSequenceClassification.from_pretrained(
            "SamLowe/roberta-base-go_emotions", output_hidden_states=True
        )
        self.labels = [
            "admiration", "amusement", "anger", "annoyance", "approval", "caring", "confusion", "curiosity", "desire",
            "disappointment", "disapproval", "disgust", "embarrassment", "excitement", "fear", "gratitude", "grief",
            "joy", "love", "nervousness", "optimism", "pride", "realization", "relief", "remorse", "sadness",
            "surprise", "neutral"]

    def produce_emotions(self, tokens):
        """ Run model and return emotions.
            TODO: retrieve features vector.
        """
        with no_grad():
            outputs = self.__model(**tokens)
            return outputs.logits.numpy().tolist(), self.__get_propability(outputs.logits)

    def __get_propability(self, logits: Tensor):
        propabilities = sigmoid(logits)
        propabilities = propabilities.numpy().tolist()
        propabilities = around(propabilities, 4).tolist()[0]
        return dict(zip(self.labels, propabilities))
