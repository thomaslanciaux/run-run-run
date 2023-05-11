import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function ShopInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/shop.glb')
  const instances = useMemo(
    () => ({
      Shop: nodes.Shop,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Shop(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <instances.Shop />
    </group>
  )
}

useGLTF.preload('/models/shop.glb')
