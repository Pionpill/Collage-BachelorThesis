import { Base, Geometry, Subtraction } from "@react-three/csg";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ExtrudeGeometry } from "three";
import FlexBox from "../../components/FlexBox";
import SimpleEnvironment from "../../components/three/SimpleEnvironment";

const RoundedBoxGeometry: React.FC<{
  width?: number;
  height?: number;
  radius?: number;
  depth?: number;
}> = ({ width = 1, height = 1, radius = 0.2, depth = 1 }) => {
  const geometry = useRef<ExtrudeGeometry>(null!);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, -height / 2 + radius);
    s.lineTo(-width / 2, height / 2 - radius);
    s.absarc(
      -width / 2 + radius,
      height / 2 - radius,
      radius,
      1 * Math.PI,
      0.5 * Math.PI,
      true
    );
    s.lineTo(width / 2 - radius, height / 2);
    s.absarc(
      width / 2 - radius,
      height / 2 - radius,
      radius,
      0.5 * Math.PI,
      0 * Math.PI,
      true
    );
    s.lineTo(width / 2, -height / 2 + radius);
    s.absarc(
      width / 2 - radius,
      -height / 2 + radius,
      radius,
      2 * Math.PI,
      1.5 * Math.PI,
      true
    );
    s.lineTo(-width / 2 + radius, -height / 2);
    s.absarc(
      -width / 2 + radius,
      -height / 2 + radius,
      radius,
      1.5 * Math.PI,
      1 * Math.PI,
      true
    );
    return new THREE.Shape(s.getPoints(10));
  }, [width, height, radius, depth]);
  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth]);
  useLayoutEffect(() => {
    geometry.current.translate(0, 0, -depth / 2);
    geometry.current.computeVertexNormals();
  }, [shape]);
  return <extrudeGeometry ref={geometry} args={[shape, config]} />;
};

const AboveMesh: React.FC = () => {
  const [click, setClick] = useState(false);
  return (
    <Float speed={3} rotationIntensity={0} position={[0, 1, 0]}>
      <mesh castShadow receiveShadow onClick={(event) => setClick(!click)}>
        <Geometry>
          <Base>
            <RoundedBoxGeometry depth={0.25} />
          </Base>
          <Subtraction rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1]} />
          </Subtraction>
        </Geometry>
        <meshStandardMaterial color={click ? "orange" : "#2A8AFF"} />
      </mesh>
    </Float>
  );
};

const BelowMesh: React.FC = () => {
  const [click, setClick] = useState(false);
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, 0.1, 0]}
      onClick={(event) => setClick(!click)}
    >
      <cylinderGeometry args={[1, 1, 0.2]} />
      <meshStandardMaterial color={click ? "orange" : "cyan"} />
    </mesh>
  );
};

const TestScene: React.FC = () => {
  return (
    <FlexBox
      sx={{
        height: "350px",
        marginBottom: "-75px",
      }}
    >
      <Canvas shadows orthographic camera={{ position: [-8, 5, 10], zoom: 80 }}>
        <SimpleEnvironment />
        <AboveMesh />
        <BelowMesh />
        <ContactShadows
          resolution={1024}
          scale={20}
          position={[0, 0, 0]}
          blur={0.75}
          opacity={0.5}
          far={1.05}
          color="#1A5AaF"
        />
        <OrbitControls />
      </Canvas>
    </FlexBox>
  );
};

export default TestScene;
