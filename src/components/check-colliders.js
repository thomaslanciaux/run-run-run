import { useGameContext } from '@/hooks/game-context';
import * as THREE from 'three';

const CheckColliders = ({ colliders, player }) => {
  const { isPaused, setGameOver, gameOver } = useGameContext();

  if (gameOver) return;

  colliders.forEach(collider => {
    const bbox = new THREE.Box3().setFromObject(collider.current);
    const bboxSize = new THREE.Vector3(bbox);
    bbox.getSize(bboxSize);

    if (
      collider.current.position.z <= player?.current?.position?.z + 1.2 &&
      collider.current.position.z > player?.current?.position?.z - 1.2 &&
      player.current.position?.y <= bboxSize.y ||
      (isPaused && collider.current.position.z - player?.current?.position?.z > 4)
    ) {
      setGameOver(true);
      collider.current.position.z = -3;
    }
  });
  return null;
};

export default CheckColliders; 
