import { useThree, useFrame } from '@react-three/fiber';
import { Environment, Cloud, Sky } from '@react-three/drei';
import { MotionBlurEffect, VelocityDepthNormalPass } from 'realism-effects';
import * as POSTPROCESSING from 'postprocessing';
import MovingItem from '@/components/moving-item';
import Building from '@/components/models/building';
import constants from '@/libs/constants';

const { OFFSET, FLOOR_ITEMS } = constants;
const CLOUD_TEXTURE = '/textures/cloud.png';

const floorItems = Array.from({ length: FLOOR_ITEMS }, (_, index) => ({
  positionZ: -OFFSET  + (index / FLOOR_ITEMS) * OFFSET * 2
}));

const World = () => {
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    const composer = new POSTPROCESSING.EffectComposer(gl)
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(velocityDepthNormalPass)
    const motionBlur = new MotionBlurEffect(velocityDepthNormalPass);
    const effectPass = new POSTPROCESSING.EffectPass(camera, motionBlur)
    composer.addPass(effectPass);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <fog args={['#93c5fd', 80, 100]} attach="fog" />
      <Environment preset="dawn" />
      <directionalLight
        castShadow
        color="orange"
        position={[-20, 15, 15]}
        shadow-camera-bottom={-80}
        shadow-camera-top={80}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-mapSize={2048}
        shadow-bias={-0.00001}
        intensity={1}
      />
      <group position={[0, 0.25, 0]}>
        {floorItems.map(({ positionZ }, index) => (
          <MovingItem key={index} position={[0, 0, positionZ]}>
            <Building scale={1} position={[11, 0, 0]} rotation-y={-Math.PI / 2} />
          </MovingItem>
        ))}
      </group>
      <mesh rotation-x={-Math.PI/2} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
      <mesh rotation-x={-Math.PI/2} receiveShadow position={[0, -0.01, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      <Sky />
      <group position={[10, 2, 0]}>
        <Cloud texture={CLOUD_TEXTURE} depth={30} position={[20, 10, -5]} args={[1, 1]} scale={1} />
        <Cloud texture={CLOUD_TEXTURE} depth={30} position={[25, 8, -7]} args={[1, 2]} scale={0.8} />
        <Cloud texture={CLOUD_TEXTURE} depth={25} position={[20, 12, -7]} args={[1, 2]} scale={0.2} />
        <Cloud texture={CLOUD_TEXTURE} depth={26} position={[25, 10, 20]} args={[1, 3]} scale={0.8} />
      </group>
    </>
  );
};

export default World;
