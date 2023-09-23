/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 --instanceall cinema.glb
*/

import React, { useRef, useMemo, useContext, createContext } from "react";
import { useGLTF, Merged } from "@react-three/drei";

const context = createContext();
export function CinemaInstances({ children, ...props }) {
  const { nodes } = useGLTF("/models/cinema.glb");
  const instances = useMemo(
    () => ({
      Cinemamesh: nodes.Cinema_mesh,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props} receiveShadow castShadow>
      {(instances) => (
        <context.Provider value={instances}>
          {children}
        </context.Provider>
      )}
    </Merged>
  );
}

export function Cinema(props) {
  const instances = useContext(context);
  return (
    <group {...props} dispose={null}>
      <instances.Cinemamesh />
    </group>
  );
}

useGLTF.preload("/models/cinema.glb");
