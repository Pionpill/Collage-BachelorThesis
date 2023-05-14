import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getModelByIdApi,
  getModelLikeCountsApi,
  ModelApiType,
  ModelControlApiType,
} from "../../../../api/modelApi";
import { getUserById } from "../../../../api/userApi";
import MainContainer from "../../../../components/MainContainer";
import {
  threeModelBench,
  threeModelKamdo,
  threeModelLight,
  threeModelMac,
  threeModelMaple,
  threeModelShoes,
} from "../../../../data/threeModel";
import ThreeModel, {
  CommonControlFields,
  EnvironmentFields,
  FloatFields,
  ThreeModelFields,
} from "../../../../models/ThreeModel";
import User from "../../../../models/User";
import { UserShortFields } from "../../../../models/UserShort";
import { RootState } from "../../../../store";
import AbstractInfo from "./AbstractInfo";
import DetailInfo from "./DetailInfo";
import ModelScene from "./ModelScene";
import Widgets from "./Widgets";

const ModelPreview: React.FC = () => {
  const isDetailModel = useSelector((state: RootState) => state.model.isDetail);
  const modelParam = useParams().model;
  const userId = useSelector((state: RootState) => state.account.userId);
  const [model, setModel] = React.useState<ThreeModel | null>(null);
  // TODO 和 preview 重复，待重构
  const initModel = async (id: string) => {
    let modelApiDate: ModelApiType | null = null;
    await (await getModelByIdApi(id)).json().then((response) => {
      modelApiDate = response.data;
    });
    let likeCount = 0;
    await (await getModelLikeCountsApi(String(modelApiDate!.id)))
      .json()
      .then((response) => (likeCount = response.data));
    const modelData: ThreeModelFields = {
      id: String(modelApiDate!.id),
      abstract: modelApiDate!.abstractInfo,
      modelUrl: modelApiDate!.modelUrl,
      createTime: new Date(modelApiDate!.createTime),
      updateTime: new Date(modelApiDate!.updateTime),
      coverUrl: modelApiDate!.coverUrl,
      title: modelApiDate!.title,
      likeCount: likeCount,
    };
    const author = (await getUserById(String(modelApiDate!.authorId))) as User;

    const userData: UserShortFields = {
      id: author.id,
      name: author.name,
      avatarUrl: author.avatarUrl,
    };
    let modelControlApiDate: ModelControlApiType = {
      id: 0,
      autoRotateSpeed: 0,
      background: false,
      preset: "sunset",
      blur: 0,
      speed: 0,
      rotationIntensity: 0,
      floatIntensity: 0,
      createTime: "",
      updateTime: "",
    };
    await (await getModelByIdApi(id)).json().then((response) => {
      modelControlApiDate = response.data;
    });
    const controlDate = modelControlApiDate as CommonControlFields &
      EnvironmentFields &
      FloatFields;
    const model: ThreeModel = ThreeModel.fromJson(
      modelData,
      userData,
      controlDate
    );
    setModel(model);
  };
  React.useEffect(() => {
    if (userId === "visitor" && modelParam) {
      switch (modelParam.slice(6)) {
        case "1":
          setModel(threeModelShoes);
          break;
        case "2":
          setModel(threeModelMac);
          break;
        case "3":
          setModel(threeModelKamdo);
          break;
        case "4":
          setModel(threeModelBench);
          break;
        case "5":
          setModel(threeModelMaple);
          break;
        case "6":
          setModel(threeModelLight);
          break;
        default:
          setModel(threeModelShoes);
          break;
      }
    } else if (modelParam) {
      initModel(modelParam.slice(6));
    }
  }, []);
  return (
    <MainContainer
      sx={{ position: "relative", p: 0, pb: 8, height: "calc(100vh - 56px)" }}
    >
      <Widgets />
      {model ? (
        <ModelScene model={model} />
      ) : (
        <Skeleton width="100vw" height="100vh" />
      )}
      {isDetailModel ? (
        model ? (
          <DetailInfo model={model} />
        ) : (
          <Skeleton sx={{ p: 2, pb: "72px", height: "calc(100vh - 400px)" }} />
        )
      ) : model ? (
        <AbstractInfo model={model} />
      ) : (
        <Skeleton
          sx={{
            position: "fixed",
            bottom: "80px",
            width: "90%",
            ml: "50%",
            transform: "translate(-50%)",
          }}
        />
      )}
    </MainContainer>
  );
};

export default ModelPreview;
