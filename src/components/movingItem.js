import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingItem = ({ player, setCollision, children }) => {
  const ref = useRef();

  useFrame((_state, delta) => {
    console.log(player?.current?.position.y >= 1);

    ref.current.position.z -= delta * 15;

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
      setCollision(false);
    }

    if (
      ref.current.position.z <= -23.5 &&
      ref.current.position.z > -24.5 &&
      player?.current?.position.y <= 1
    ) setCollision(true);
  });

  return (
    <group ref={ref}>{children}</group>
  );
};

export default MovingItem;
