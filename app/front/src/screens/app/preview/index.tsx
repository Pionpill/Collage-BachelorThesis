import { PivotControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ARButton, Controllers, Interactive, XR } from "@react-three/xr";
import { Leva } from "leva";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getModelByIdApi,
  getModelLikeCountsApi,
  ModelApiType,
  ModelControlApiType,
} from "../../../api/modelApi";
import { getUserById } from "../../../api/userApi";
import ARPrompt from "../../../components/ARPrompt";
import FlexBox from "../../../components/FlexBox";
import AREnvironment from "../../../components/three/AREnvironment";
import ARPreviewModel from "../../../components/three/ARPreviewModel";
import {
  threeModelBench,
  threeModelKamdo,
  threeModelLight,
  threeModelMac,
  threeModelMaple,
  threeModelShoes,
} from "../../../data/threeModel";
import ThreeModel, {
  CommonControlFields,
  EnvironmentFields,
  FloatFields,
  ThreeModelFields,
} from "../../../models/ThreeModel";
import User from "../../../models/User";
import { UserShortFields } from "../../../models/UserShort";
import { RootState } from "../../../store";
import PreviewPrompt from "./PreviewPrompt";
import Widgets from "./Widgets";

const Preview: React.FC = () => {
  const userId = useSelector((state: RootState) => state.account.userId);
  const [ARMode, setARMode] = React.useState<boolean>(false);
  const isPivot = useSelector((state: RootState) => state.preview.isPivot);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.preview.isHelpPrompt
  );
  const modelParam = useParams().model;
  const [model, setModel] = React.useState<ThreeModel | null>(null);
  // TODO 和 modelPreview 重复，待重构
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
  const LevaPanel: React.FC = () => {
    const isPure = useSelector((state: RootState) => state.preview.isPure);
    return <Leva collapsed hidden={!ARMode || isPure} />;
  };
  return (
    <>
      <Widgets dialHidden={!ARMode} />
      <FlexBox
        sx={{
          height: "calc(100vh - 56px)",
          position: "relative",
          bgcolor: ARMode ? "auto" : "background.paper",
        }}
      >
        <LevaPanel />
        <ARPrompt sx={{ visibility: ARMode ? "hidden" : "visible" }} />
        <PreviewPrompt
          sx={{ visibility: ARMode && isHelpPrompt ? "visible" : "hidden" }}
        />
        <ARButton />
        <Canvas>
          <XR
            onSessionStart={() => setARMode(true)}
            onSessionEnd={() => setARMode(false)}
          >
            <AREnvironment />
            <Interactive>
              <PivotControls
                depthTest={false}
                anchor={[0, 0, 0]}
                visible={!isPivot}
              >
                {model && <ARPreviewModel modelUrl={model?.modelUrl} />}
              </PivotControls>
            </Interactive>
            <Controllers />
          </XR>
        </Canvas>
      </FlexBox>
    </>
  );
};

export default Preview;
