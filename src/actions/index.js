export function routable(n) {
    return Math.PI / 180 * n;
}

export function createArray(num) {
    let a = [];
    for (let i = 0; i < num; i++) {
        a[i] = ""
    }
    return a;
}

export function openWindow(sound) {
    const handleVisibilityChange = () => {
        if (document.hidden) {
            sound.current?.pause(); // Остановить звук, если вкладка невидима
        } else {
            sound.current?.play(); // Воспроизвести звук, если вкладка активна
        }
    };

    // Слушаем изменения видимости страницы
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

}

export function savePositions(e, database, level = 1) {
    const o = database.getPlayer().map(obj =>
        obj.id === level ? {
            ...obj,
            position: e === undefined ? [0, 3, 0] : [e.rigidBodyObject.position.x, e.rigidBodyObject.position.y, e.rigidBodyObject.position.z]
        } : obj
    );
    database.setPlayer(o);
    return o;
}

export function saveHit(database, level = 1,count = 0) {
    const o = database.getLevel().map(obj => obj.level === level ? {
            ...obj,
            hit:count
        } : obj
    );
    database.setLevel(o)
    return o;
}