import {Box, Cylinder, Gltf, PositionalAudio, useAnimations, useGLTF, useKeyboardControls} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three";
import {openWindow, routable, saveHit} from "../actions";
import {BallCollider, RigidBody, useRevoluteJoint} from "@react-three/rapier";
import * as THREE from "three";
import Controller from "ecctrl";
import {get, set} from "lockr"
import {useDispatch, useSelector} from "react-redux";
import {decrementPause, incrementPause} from "../reduser/pause";
import {incrementPauseOpen} from "../reduser/pauseOpen";
import Database from "./Database";


export default function Gear(props) {

    const [, get] = useKeyboardControls();
    const carRef = useRef();
    const sound = useRef();
    const hit = useRef();
    const {nodes, materials, animations} = useGLTF('./asset/model/wheel-tree.glb');
    const restart = useSelector((state) => state.restart.value);
    const pause = useSelector((state) => state.pause.value);
    const selectSound = useSelector((state) => state.sound.value);
    const [collidePlatform, setCollidePlatform] = useState("");

    const speed = props.speed;
    const turnSpeed = props.control;
    const dispatch = useDispatch();
    const database = new Database();


    function play(){
        sound.current?.play();
    }

    useFrame((state, delta) => {
        if (!carRef.current) {
            return
        }
        const {forward, backward, leftward, rightward} = get();
        if (forward || backward || leftward || rightward) {
            carRef.current?.wakeUp();
        } else {
            //  body.current?.sleep();
        }



        // Get the car's current velocity and rotation
        const velocity = carRef.current?.linvel();

        const rotation = carRef.current?.rotation();

        const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

        // Calculate the forward direction vector
        const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion).normalize();

        // Determine the desired movement (forward/backward)
        let forwardVelocity = 0;
        if (forward) {
            forwardVelocity = speed;
            play();
        } else if (backward) {
            forwardVelocity = -speed;
            play();
        }else {
            sound.current?.pause();
        }

        // Apply forward/backward movement


        // Apply turning (left/right)
        let angularVelocity = 0;
        if (leftward) {
            angularVelocity = turnSpeed;
        } else if (rightward) {
            angularVelocity = -turnSpeed;
        }

        // Apply angular velocity for turning
        carRef.current?.setAngvel({
            x: forwardVelocity * forwardVector.x,
            y: angularVelocity,
            z: forwardVelocity * forwardVector.z
        });



        if (velocity.y < -20) {
            dispatch(incrementPause())
            dispatch(incrementPauseOpen())
            carRef.current?.setAngvel({
                x: 0,
                y: 0,
                z: 0
            });

        }


    })

    useEffect(() => {
        openWindow(sound);
    }, []);

    useEffect(() => {
        if (pause) {
            sound.current?.pause();
        }
    }, [pause])
    return <>
        <Controller

            position={props.position}
            //  floatHeight={0.1}
            //  capsuleRadius={0.1}
            name={"player"}
            camInitDir={{x: routable(20), y: routable(90)}}
            friction={props?.friction}
            disableControl={true}
            camInitDis={-20}
            colliders={"hull"}
            ref={carRef}
            type={"dynamic"}
            mass={props.mass}
            onIntersectionExit={(e)=>{
                setCollidePlatform("");
            }}
            onIntersectionEnter={(e) => {
                switch (e.rigidBodyObject.name) {
                    case "block":
                        hit.current?.play();
                        saveHit(database,props?.level)
                        break
                    default:
                        hit.current?.pause();
                }
                setCollidePlatform(e.rigidBodyObject.name);

            }}
        >

            <group rotation={[routable(0), 0, 0]}>
                <mesh geometry={nodes.wheel.geometry}/>
            </group>


            <BallCollider args={[1, 1, 1]} sensor={true} onIntersectionEnter={(e) => {


            }}/>
        </Controller>
        <PositionalAudio
            ref={sound}
            autoplay={false}
            loop={false}
            url="./asset/sound/wheel.mp3"
            distance={selectSound}
        />
        <PositionalAudio
            ref={hit}
            autoplay={false}
            loop={false}
            url="./asset/sound/korotkiy-gluhoy-metallicheskiy-stuk.mp3"
            distance={selectSound}
        />
    </>
}