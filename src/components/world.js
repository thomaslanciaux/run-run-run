import * as POSTPROCESSING from "postprocessing"
import { useGameContext } from '@/hooks/game-context';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Environment, Cloud, OrbitControls } from '@react-three/drei';
import { MotionBlurEffect, VelocityDepthNormalPass } from "realism-effects"

const OFFSET = 30;
const FLOOR_ITEMS = 20;

const MovingFloorItem = ({ children, position }) => {
  const { gameOver } = useGameContext();
  const ref = useRef();

  useFrame((_state, delta) => {
    if (gameOver) return;

    ref.current.position.z -= (delta * 15);

    if (ref.current.position.z <= -OFFSET) {
      ref.current.position.z = OFFSET;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
};

const World = ({ player }) => {
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
      <OrbitControls />
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
      <group position={[0, -0.025, 0]} receiveShadow>
        {[...Array(FLOOR_ITEMS)].map((_value, index) => (
          <MovingFloorItem
            key={index}
            index={index}
            position={[0, 0, -OFFSET + (index / FLOOR_ITEMS) * OFFSET * 2]}
            player={player}
          >
            <mesh receiveShadow>
              <boxGeometry args={[4, 0.05, 2]} />
              <meshLambertMaterial />
            </mesh>
          </MovingFloorItem>
        ))}
      </group>
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
