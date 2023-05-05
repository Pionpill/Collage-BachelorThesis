import BaseModel from "./BaseModel";
import UserShort, { UserShortFields } from "./UserShort";

export type MarkerFields = {
  type: "pattern" | "barcode" | "nft" | "unknown";
  patternUrl: string;
  modelUrl?: string;
};

export default class Marker extends BaseModel {
  author: UserShort;
  type: "pattern" | "barcode" | "nft" | "unknown";
  patternUrl: string;
  modelUrl?: string;

  constructor(
    id: string,
    author: UserShort,
    type: "pattern" | "barcode" | "nft" | "unknown",
    patternUrl: string,
    modelUrl?: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, createTime, updateTime);
    this.author = author;
    this.type = type;
    this.patternUrl = patternUrl;
    this.modelUrl = modelUrl;
  }

  static fromJson(markerFields: MarkerFields, userDate: UserShortFields) {}
}
