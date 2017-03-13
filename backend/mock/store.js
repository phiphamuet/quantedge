const Company = require('./generator');

const NUMBER_COMPANY = 100;
const Store = [];

for (let i = 0; i < NUMBER_COMPANY; i += 1) {
  const newCompany = new Company();
  Store.push(newCompany);
}

module.exports = Store;
