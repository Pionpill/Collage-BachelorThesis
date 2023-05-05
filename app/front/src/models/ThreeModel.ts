import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import ThreeModelShort, { ThreeModelShortFields } from "./ThreeModelShort";
import UserShort, { UserShortFields } from "./UserShort";

export type ControlFields = {
  autoRotateSpeed?: number;
};

export type EnvironmentFields = {
  background?: boolean;
  preset?: PresetsType;
  blur?: number;
};

export type FloatFields = {
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
};

export type ThreeModelFields = {
  abstract: string;
  modelUrl: string;
  controlFields?: ControlFields;
  environmentFields?: EnvironmentFields;
  floatFields?: FloatFields;
} & ThreeModelShortFields;

export default class ThreeModel extends ThreeModelShort {
  abstract: string;
  modelUrl: string;
  controlFields?: ControlFields;
  environmentFields?: EnvironmentFields;
  floatFields?: FloatFields;
  constructor(
    id: string,
    author: UserShort,
    coverUrl: string,
    title: string,
    likeCount: number,
    abstract: string,
    modelUrl: string,
    createTime?: Date,
    updateTime?: Date
  ) {
    super(id, author, coverUrl, title, likeCount, createTime, updateTime);
    this.abstract = abstract;
    this.modelUrl = modelUrl;
  }

  public static fromJson(
    modelDate: ThreeModelFields,
    userDate: UserShortFields
  ) {
    const author = UserShort.fromJson(userDate);
    return new ThreeModel(
      modelDate.id,
      author,
      modelDate.coverUrl,
      modelDate.title,
      modelDate.likeCount,
      modelDate.abstract,
      modelDate.modelUrl,
      modelDate.createTime,
      modelDate.updateTime
    );
  }
}
