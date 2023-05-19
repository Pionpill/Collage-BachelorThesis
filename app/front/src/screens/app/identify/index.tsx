import { ARButton } from "@react-three/xr";
import { Leva } from "leva";
import React from "react";
import { useSelector } from "react-redux";
import {
  getCommonMarkersApi,
  getMarkersByGeoApi,
  MarkerApiType,
} from "../../../api/markerApi";
import { getModelByIdApi } from "../../../api/modelApi";
import { getUserById } from "../../../api/userApi";
import ARPrompt from "../../../components/ARPrompt";
import FlexBox from "../../../components/FlexBox";
import Marker, { MarkerFields } from "../../../models/Marker";
import { UserShortFields } from "../../../models/UserShort";
import { RootState } from "../../../store";
import IdentifyPrompt from "./IdentifyPrompt";
import IdentifyScene from "./IdentifyScene";
import InfoCard from "./InfoCard";
import InfoTip from "./InfoTip";
import Widgets from "./Widgets";

const Identify: React.FC = () => {
  const [ARMode, setARMode] = React.useState<boolean>(false);
  const isHelpPrompt = useSelector(
    (state: RootState) => state.identify.isHelpPrompt
  );
  const [init, setInit] = React.useState<boolean>(false);
  const [markers, setMarkers] = React.useState<Array<Marker>>(null!);
  const LevaPanel: React.FC = () => {
    const isPure = useSelector((state: RootState) => state.identify.isPure);
    return <Leva collapsed hidden={!ARMode || isPure} />;
  };

  const markerAdapter = async (markerApiData: MarkerApiType) => {
    let modelUrl: string = "";
    if (markerApiData.modelId)
      await (await getModelByIdApi(markerApiData.modelId))
        .json()
        .then((response) => {
          modelUrl = response.data.modelUrl;
        });
    const markerData: MarkerFields = {
      id: String(markerApiData.id),
      type: markerApiData.fileType,
      fileUrl: markerApiData.fileUrl,
      modelUrl: modelUrl,
    };
    const author = await getUserById(markerApiData.authorId);
    const userData: UserShortFields = {
      id: author.id,
      name: author.name,
      avatarUrl: author.avatarUrl,
    };
    const marker = Marker.fromJson(markerData, userData);
    return marker;
  };

  const initMarkerData = () => {
    const successCallBack = async (data: any) => {
      const lon = data.coords.longitude;
      const lat = data.coords.latitude;
      const markers: Marker[] = [];
      await (await getMarkersByGeoApi(lon, lat))
        .json()
        .then(async (response) => {
          const markersApiData: MarkerApiType[] = response.data;
          for (const markerApiData of markersApiData) {
            const marker = await markerAdapter(markerApiData);
            markers.push(marker);
          }
        });
      await (await getCommonMarkersApi()).json().then(async (response) => {
        const markersApiData: MarkerApiType[] = response.data;
        for (const markerApiData of markersApiData) {
          const marker = await markerAdapter(markerApiData);
          markers.push(marker);
        }
      });
      setMarkers(markers);
      setInit(true);
    };

    const errorCallBack = async () => {
      const markers: Marker[] = [];
      await (await getCommonMarkersApi()).json().then(async (response) => {
        const markersApiData: MarkerApiType[] = response.data;
        for (const markerApiData of markersApiData) {
          const marker = await markerAdapter(markerApiData);
          markers.push(marker);
        }
      });
      setMarkers(markers);
      setInit(true);
    };
    // 定位失败的回调
    const failCallBack = errorCallBack;
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
    if (markers === null) {
      failCallBack();
    }
  };
  React.useEffect(() => {
    initMarkerData();
  }, [init]);
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
        {init && <ARButton onClick={() => setARMode(!ARMode)} />}
        <InfoTip />
        <InfoCard />
        <ARPrompt sx={{ visibility: ARMode ? "hidden" : "visible" }} />
        <IdentifyPrompt
          sx={{ visibility: ARMode && isHelpPrompt ? "visible" : "hidden" }}
        />
        {ARMode && <IdentifyScene markers={markers} />}
      </FlexBox>
    </>
  );
};

export default Identify;
