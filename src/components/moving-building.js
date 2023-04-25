import { useGameContext } from '@/hooks/game-context';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import constants from '@/libs/constants';
import Building from '@/components/models/building';
import { getColor } from '@/libs/utils';
import * as THREE from 'three';

const { OFFSET } = constants;

const MovingBuilding = (props) => {
  const ref = useRef();
  const { gameOver, isPaused, isPlaying, acceleration } = useGameContext();

  useFrame((_state, delta) => {
    if (!isPlaying || gameOver || isPaused) return;

    ref.current.position.z -= (delta * 15) + acceleration;

    if (ref.current.position.z <= -OFFSET) {
      ref.current.position.z = OFFSET;
      ref.current.children[0].children[0].material.color = new THREE.Color(getColor());
    }
  });

  return (
    <group ref={ref} position={props.position}>
      <Building
        scale={1}
        position={[12, -0.1, 0]}
        rotation-y={-Math.PI / 2}
        color={props.color}
      />
    </group>
  );
};

export default MovingBuilding;
