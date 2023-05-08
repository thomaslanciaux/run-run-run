import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function Building3Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/building3.glb')
  const instances = useMemo(
    () => ({
      Cube: nodes.Cube015,
      Cube1: nodes.Cube015_1,
      Cube2: nodes.Cube015_2,
      Cube3: nodes.Cube015_3,
      Cube4: nodes.Cube015_4,
      Cube5: nodes.Cube015_5,
      Cube6: nodes.Cube015_6,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Building3(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Cube />
      <instances.Cube1 />
      <instances.Cube2 />
      <instances.Cube3 />
      <instances.Cube4 />
      <instances.Cube5 />
      <instances.Cube6 />
    </group>
  )
}

useGLTF.preload('/models/building3.glb')
