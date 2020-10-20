import Mars from 'entities/Mars';
import { getMarsInstance, registerMarsInstance } from 'store/MarsStore';

it('registers instances', () => {
  const mars1 = new Mars(10, 10);
  const mars2 = new Mars(1, 1);

  registerMarsInstance(mars1);
  registerMarsInstance(mars2);

  expect(getMarsInstance(mars1.id)).toBe(mars1);
  expect(getMarsInstance(mars2.id)).toBe(mars2);
});
