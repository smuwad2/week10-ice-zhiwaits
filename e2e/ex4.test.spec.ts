import {test, expect} from '@playwright/experimental-ct-vue';
import Ex4 from '../src/components/Ex4.vue';

test('add tasks', async ({mount}) => {
  const component = await mount(Ex4);
  await component.locator('input[type="text"]').fill('Task 1');
  await component.locator('input[type="date"]').fill('2027-12-30');
  await component.getByRole('button', {name:'Add New Task'}).click();
  await component.locator('input[type="text"]').fill('Task 2');
  await component.locator('input[type="date"]').fill('2028-11-30');
  await component.getByRole('button', {name:'Add New Task'}).click();
  const card = component.locator(`div.card:has-text("Deadline: 2027-12-30")`).first();
  await expect(card).toBeVisible();
  await expect(card.locator('p')).toHaveText('Task 1');
  const card2 = component.locator(`div.card:has-text("Deadline: 2028-11-30")`).first();
  await expect(card2).toBeVisible();
  await expect(card2.locator('p')).toHaveText('Task 2');
});

test('remove tasks', async ({mount}) => {
  const component = await mount(Ex4);
  await component.locator('input[type="text"]').fill('Task 1');
  await component.locator('input[type="date"]').fill('2027-12-30');
  await component.getByRole('button', {name:'Add New Task'}).click();
  await component.locator('input[type="text"]').fill('Task 2');
  await component.locator('input[type="date"]').fill('2028-11-30');
  await component.getByRole('button', {name:'Add New Task'}).click();
  const card = component.locator(`div.card:has-text("Deadline: 2027-12-30")`);
  await expect(card).toBeVisible();
  const card2 = component.locator(`div.card:has-text("Deadline: 2028-11-30")`);
  await expect(card2).toBeVisible();
  await component.locator('button:has-text("Done")').first().click();
  await expect(card).toBeHidden();
  await component.locator('button:has-text("Done")').first().click();
  await expect(card2).toBeHidden();
});