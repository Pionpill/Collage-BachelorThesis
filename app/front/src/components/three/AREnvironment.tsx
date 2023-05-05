import { Environment } from "@react-three/drei";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { useControls } from "leva";
import React, { useTransition } from "react";

const AREnvironment: React.FC = () => {
  const [preset, setPreset] = React.useState<PresetsType>("sunset");
  const [inTransition, startTransition] = useTransition();
  useControls({
    preset: {
      value: "park",
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      onChange: (value) => startTransition(() => setPreset(value)),
    },
  });
  return <Environment preset={preset} />;
};

export default AREnvironment;
