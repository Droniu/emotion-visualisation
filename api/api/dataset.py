import numpy as np
from enum import Enum
from umap import UMAP
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler, normalize


class NumDimm(Enum):
    TWO = "2"
    THREE = "3"


class Dataset:
    """Class that reduces dimension to 2D or 3D by using PCA
        and returns most important info.
    """

    def __init__(self, dataframe, num_dim=2) -> None:


        self.__dataframe = dataframe  # pd.read_pickle(self.__SAVE_DIR)

        self.__pca = PCA(n_components=num_dim)
        self.__scaler = StandardScaler()
        train_features = np.vstack(self.__dataframe.features.values)
        train_features = normalize(train_features)
        scaled_features = self.__scaler.fit_transform(train_features)
        self.__reduced_dim = self.__pca.fit_transform(scaled_features)

    def count_pca_for_point(self, features):
        return self.__pca.transform(features)

    def retrieve_train_set(self):
        return self.__reduced_dim, self.__dataframe["best_label"].values, self.__dataframe['summary_y'].values


class UMapImpl:

    def __init__(self, dataframe, num_dim=2) -> None:
        self.__dataframe = dataframe
        self.__umap = UMAP(n_components=num_dim)
        self.__scaler = StandardScaler()
        train_features = np.vstack(self.__dataframe.features.values)
        train_features = normalize(train_features)
        scaled_features = self.__scaler.fit_transform(train_features)
        self.__reduced_dim = self.__umap.fit_transform(scaled_features)


    def count_umap_for_point(self, features):
        return self.__umap.transform(features)

    def retrieve_train_set(self):
        return self.__reduced_dim, self.__dataframe["best_label"].values, self.__dataframe['summary_y'].values
