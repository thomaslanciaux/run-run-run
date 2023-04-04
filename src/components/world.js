import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, Cloud } from '@react-three/drei';
import { TRAAEffect, MotionBlurEffect, VelocityDepthNormalPass } from 'realism-effects';
import * as POSTPROCESSING from 'postprocessing';
import MovingItem from '@/components/moving-item';

const OFFSET = 30;
const FLOOR_ITEMS = 15;
const CLOUD_TEXTURE = '/textures/cloud.png';

const World = () => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const composer = new POSTPROCESSING.EffectComposer(gl)
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(velocityDepthNormalPass)
    const motionBlur = new MotionBlurEffect(velocityDepthNormalPass);
    const effectPass = new POSTPROCESSING.EffectPass(camera, motionBlur)
    composer.addPass(effectPass);
  }, []); //eslint-disable-line

  return (
    <>
      <ambientLight intensity={0.5} />
      <fog args={['#93c5fd', 25, 30]} attach="fog" />
      <Environment preset="dawn" />
      <directionalLight
        castShadow
        color="orange"
        position={[10, 10, 10]}
        shadow-camera-bottom={-20}
        shadow-camera-top={20}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-mapSize={1024}
        shadow-bias={-0.00001}
        intensity={0.5}
      />
      <group position={[6, 0.25, 0]} receiveShadow>
        {[...Array(FLOOR_ITEMS)].map((_value, index) => (
          <MovingItem
            key={index}
            position={[0, 0, -30  + (index / FLOOR_ITEMS) * OFFSET * 2]}
          >
            <mesh receiveShadow castShadow>
              <boxGeometry args={[0.5, 0.5, 1]} />
              <meshPhongMaterial />
            </mesh>
            <mesh receiveShadow castShadow position={[-10, 0, 0]}>
              <boxGeometry args={[0.5, 0.5, 1]} />
              <meshLambertMaterial />
            </mesh>
          </MovingItem>
        ))}
      </group>
      <mesh rotation-x={-Math.PI/2} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[15, 120]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <group position={[3, 0, 0]}>
        <Cloud texture={CLOUD_TEXTURE} position={[0, 5, -5]} args={[1, 1]} scale={0.4} />
        <Cloud texture={CLOUD_TEXTURE} position={[0, 6, -7]} args={[1, 2]} scale={0.2} />
        <Cloud texture={CLOUD_TEXTURE} position={[0, 5, -7]} args={[1, 2]} scale={0.2} />
        <Cloud texture={CLOUD_TEXTURE} position={[0, 10, 20]} args={[1, 3]} scale={0.8} />
      </group>
    </>
  );
};

export default World;
