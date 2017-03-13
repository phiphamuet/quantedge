const uuid = require('uuid');
const faker = require('faker/locale/en_AU');

const MAX_VOLUME_CHANGE = 30;
const MIN_VOLUME_CHANGE = 10;
const MAX_PRICE_CHANGE = 0.05;
const MIN_PRICE_CHANGE = -0.05;
const CODE_ARRAY = [];
const ARRAY_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GENERATE_CODE = () => {
  let sample = '';
  for (let i = 0; i < 3; i += 1) {
    sample += ARRAY_CHARACTER.charAt(Math.round(Math.random() * (26 - 0)));
  }
  if (~CODE_ARRAY.indexOf(sample)) {
    return GENERATE_CODE();
  }
  CODE_ARRAY.push(sample);
  return sample;
};

const randomMinMax = (min, max) =>
  (Math.random() * (max - min)) + min;

module.exports = class Company {
  constructor() {
    this.id = uuid.v4();
    this.name = faker.company.companyName();
    this.code = `${GENERATE_CODE()}.AX`;
    this.price = parseFloat(randomMinMax(0.01, 99.99).toFixed(2));
    this.volume = Math.round(randomMinMax(1000, 1000000));
    this.value = Math.round(this.price * this.volume);
    this.dayPrice = this.price;
    this.change = 0;
    this.percent = 0;
  }

  tick() {
    const incrementVolume = Math.round(randomMinMax(MIN_VOLUME_CHANGE, MAX_VOLUME_CHANGE));
    const percent = randomMinMax(MIN_PRICE_CHANGE, MAX_PRICE_CHANGE);
    this.price = parseFloat((this.price * (1 + percent)).toFixed(2));
    this.change = parseFloat((this.price - this.dayPrice).toFixed(2));
    this.percent = Math.round((this.change / this.dayPrice) * 100);
    this.volume = Math.round(this.volume + incrementVolume);
    this.value = Math.round(this.price * this.volume);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      price: this.price,
      value: this.value,
      dayPrice: this.dayPrice,
      change: this.change,
      percent: this.percent,
    };
  }
};
