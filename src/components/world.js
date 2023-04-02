import * as POSTPROCESSING from "postprocessing"
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, Cloud } from '@react-three/drei';
import { MotionBlurEffect, VelocityDepthNormalPass } from "realism-effects"

const World = () => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const composer = new POSTPROCESSING.EffectComposer(gl)
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(velocityDepthNormalPass)
    const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)
    const effectPass = new POSTPROCESSING.EffectPass(camera, motionBlurEffect);
    composer.addPass(effectPass);
  }, [camera, gl, scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <fog attach="fog" args={['#93c5fd', 25, 30]} />
      <Environment preset="dawn" />
      <directionalLight
        castShadow
        color="orange"
        position={[10, 10, 10]}
        shadow-camera-bottom={-20}
        shadow-camera-top={20}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-mapSize-width={2048}
        shadow-bias={-0.0001}
      />
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 200]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <group position={[3, 0, 0]}>
        <Cloud position={[0, 5, -5]} args={[1, 1]} scale={0.4} />
        <Cloud position={[0, 4, -7]} args={[1, 2]} scale={0.2} />
        <Cloud position={[0, 4, -7]} args={[1, 2]} scale={0.2} />
        <Cloud position={[0, 10, 20]} args={[1, 3]} scale={0.8} />
      </group>
    </>
  );
};

export default World;
