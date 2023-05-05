import BaseModel, { BaseModelFields } from "./BaseModel";
import UserShort, { UserShortFields } from "./UserShort";

export type ThreeModelShortFields = {
  coverUrl: string;
  title: string;
  likeCount: number;
} & BaseModelFields;

export default class ThreeModelShort extends BaseModel {
  author: UserShort;
  coverUrl: string;
  title: string;
  likeCount: number;

  constructor(
    id: string,
    author: UserShort,
    coverUrl: string,
    title: string,
    likeCount: number,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, createTime, updateTime);
    this.author = author;
    this.coverUrl = coverUrl;
    this.title = title;
    this.likeCount = likeCount;
  }

  static fromJson(modelDate: ThreeModelShortFields, userDate: UserShortFields) {
    const author = UserShort.fromJson(userDate);
    return new ThreeModelShort(
      modelDate.id,
      author,
      modelDate.coverUrl,
      modelDate.title,
      modelDate.likeCount,
      modelDate.createTime,
      modelDate.updateTime
    );
  }
}
