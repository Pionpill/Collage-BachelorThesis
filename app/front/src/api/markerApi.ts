import { backUrl } from "../config/api";

export type MarkerApiType = {
  authorId: number;
  createTime: string;
  fileType: "pattern" | "nft";
  fileUrl: string;
  id: number;
  infoId: number;
  lat: number;
  lon: number;
  markerType: "common" | "area";
  modelId: number;
  updateTime: String;
};

export type MarkerInfoApiType = {
  abstractInfo: string;
  detailInfo: string;
  authorId: number;
  coverUrl: string;
  createTime: string;
  id: number;
  location?: string;
  title: string;
  updateTime: string;
};

export const getMarkersByGeoApi = async (lon: number, lat: number) => {
  return fetch(`${backUrl}/marker/geo?lon=${lon}&lat=${lat}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCommonMarkersApi = async () => {
  return fetch(`${backUrl}/marker/common`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMarkerInfoByMarkerIdApi = async (markerId: string) => {
  return fetch(`${backUrl}/marker/info?markerId=${markerId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
