const velocity = 0.015;

class Logo {
    constructor(logoEl) {
        this.logoEl = logoEl;
        this.reset();
        this.colorList = ['red', 'blue', 'green', 'teal', 'yellow', 'violet', 'orange'];
    };

    // get x value from stylesheet
    get x() {
        return parseFloat(getComputedStyle(this.logoEl).getPropertyValue('--x'));
    };

    // set x value on stylesheet
    set x(value) {
        this.logoEl.style.setProperty('--x', value);
    };

    // get y value from stylesheet
    get y() {
        return parseFloat(getComputedStyle(this.logoEl).getPropertyValue('--y'));
    };

    // set y value on stylesheet
    set y(value) {
        this.logoEl.style.setProperty('--y', value);
    };

    changeColor() {
        const index = Math.floor(Math.random() * this.colorList.length - 1);
        document.documentElement.style.setProperty('--color', this.colorList[index]);
    };

    rect() {
        return this.logoEl.getBoundingClientRect();
    };

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = Math.random() * (2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        };
        this.velocity = velocity;
    };

    // move the logo
    update(delta) {
        // console.log(delta);
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.x *= -1;
            this.changeColor();
        };

        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.y *= -1;
            this.changeColor();
        };
    };
}

const logo = new Logo(document.querySelector('.dvd-logo'));

let prevTime;
const update = time => {
    if (prevTime != null) {
        // set up delta as the difference in time since the last update was called
        const delta = time - prevTime;
        logo.update(delta);
    };

    prevTime = time;
    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
