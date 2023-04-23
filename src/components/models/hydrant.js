import { useGLTF } from '@react-three/drei'

export default function Hydrant(props) {
  const { nodes, materials } = useGLTF('/models/hydrant.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Circle_Material003_0.geometry} material={materials['Material.003']} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh castShadow receiveShadow geometry={nodes.Circle001_Material_0.geometry} material={materials['Material.003']} position={[0, 238, -92.16]} scale={42.17} />
        <mesh castShadow receiveShadow geometry={nodes.Circle002_Material_0.geometry} material={materials['Material.003']} position={[69.44, 242.26, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={76.19} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder001_Material_0.geometry} material={materials['Material.001']} position={[-29.81, 27.07, -103.86]} rotation={[-Math.PI / 2, 0, -0.32]} scale={[10.14, 10.14, 15.72]} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder002_Material_0.geometry} material={materials['Material.001']} position={[-29.81, 329.77, -112.61]} rotation={[-Math.PI / 2, 0, -0.32]} scale={[10.95, 10.95, 25.7]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/hydrant.glb')
