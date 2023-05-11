import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function Building2Instances({ children, ...props }) {
  const { nodes } = useGLTF('/models/building2.glb')
  const instances = useMemo(
    () => ({
      ObjectDefault: nodes['Object014_15_-_Default6_0'],
      ObjectDefault1: nodes['Object015_17_-_Default_0'],
      ObjectDefaultghj: nodes['Object016_16_-_Defaultghj_0'],
      ObjectDefault2: nodes['Object017_17_-_Default_0'],
      ObjectDefault3: nodes['Object018_06_-_Default_0'],
      Object: nodes.Object019_04_0,
      ObjectDefault4: nodes['Object020_15_-_Default_0'],
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Building2(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.59}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-1.49, 55.77, 60.12]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63}>
            <instances.ObjectDefault1 position={[77, 0.43, -88.68]} />
          </group>
          <instances.ObjectDefault position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
          <instances.ObjectDefaultghj position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
          <instances.ObjectDefault2 position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
          <instances.ObjectDefault3 position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
          <instances.Object position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
          <instances.ObjectDefault4 position={[-1.76, 0, 11.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.63} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/building2.glb')
