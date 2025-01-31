import db from "../assets/db.json"
export default class Database {
    db = {
        music: 50,
        effect: 20,
        player: [{}],
        level: [{}]
    }


    constructor() {
        if (!JSON.parse(window.localStorage.getItem("wheel_db"))) {
            this.set(db);
        }
        this.db = JSON.parse(window.localStorage.getItem("wheel_db"));


    }

    set(obj) {
        window.localStorage.setItem("wheel_db", JSON.stringify(obj));
    }

    getMusic() {
        return this.db.music;
    }

    setMusic(value) {
        this.db.music = value;
        this.set(this.db);
    }

    getEffect() {
        return this.db.effect;
    }

    setEffect(value) {
        this.db.effect = value;
        this.set(this.db);
    }

    getPlayer() {
        return this.db.player;
    }

    getLevel() {
        return this.db.level;
    }

    getLevelOne(level = 1) {
        return this.db.level.filter((el)=>el.level === level)[0];
    }

    setLevel(el) {
        this.db.level = el;
        this.set(this.db);
    }

    setPlayer(el) {
        this.db.player = el;
        this.set(this.db);
    }


}










