console.log('Script connected.');

class Logo {
    constructor(logoEl) {
        this.logoEl = logoEl;
    };

    testMethod() {
        console.log('testing...');
        console.log(this.logoEl);
    };
}

const logo = new Logo(document.querySelector('.dvd-logo'));

logo.testMethod();