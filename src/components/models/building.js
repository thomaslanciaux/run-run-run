import { useGLTF } from '@react-three/drei'

const Building = (props) => {
  const { nodes, materials } = useGLTF('/models/building.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_1.geometry} material={materials.Meat} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_2.geometry} material={materials.brown} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_3.geometry} material={materials.mirror} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_4.geometry} material={materials.concret2} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_5.geometry} material={materials.metal} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_6.geometry} material={materials.concret} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_7.geometry} material={materials.L_sign} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_8.geometry} material={materials.dark} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_9.geometry} material={materials.white} />
      <mesh castShadow receiveShadow geometry={nodes.Box15819_Meat_0_10.geometry} material={materials.black} />
    </group>
  )
}

useGLTF.preload('/models/building.glb')

export default Building;
