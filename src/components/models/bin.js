import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function BinInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/bin.glb')
  const instances = useMemo(
    () => ({
      Cone: nodes.Cone001__0,
      Cylinder: nodes.Cylinder001__0,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Bin(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Cone rotation={[-Math.PI / 2, 0, 0]} />
      <instances.Cylinder position={[0, 155.36, 0]} rotation={[-Math.PI / 2, 0, -0.87]} />
    </group>
  )
}

useGLTF.preload('/models/bin.glb')
