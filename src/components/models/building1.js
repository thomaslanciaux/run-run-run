import React, { useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function Building1Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/building1.glb')
  const instances = useMemo(
    () => ({
      Plane: nodes.Plane003,
      Plane1: nodes.Plane003_1,
      Plane2: nodes.Plane003_2,
      Plane3: nodes.Plane003_3,
      Plane4: nodes.Plane003_4,
      Plane5: nodes.Plane003_5,
      Plane6: nodes.Plane003_6,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => <context.Provider value={instances}>
        {children}
      </context.Provider>}
    </Merged>
  )
}

export function Building1(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Plane />
      <instances.Plane1 />
      <instances.Plane2 />
      <instances.Plane3 />
      <instances.Plane4 />
      <instances.Plane5 />
      <instances.Plane6 />
    </group>
  )
}

useGLTF.preload('/models/building1.glb')
