/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 --instanceall Bakery.glb
*/

import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function BakeryInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/bakery.glb')
  const instances = useMemo(
    () => ({
      Bakerymesh: nodes.Bakery_mesh,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Bakery(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Bakerymesh />
    </group>
  )
}

useGLTF.preload('/models/bakery.glb')
