import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';
import * as THREE from 'three';

const CheckColliders = ({ debug = false, player }) => {
  const { setGameOver, gameOver, isPlaying, isPaused, colliders } = useGameContext();

  useFrame(() => {
    if (!isPlaying || gameOver || isPaused) return;

    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      const bbox = new THREE.Box3().setFromObject(collider.current);
      const bboxSize = new THREE.Vector3(bbox);
      bbox.getSize(bboxSize);

      if (debug) return;

      if (
        collider.current.position.z <= player?.current?.position?.z + 0.5 &&
        collider.current.position.z >= player?.current?.position?.z - 0.5 &&
        player.current.position?.y <= bboxSize.y - 0.5
      ) {
        setGameOver(true);
        collider.current.position.z = player?.current?.position?.z + (bboxSize.z/2);
      }
    }

    return null;
  });
};

export default CheckColliders; 
