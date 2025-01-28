import {BallCollider, RigidBody} from "@react-three/rapier";
import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFrame} from "@react-three/fiber";
import {updateGarage} from "../reduser/garage";
import Database from "../components/Database";
import {savePositions} from "../actions";


export default function Level_1(props) {

    const {nodes, materials, animations} = useGLTF(props?.url);
    const {ref, actions, names} = useAnimations(animations)
    const [actionsArray, setActionsArray] = useState([])
    const selectGarage = useSelector((state) => state.garage.value);
    const [point, setPoint] = useState("blue");
    const dispatch = useDispatch();
    const database = new Database();


    const block = useRef();
    useEffect(() => {


    }, [])

    useEffect(() => {
        console.log(nodes)
    }, [])

    const generateCityData = (rows, cols, spacing) => {
        const buildings = [];
        const startX = -((cols - 1) * spacing) / 2; // Центрирование по X
        const startZ = -((rows - 1) * spacing) / 2; // Центрирование по Z

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                buildings.push({
                    x: startX + j * spacing,
                    y: 0,
                    z: startZ + i * spacing,
                });
            }
        }

        return buildings;
    };

// Пример: 5 рядов и 5 колонн зданий с расстоянием 500 между ми
    const cityData = generateCityData(5, 1, 150);


    useFrame((state, delta, frame) => {
        block.current?.setAngvel({
            x: 0,
            y: 1,
            z: 0
        })
    })

    const savePoint = [nodes.save_0, nodes.save_1, nodes.save_2]


    return <>
        <group ref={ref} position={props.position} scale={0.5}>
            <RigidBody  name={"platform"} colliders="trimesh" type="fixed">
                <group>
                    <primitive name={"platform"} object={nodes.platform}/>
                    <primitive object={nodes.point}/>
                </group>
            </RigidBody>

            {savePoint.map((el, i) => <RigidBody
                key={i + "_save"}
                sensor={true}
                type={"fixed"}
                name={"save"}
                onIntersectionExit={(e) => {
                    // e.target.rigidBodyObject.children[0]?.material?.color.set('blue');
                }}
                onIntersectionEnter={(e) => {

                    if(e.rigidBodyObject.name === "player"){
                        dispatch(updateGarage(savePositions(e,database,props?.level)));
                    }

                }}>
                <primitive object={el}/>
            </RigidBody>)}
            <RigidBody name={"block"} colliders={"cuboid"}>
                <primitive object={nodes.block}/>
            </RigidBody>
            <RigidBody name={"block"} colliders={"cuboid"}>
                <primitive object={nodes.block1}/>
            </RigidBody>
            <RigidBody name={"block"} colliders={"cuboid"}>
                <primitive object={nodes.block2}/>
            </RigidBody>
            <RigidBody name={"block"} colliders={"cuboid"}>
                <primitive object={nodes.block3}/>
            </RigidBody>
            <RigidBody name={"block"} colliders={"cuboid"}>
                <primitive object={nodes.block4}/>
            </RigidBody>
            <RigidBody name={"block"} colliders={"ball"}>
                <primitive object={nodes.block5}/>
            </RigidBody>


        </group>

    </>

}
