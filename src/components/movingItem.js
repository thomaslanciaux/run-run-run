import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingItem = (props) => {
  const ref = useRef();

  useFrame((_state, delta) => {
    ref.current.position.z -= delta * 15;

    if (ref.current.position.z <= -30) {
      ref.current.position.z = 30;
    }
  });

  return (
    <group ref={ref}>{props.children}</group>
  );
};

export default MovingItem;
