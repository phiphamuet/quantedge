const faker = require('faker/locale/en_AU');
const crypto = require('crypto');
const MAX_VOLUME_CHANGE = 30;
const MIN_VOLUME_CHANGE = 10;
const MAX_PRICE_CHANGE = 0.05;
const MIN_PRICE_CHANGE = - 0.05;
const CODE_ARRAY = [];
const ARRAY_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GENERATE_CODE = () => {
    let sample = '';
    for (let i = 0; i < 3; i = i + 1) {
        sample += ARRAY_CHARACTER.charAt(Math.round(Math.random() * (26 - 0)));
    }
    if (~CODE_ARRAY.indexOf(sample)) {
        return GENERATE_CODE();
    }
    CODE_ARRAY.push(sample);
    return sample;
}

module.exports = class Company {
    constructor() {
        this.name = faker.company.companyName();
        this.code = `${GENERATE_CODE()}.AX`;
        this.price = (Math.random() * ( 99.99 - 0.01 ) + 0.01).toFixed(2);
        this.volume = Math.round((Math.random() * (1000000 - 1000) + 1000));
        this.value = Math.round(this.price * this.volume);
        this.dayPrice = this.price;
        this.change = 0;
        this.percent = 0;
    }

    tick () {
        this.incrementVolume = Math.round(
            Math.random() * (MAX_VOLUME_CHANGE - MIN_VOLUME_CHANGE) + MIN_VOLUME_CHANGE);
        this.percent = Math.random() * (MAX_PRICE_CHANGE - MIN_PRICE_CHANGE) + MIN_PRICE_CHANGE;
        this.price = (this.price * (1 + this.percent)).toFixed(2);
        this.change = (this.price - this.dayPrice).toFixed(2);
        this.percent = Math.round((this.change / this.dayPrice) * 100);
        this.volume = Math.round(this.volume + this.incrementVolume);
        this.value = Math.round(this.price * this.volume);
    }

    toJSON () {
        return {
            name: this.name,
            code: this.code,
            price: this.price,
            value: this.value,
            dayPrice: this.dayPrice,
            change: this.change,
            percent: this.percent
        }
    }
}