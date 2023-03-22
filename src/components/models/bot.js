import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Bot = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/bot.gltf');
  const { actions, mixer } = useAnimations(animations, group);
  const { isJumping } = props;

  useEffect(() => {
    const currentAction = isJumping ? 'Jump' : 'Running';
    for (const action in actions) {
      actions[action].stop();
    };
    actions[currentAction].play();
    mixer.timeScale = isJumping ? 1 : 1.4;
  }, [actions, mixer, isJumping]);

  return ( <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.02}>
          <group name="fbx_mergefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Beta_Joints" />
                  <group name="Beta_Surface" />
                  <skinnedMesh castShadow receiveShadow name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Beta_Joints_MAT} skeleton={nodes.Object_6.skeleton} />
                  <skinnedMesh castShadow receiveShadow name="Object_7" geometry={nodes.Object_7.geometry} material={materials.asdf1Beta_HighLimbsGeoSG2} skeleton={nodes.Object_7.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/bot.gltf');

export default Bot;
