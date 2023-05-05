import { Environment } from "@react-three/drei";

// 简易光照环境，用于登录注册等界面小组件
const SimpleEnvironment: React.FC = () => {
  return (
    <>
      <hemisphereLight intensity={0.4} groundColor="white" />
      <spotLight
        position={[5, 10, -15]}
        intensity={1}
        angle={0.1}
        penumbra={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.000001}
      />
      <Environment preset="warehouse" />
    </>
  );
};

export default SimpleEnvironment;
