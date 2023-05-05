import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FlexBox from "../../components/FlexBox";
import SimpleEnvironment from "../../components/three/SimpleEnvironment";

const RegistryScene: React.FC = () => (
  <FlexBox
    sx={{
      height: "350px",
      marginBottom: "-75px",
    }}
  >
    <Canvas shadows orthographic camera={{ position: [-8, 5, 10], zoom: 55 }}>
      <SimpleEnvironment />
      <ContactShadows
        resolution={1024}
        scale={20}
        position={[0, 0, 0]}
        blur={0.75}
        opacity={0.5}
        far={1.05}
        color="red"
      />
      <Float
        speed={3}
        rotationIntensity={2}
        floatIntensity={5}
        position={[0, 1.75, 0]}
      >
        <mesh>
          <octahedronGeometry />
          <meshStandardMaterial color="salmon" />
        </mesh>
      </Float>
      <OrbitControls />
    </Canvas>
  </FlexBox>
);

export default RegistryScene;
