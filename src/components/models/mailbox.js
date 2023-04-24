import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()

export function MailboxInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/mailbox.glb')
  const instances = useMemo(
    () => ({
      PCubemidMat: nodes.pCube1_midMat_0_1,
      PCubemidMat1: nodes.pCube1_midMat_0_2,
      PCubemidMat2: nodes.pCube1_midMat_0_3,
      PCubemidMat3: nodes.pCube1_midMat_0_4,
      PCubemidMat4: nodes.pCube1_midMat_0_5,
      PCubemidMat5: nodes.pCube1_midMat_0_6,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props} castShadow receiveShadow>
      {(instances) => <context.Provider value={instances}>{children}</context.Provider>}
    </Merged>
  )
}

export function Mailbox(props) {
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <group position={[0.25, 1.98, -0.19]}>
        <instances.PCubemidMat />
        <instances.PCubemidMat1 />
        <instances.PCubemidMat2 />
        <instances.PCubemidMat3 />
        <instances.PCubemidMat4 />
        <instances.PCubemidMat5 />
      </group>
    </group>
  )
}

useGLTF.preload('/models/mailbox.glb')
