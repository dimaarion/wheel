import {Canvas, useLoader, useThree} from "@react-three/fiber"
import {
    Sky,
    PointerLockControls,
    KeyboardControls,
    Environment,
    Cloud,
    Clouds,
    useGLTF, OrbitControls, PositionalAudio, CameraControls, Gltf, PerspectiveCamera, OrthographicCamera,
} from "@react-three/drei"

import * as THREE from "three";
import Platform from "./components/Platform";
import {useDispatch, useSelector} from "react-redux";
import Pause from "./components/Pause";
import StartGame from "./components/StartGame";
import TopPanel from "./components/TopPanel";
import Settings from "./components/Settings";
import {useEffect, useRef, useState} from "react";
import Garage from "./components/Garage";
import garage from "./assets/garage.json"
import level from "./assets/level.json"
import {Physics} from '@react-three/rapier'
import Wheel from "./components/Wheel";
import {get, set, setPrefix} from "lockr";
import {updateGarage} from "./reduser/garage";
import db from "./assets/db.json";
import Database from "./components/Database";
import {openWindow,savePositions} from "./actions";


export default function App() {
    const database = new Database();
    const restart = useSelector((state) => state.restart.value);
    const settings = useSelector((state) => state.settings.value);
    const pause = useSelector((state) => state.pause.value);
    const music = useSelector((state) => state.music.value);
    const garageOpen = useSelector((state) => state.garageOpen.value);
    const pauseOpen = useSelector((state) => state.pauseOpen.value);
    const selectGarages = useSelector((state) => state.garage.value);

    const sound = useRef();
    const dispatch = useDispatch();


    const Background = () => {
        const {scene} = useThree();

        useEffect(() => {
            const loader = new THREE.TextureLoader();
            loader.load('./asset/texture/city.png', (texture) => {
                scene.background = texture; // Устанавливаем текстуру фоном
            });
        }, [scene]);

        return null;
    };

    const keyboardMap = [
        {name: "forward", keys: ["ArrowUp", "w", "W"]},
        {name: "backward", keys: ["ArrowDown", "s", "S"]},
        {name: "leftward", keys: ["ArrowLeft", "a", "A"]},
        {name: "rightward", keys: ["ArrowRight", "d", "D"]},
        {name: "jump", keys: ["Space"]},
        {name: "action4", keys: ["KeyF"]},
    ];

    const keyboardMap2 = [
        {name: 'forward', keys: ['ArrowUp', 'KeyW']},
        {name: 'backward', keys: ['ArrowDown', 'KeyS']},
        {name: 'left', keys: ['ArrowLeft', 'KeyA']},
        {name: 'right', keys: ['ArrowRight', 'KeyD']},
        {name: 'run', keys: ['Shift']},
        {name: 'brake', keys: ['Space']},
        {name: 'gearUp', keys: ['Period']},
        {name: 'gearDown', keys: ['Comma']},
    ];

    useEffect(() => {
        openWindow(sound);
    }, []);

    useEffect(() => {
        if (pause) {
            sound.current?.pause();
        } else {
            sound.current?.play();
        }
    }, [pause])



    useEffect(()=>{
     //  dispatch(updateGarage(savePositions(undefined,database,1)));

    },[pause])



    return (
        <>

            <TopPanel/>
            {
                pauseOpen ? <Pause/> : ""
            }
            {settings ? <Settings/> : ""}
            {garageOpen ? <Garage/> : ""}

            <StartGame>
                <Canvas shadows camera={{fov: 45}}>
                    <KeyboardControls map={keyboardMap}>
                        <Physics debug={false} gravity={[0, -20, 0]} paused={pause}>
                            {database.getLevel().filter((el) => el.level === 1).map((el) => <Platform
                                key={el.level + "platform"}
                                level={el.level}
                                url={el.model}
                                position={el.position}
                                actionsArray={el.animations}/>)}
                            {selectGarages.filter((el) => el.id === 1 && !restart).map((el) => <Wheel
                                level={1}
                                url={el.model}
                                position={el.position}
                                key={el.id}
                                friction={el.friction}
                                mass={el.mass}
                                control={el.control}
                                speed={el.speed}/>)}
                        </Physics>

                        <PositionalAudio
                            ref={sound}
                            hasPlaybackControl={true}
                            autoplay={true}
                            loop={false}
                            url="./asset/sound/y2mate.com - Dmitriy Lukyanov_Underwater.mp3"
                            distance={database.getMusic()}
                        />
                    </KeyboardControls>

                </Canvas>
            </StartGame>

        </>
    )
}
useGLTF.preload([

    './asset/model/well.glb',
    './asset/model/wheel.glb',
    './asset/model/wheel_1.glb',
    './asset/model/hest.glb',
]);