import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/hydrant.glb')
  const instances = useMemo(
    () => ({
      CircleMaterial: nodes.Circle_Material003_0,
      CircleMaterial1: nodes.Circle001_Material_0,
      CircleMaterial2: nodes.Circle002_Material_0,
      CylinderMaterial: nodes.Cylinder001_Material_0,
      CylinderMaterial1: nodes.Cylinder002_Material_0,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Hydrant(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <instances.CircleMaterial rotation={[-Math.PI / 2, 0, 0]} scale={100} castShadow receiveShadow />
        <instances.CircleMaterial1 position={[0, 238, -92.16]} scale={42.17} castShadow receiveShadow />
        <instances.CircleMaterial2 position={[69.44, 242.26, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={76.19} castShadow receiveShadow />
        <instances.CylinderMaterial position={[-29.81, 27.07, -103.86]} rotation={[-Math.PI / 2, 0, -0.32]} scale={[10.14, 10.14, 15.72]} castShadow receiveShadow />
        <instances.CylinderMaterial1 position={[-29.81, 329.77, -112.61]} rotation={[-Math.PI / 2, 0, -0.32]} scale={[10.95, 10.95, 25.7]} castShadow receiveShadow />
      </group>
    </group>
  )
}

useGLTF.preload('/models/hydrant.glb')
