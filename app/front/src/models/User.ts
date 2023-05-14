import UserShort, { UserShortFields } from "./UserShort";

export enum UserPermission {
  visitor = "visitor",
  student = "student",
  teacher = "teacher",
  admin = "admin",
}

export enum UserSexual {
  male = "male",
  female = "female",
  secret = "secret",
  undefined = "undefined",
}

export type UserFields = {
  sexual: UserSexual;
  permission: UserPermission;
  college?: string;
  department?: string;
  signature?: string;
  tags?: string[];
} & UserShortFields;

export default class User extends UserShort {
  sexual: UserSexual;
  permission: UserPermission;
  college: string | null;
  department: string | null;
  signature: string | null;
  tags: string[] | null;

  constructor(
    id: string,
    name: string,
    avatarUrl: string,
    sexual: UserSexual,
    permission: UserPermission,
    signature?: string,
    college?: string,
    department?: string,
    tags?: string[],
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, name, avatarUrl, createTime, updateTime);
    this.sexual = sexual;
    this.permission = permission;
    this.college = college || null;
    this.department = department || null;
    this.signature = signature || null;
    this.tags = tags || null;
  }

  // TODO: UserSexual, UserPermission 等类型需要转换
  static fromJson(data: UserFields): User {
    return new User(
      String(data.id),
      data.name,
      data.avatarUrl,
      data.sexual,
      data.permission,
      data.signature,
      data.college,
      data.department,
      data.tags,
      data.createTime,
      data.updateTime
    );
  }
}
