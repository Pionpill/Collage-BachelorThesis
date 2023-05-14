import BaseModel from "./BaseModel";
import UserShort, { UserShortFields } from "./UserShort";

export type MarkerFields = {
  id: string;
  type: "pattern" | "barcode" | "nft" | "unknown";
  fileUrl: string;
  modelUrl?: string;
};

export default class Marker extends BaseModel {
  author: UserShort;
  type: "pattern" | "barcode" | "nft" | "unknown";
  fileUrl: string;
  modelUrl?: string;

  constructor(
    id: string,
    author: UserShort,
    type: "pattern" | "barcode" | "nft" | "unknown",
    fileUrl: string,
    modelUrl?: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, createTime, updateTime);
    this.author = author;
    this.type = type;
    this.fileUrl = fileUrl;
    this.modelUrl = modelUrl;
  }

  static fromJson(markerFields: MarkerFields, userDate: UserShortFields) {
    const author: UserShort = UserShort.fromJson(userDate);
    return new Marker(
      markerFields.id,
      author,
      markerFields.type,
      markerFields.fileUrl,
      markerFields.modelUrl
    );
  }
}
