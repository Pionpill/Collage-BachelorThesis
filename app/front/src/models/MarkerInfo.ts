import MarkerInfoShort, { MarkerInfoShortFields } from "./MarkerInfoShort";
import UserShort, { UserShortFields } from "./UserShort";

export type MarkerInfoFields = {
  location?: string;
  introduction: string;
} & MarkerInfoShortFields;

export default class MarkerInfo extends MarkerInfoShort {
  location?: string;
  introduction: string;
  constructor(
    id: string,
    author: UserShort,
    coverUrl: string,
    title: string,
    abstract: string,
    introduction: string,
    location?: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, author, coverUrl, title, abstract, createTime, updateTime);
    this.introduction = introduction;
    this.location = location;
  }

  static fromJson(markerDate: MarkerInfoFields, userDate: UserShortFields) {
    const author = UserShort.fromJson(userDate);
    return new MarkerInfo(
      markerDate.id,
      author,
      markerDate.coverUrl,
      markerDate.title,
      markerDate.abstract,
      markerDate.introduction,
      markerDate.location,
      markerDate.createTime,
      markerDate.updateTime
    );
  }
}
