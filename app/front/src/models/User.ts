import UserShort, { UserShortFields } from "./UserShort";

export enum UserPermission {
  visitor = "游客",
  student = "学生",
  teacher = "老师",
  admin = "管理员",
}

export enum UserSexual {
  male = "男",
  female = "女",
  secret = "保密",
  undefined = "未知",
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
      data.id,
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
