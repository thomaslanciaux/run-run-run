import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three';

const Timmy = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/timmy.glb')
  const { actions, mixer } = useAnimations(animations, group)
  const { isJumping, gameOver, isPaused } = props;

  useEffect(() => {
    actions['DEAD'].setLoop(THREE.LoopOnce);
    actions['DEAD'].clampWhenFinished = true;
    actions['RUN'].timeScale = 1.4;
    actions['DEAD'].timeScale = 2;
  }, [actions]);

  useEffect(() => {
    const currentAction = gameOver ? 'DEAD' : isJumping ? 'JUMP' : 'RUN';

    for (const action in actions) {
      actions[action].stop();
    };

    actions[currentAction].play();
  }, [actions, isJumping, gameOver]);

  useEffect(() => {
    mixer.timeScale = isPaused && !gameOver ? 0 : 1;
  }, [isPaused, mixer, gameOver]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive castShadow receiveShadow object={nodes.mixamorig6Hips} />
        <skinnedMesh castShadow receiveShadows name="Ch09" geometry={nodes.Ch09.geometry} material={materials.Ch09_body} skeleton={nodes.Ch09.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/timmy.glb')

export default Timmy;
