const velocity = 0.025;

class Logo {
    constructor(logoEl) {
        this.logoEl = logoEl;
        this.reset();
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

    rect() {
        return this.logoEl.getBoundingClientRect();
    };

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = Math.random() * (2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        };
        this.velocity = velocity;
    };

    // move the logo
    update(delta) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
    };
}

const logo = new Logo(document.querySelector('.dvd-logo'));

let prevTime;
const update = time => {
    if (prevTime !== null) {
        // set up delta as the difference in time since the last update was called
        const delta = time - prevTime;
        logo.update(delta);
    };

    prevTime = time;
    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);
