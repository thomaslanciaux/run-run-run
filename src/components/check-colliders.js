import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';
import * as THREE from 'three';

const CheckColliders = ({ colliders, player }) => {
  const { setGameOver, gameOver, isPlaying, isPaused } = useGameContext();

  useFrame(() => {
    if (!isPlaying || gameOver || isPaused) return;

    colliders.forEach(collider => {
      const bbox = new THREE.Box3().setFromObject(collider.current);
      const bboxSize = new THREE.Vector3(bbox);
      bbox.getSize(bboxSize);

      if (
        collider.current.position.z <= player?.current?.position?.z + 1.2 &&
        collider.current.position.z >= player?.current?.position?.z - 1.2 &&
        player.current.position?.y <= bboxSize.y
      ) {
        setGameOver(true);
        collider.current.position.z = player?.current?.position?.z + bboxSize.z;
      }
    });

    return null;
  });
};

export default CheckColliders; 
