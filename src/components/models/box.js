import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function ElectricBoxInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/box.glb')
  const instances = useMemo(
    () => ({
      PlaneMaterial: nodes.Plane_Material_0,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function ElectricBox(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.11}>
        <group scale={100}>
          <instances.PlaneMaterial position={[0, 0, 0.17]} scale={0.84} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/box.glb')
