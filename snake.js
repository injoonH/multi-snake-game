class Snake {
    constructor(reset_pos, reset_dir, color, pxl, keys) {
        this.reset_pos = reset_pos;
        this.reset_dir = reset_dir;
        this.color = color;
        this.pxl = pxl;
        this.keys = keys;
        this.reset();
    }

    reset() {
        this.pos = this.reset_pos;
        this.dir = this.reset_dir;
        this.body = [this.reset_pos];
        this.is_dead = false;
        this.dir_changed = false;
    }

    ate_apple(apple_pos) {
        return this.pos.x == apple_pos.x && this.pos.y == apple_pos.y;
    }

    move(apple_pos) {
        const new_pos = {
            x: this.pos.x + this.dir.x,
            y: this.pos.y + this.dir.y,
        };
        if (new_pos.x == apple_pos.x && new_pos.y == apple_pos.y) {
            this.body.push(new_pos);
        } else {
            for (let i = 0; i < this.body.length - 1; i++)
                this.body[i] = this.body[i + 1];
            this.body[this.body.length - 1] = new_pos;
        }
        this.pos = new_pos;
        this.dir_changed = false;
    }

    // did snake1's head meet snake2's body?
    static touched_body(snake1, snake2, is_myself) {
        const head = snake1.body[snake1.body.length - 1];
        if (is_myself) {
            for (let i = 0; i < snake1.body.length - 1; i++)
                if (head.x == snake1.body[i].x && head.y == snake1.body[i].y)
                    return true;
        } else {
            for (let bd of snake2.body)
                if (head.x == bd.x && head.y == bd.y) return true;
        }
        return false;
    }

    will_go_out(wth, hgt) {
        const new_pos = {
            x: this.pos.x + this.dir.x,
            y: this.pos.y + this.dir.y,
        };
        return (
            new_pos.x < 0 ||
            new_pos.x >= wth ||
            new_pos.y < 0 ||
            new_pos.y >= hgt
        );
    }

    show() {
        fill(this.color);
        noStroke();
        this.body.forEach((b) =>
            rect(b.x * this.pxl, b.y * this.pxl, this.pxl, this.pxl)
        );
    }
}
