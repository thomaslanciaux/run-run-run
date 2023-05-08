import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function Building2Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/building2.glb')
  const instances = useMemo(
    () => ({
      Cube: nodes.Cube019,
      Cube1: nodes.Cube019_1,
      Cube2: nodes.Cube019_2,
      Cube3: nodes.Cube019_3,
      Cube4: nodes.Cube019_4,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Building2(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Cube />
      <instances.Cube1 />
      <instances.Cube2 />
      <instances.Cube3 />
      <instances.Cube4 />
    </group>
  )
}

useGLTF.preload('/models/building2.glb')
