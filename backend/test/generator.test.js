const Generator = require('../mock/generator');

const sampleCompany = new Generator();

test('Generate a company', () => {
  expect(sampleCompany.name).toBeTruthy();
  expect(sampleCompany.id).toBeTruthy();
  expect(sampleCompany.code).toBeTruthy();
  expect(sampleCompany.price).toBeLessThanOrEqual(99.99);
  expect(sampleCompany.price).toBeGreaterThanOrEqual(0.01);
  expect(sampleCompany.dayPrice).toBeLessThanOrEqual(99.99);
  expect(sampleCompany.dayPrice).toBeGreaterThanOrEqual(0.01);
  expect(sampleCompany.volume).toBeLessThanOrEqual(1000000);
  expect(sampleCompany.volume).toBeGreaterThanOrEqual(1000);
  expect(sampleCompany.value).toEqual(Math.round(sampleCompany.volume * sampleCompany.price));

  expect(sampleCompany.change).toBe(0);
  expect(sampleCompany.percent).toBe(0);
});

test('Next change company info', () => {
  const beforeChange = Object.assign(sampleCompany);
  sampleCompany.tick();
  expect(sampleCompany.percent).toBeLessThanOrEqual(5);
  expect(sampleCompany.percent).toBeGreaterThanOrEqual(-5);
});
