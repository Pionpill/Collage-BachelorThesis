import BaseModel, { BaseModelFields } from "./BaseModel";
import UserShort, { UserShortFields } from "./UserShort";

export type MarkerInfoShortFields = {
  coverUrl: string;
  title: string;
  abstract: string;
} & BaseModelFields;

export default class MarkerInfoShort extends BaseModel {
  author: UserShort;
  coverUrl: string;
  title: string;
  abstract: string;

  constructor(
    id: string,
    author: UserShort,
    coverUrl: string,
    title: string,
    abstract: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, createTime, updateTime);
    this.author = author;
    this.coverUrl = coverUrl;
    this.title = title;
    this.abstract = abstract;
  }

  static fromJson(
    markerShortDate: MarkerInfoShortFields,
    userDate: UserShortFields
  ) {
    const author = UserShort.fromJson(userDate);
    return new MarkerInfoShort(
      markerShortDate.id,
      author,
      markerShortDate.coverUrl,
      markerShortDate.title,
      markerShortDate.abstract,
      markerShortDate.createTime,
      markerShortDate.updateTime
    );
  }
}
