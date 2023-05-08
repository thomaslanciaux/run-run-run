import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function HouseInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/house.glb')
  const instances = useMemo(
    () => ({
      Plane: nodes.Plane010,
      Plane1: nodes.Plane010_1,
      Plane2: nodes.Plane010_2,
      Plane3: nodes.Plane010_3,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function House(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group rotation={[0, Math.PI / 2, 0]}>
        <instances.Plane />
        <instances.Plane1 />
        <instances.Plane2 />
        <instances.Plane3 />
      </group>
    </group>
  )
}

useGLTF.preload('/models/house.glb');
