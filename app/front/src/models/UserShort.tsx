import BaseModel, { BaseModelFields } from "./BaseModel";
import User from "./User";

export type UserShortFields = {
  name: string;
  avatarUrl: string;
} & BaseModelFields;

export default class UserShort extends BaseModel {
  avatarUrl: string;
  name: string;

  constructor(
    id: string,
    name: string,
    avatarUrl: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, createTime, updateTime);
    this.name = name;
    this.avatarUrl = avatarUrl;
  }

  static fromJson(data: UserShortFields): UserShort {
    return new UserShort(
      data.id,
      data.name,
      data.avatarUrl,
      data.createTime,
      data.updateTime
    );
  }

  static fromUser(user: User): UserShort {
    return new UserShort(
      user.id,
      user.name,
      user.avatarUrl,
      user.createTime,
      user.updateTime
    );
  }
}
