import { useFrame } from '@react-three/fiber';
import { useGameContext } from '@/hooks/game-context';
import { Box3, Vector3 } from 'three';

const CheckColliders = ({ player }) => {
  const { setGameOver, gameOver, isPlaying, isPaused, colliders } = useGameContext();

  useFrame(() => {
    if (!isPlaying || gameOver || isPaused) return;

    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      const bbox = new Box3().setFromObject(collider.current);
      const bboxSize = new Vector3(bbox);
      bbox.getSize(bboxSize);

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
