import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { backUrl } from "../config/api";
import { ModelUploadState } from "../store/features/modelUploadSlice";

export type ModelApiType = {
  abstractInfo: string;
  authorId: number;
  controlId?: number;
  coverUrl: string;
  createTime: string;
  id: number;
  modelUrl: string;
  title: string;
  updateTime: string;
};

export type ModelControlApiType = {
  id: number;
  autoRotateSpeed: number;
  background: boolean;
  preset: PresetsType;
  blur: number;
  speed: number;
  rotationIntensity: number;
  floatIntensity: number;
  createTime: string;
  updateTime: string;
};

export const getModelByIdApi = async (modelId: string | number) => {
  return fetch(`${backUrl}/model?id=${modelId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const searchModelsByTitleApi = async (title: string) => {
  return fetch(`${backUrl}/model/search?title=${title}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getRecommendModelApi = async () => {
  return fetch(`${backUrl}/model/recommend`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getLatestModelApi = async () => {
  return fetch(`${backUrl}/model/latest`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSubscribeModelApi = async (userId: string) => {
  return fetch(`${backUrl}/model/subscribe?userId=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getModelLikeCountsApi = async (modelId: string) => {
  return fetch(`${backUrl}/model/like/count?id=${modelId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const isModelLikedByUserApi = async (
  modelId: string,
  userId: string
) => {
  return fetch(
    `${backUrl}/model/like/judge?modelId=${modelId}&userId=${userId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getModelControlByModelIdApi = async (modelId: string) => {
  return fetch(`${backUrl}/model/control?id=${modelId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addModelLikeApi = async (
  modelId: string | number,
  userId: string | number
) => {
  return fetch(
    `${backUrl}/model/like/add?modelId=${modelId}&userId=${userId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteModelLikeApi = async (
  modelId: string | number,
  userId: string | number
) => {
  return fetch(
    `${backUrl}/model/like/delete?modelId=${modelId}&userId=${userId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export type UploadModelType = ModelUploadState & { authorId: string };

export const uploadModelApi = async (uploadData: UploadModelType) => {
  return fetch(`${backUrl}/model/upload`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(uploadData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
