import { Environment } from "@react-three/drei";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { useControls } from "leva";
import React, { useTransition } from "react";
import { EnvironmentFields } from "../../models/ThreeModel";

// 模型环境，用于主页显示模型
const ModelEnvironment: React.FC<{ fields?: EnvironmentFields }> = ({
  fields,
}) => {
  const [preset, setPreset] = React.useState<PresetsType>(
    fields?.preset || "sunset"
  );
  const [inTransition, startTransition] = useTransition();
  const { blur, background } = useControls({
    background: { value: fields?.background || true, options: [true, false] },
    preset: {
      value: preset,
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
    blur: { value: fields?.blur || 0, min: 0, max: 1 },
  });
  return <Environment preset={preset} background={background} blur={blur} />;
};

export default ModelEnvironment;
