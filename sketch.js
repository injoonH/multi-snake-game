let snakes = [];
let apple;
let pxl = 26;
let wdth = 50;
let hght = 30;

function get_new_apple(snakes, wdth, hght) {
    let new_x, new_y;
    let flag = true;
    while (flag) {
        flag = false;
        new_x = Math.floor(Math.random() * wdth);
        new_y = Math.floor(Math.random() * hght);
        for (let s of snakes) {
            for (let b of s.body) {
                if (b.x == new_x && b.y == new_y) {
                    flag = true;
                    break;
                }
            }
            if (flag) break;
        }
    }
    return { x: new_x, y: new_y };
}

function show_apple(apple) {
    fill(255, 0, 0);
    noStroke();
    rect(apple.x * pxl, apple.y * pxl, pxl, pxl);
}

function setup() {
    createCanvas(wdth * pxl, hght * pxl);
    frameRate(13);
    textAlign(CENTER, CENTER);
    textSize(50);
    snakes.push(
        new Snake(
            { x: 0, y: 0 }, //
            { x: 1, y: 0 },
            [255, 100, 255],
            pxl,
            ["w", "d", "s", "a"]
        )
    );
    snakes.push(
        new Snake(
            { x: wdth - 1, y: hght - 1 },
            { x: -1, y: 0 },
            [100, 255, 255],
            pxl,
            ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]
        )
    );
    apple = get_new_apple(snakes, wdth, hght);
}

function draw() {
    background(0);

    snakes
        .filter((snake) => snake.will_go_out(wdth, hght))
        .forEach((snake) => snake.reset());

    snakes.forEach((snake) => snake.move(apple));

    for (let s1 of snakes) {
        for (let s2 of snakes) {
            if (Snake.touched_body(s1, s2, s1 === s2)) {
                s1.is_dead = true;
                break;
            }
        }
    }

    snakes //
        .filter((snake) => snake.is_dead)
        .forEach((snake) => snake.reset());

    for (let s of snakes) {
        if (s.ate_apple(apple)) {
            apple = get_new_apple(snakes, wdth, hght);
            break;
        }
    }

    fill(snakes[0].color);
    text(snakes[0].body.length, 0, 0, width / 2, height);
    fill(snakes[1].color);
    text(snakes[1].body.length, width / 2, 0, width / 2, height);

    show_apple(apple);
    snakes.forEach((snake) => snake.show());
}

function keyPressed() {
    for (let s of snakes) {
        if (!s.dir_changed) {
            if (key == s.keys[0] && s.dir.y != 1) {
                s.dir = { x: 0, y: -1 };
                s.dir_changed = true;
            } else if (key == s.keys[2] && s.dir.y != -1) {
                s.dir = { x: 0, y: 1 };
                s.dir_changed = true;
            } else if (key == s.keys[3] && s.dir.x != 1) {
                s.dir = { x: -1, y: 0 };
                s.dir_changed = true;
            } else if (key == s.keys[1] && s.dir.x != -1) {
                s.dir = { x: 1, y: 0 };
                s.dir_changed = true;
            }
        }
    }
}
