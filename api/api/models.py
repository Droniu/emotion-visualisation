from transformers import RobertaTokenizerFast, RobertaForSequenceClassification
import torch


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

    def produce_emotions(self, tokens):
        """ Run model and return emotions.
            TODO: convert from logits to propability
            TODO: retrieve features vector.
        """
        with torch.no_grad():
            outputs = self.__model(**tokens)
            return outputs.logits.numpy().tolist()
