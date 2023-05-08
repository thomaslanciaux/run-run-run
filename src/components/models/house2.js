import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function House2Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/house2.glb')
  const instances = useMemo(
    () => ({
      Plane: nodes.Plane015,
      Plane1: nodes.Plane015_1,
      Plane2: nodes.Plane015_2,
      Plane3: nodes.Plane015_3,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function House2(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Plane />
      <instances.Plane1 />
      <instances.Plane2 />
      <instances.Plane3 />
    </group>
  )
}

useGLTF.preload('/models/house2.glb')
