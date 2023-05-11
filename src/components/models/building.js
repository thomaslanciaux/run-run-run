import { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

const Building = (props) => {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/models/building.glb')
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_1.geometry}>
        <meshStandardMaterial color={props.color} roughness="0.5" />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_2.geometry} material={materials.brown} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_3.geometry}>
        <meshStandardMaterial metalness="1" roughness="0.2" />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_4.geometry}>
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_5.geometry} material={materials.metal} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_7.geometry} material={materials.L_sign} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_8.geometry} material={materials.dark} />
    </group>
  )
}

useGLTF.preload('/models/building.glb')

export default Building;
