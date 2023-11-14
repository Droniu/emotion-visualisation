import pandas as pd
import gdown
import os
import numpy as np


from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA


class Dataset:
    """Class that loads pickle file to dataframe
        and returns most important info.
    """
    SAVE_DIR = "dataset/train_set.pickle"

    def __init__(self) -> None:
        os.makedirs("dataset/", exist_ok=True)
        if not os.path.isfile(self.SAVE_DIR):
            gdown.download("https://drive.google.com/uc?id=1HM82QkwPKsUbsbxqHN3Ii5HC6POFJZDy", self.SAVE_DIR)
        self.__df = pd.read_pickle(self.SAVE_DIR)
        self.__pca = PCA(n_components=2)
        self.__scaler = StandardScaler()
        train_features = np.vstack(self.__df.features.values)
        scaled_features = self.__scaler.fit_transform(train_features)
        self.__reduced_dim = self.__pca.fit_transform(scaled_features)


    def count_pca_for_point(self, features):
        return self.__pca.transform(features)

    def retrieve_train_set(self):
        return self.__reduced_dim, self.__df["best_label"].values
