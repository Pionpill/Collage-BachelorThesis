import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MainContainer from "../../../../components/MainContainer";
import {
  threeModelBench,
  threeModelKamdo,
  threeModelLight,
  threeModelMac,
  threeModelMaple,
  threeModelShoes,
} from "../../../../data/threeModel";
import ThreeModel from "../../../../models/ThreeModel";
import { RootState } from "../../../../store";
import AbstractInfo from "./AbstractInfo";
import DetailInfo from "./DetailInfo";
import ModelScene from "./ModelScene";
import Widgets from "./Widgets";

const ModelPreview: React.FC = () => {
  const isDetailModel = useSelector((state: RootState) => state.model.isDetail);
  const modelParam = useParams().model;
  const [model, setModel] = React.useState<ThreeModel | null>(null);
  React.useEffect(() => {
    if (modelParam?.includes("preset")) {
      switch (modelParam.slice(6)) {
        case "preset-1":
          setModel(threeModelShoes);
          break;
        case "preset-3":
          setModel(threeModelMac);
          break;
        case "preset-4":
          setModel(threeModelKamdo);
          break;
        case "preset-6":
          setModel(threeModelBench);
          break;
        case "preset-8":
          setModel(threeModelMaple);
          break;
        case "preset-10":
          setModel(threeModelLight);
          break;
        default:
          setModel(threeModelShoes);
          break;
      }
    }
  });
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
