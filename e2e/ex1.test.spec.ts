import {test, expect} from '@playwright/experimental-ct-vue';
import Ex1 from '../src/components/Ex1.vue';
test('example test', async ({mount}) => {
  const component = await mount(Ex1);
  await component.getByRole('spinbutton').fill('0');
  expect(await component.locator('span').textContent()).toBe('🔇');
  await component.getByRole('spinbutton').fill('2');
  expect(await component.locator('span').textContent()).toBe('🔉');
});
