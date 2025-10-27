import {test, expect} from '@playwright/experimental-ct-vue';
import axios from 'axios';
import Ex2 from '../src/components/Ex2.vue';

test('ex2 blog test', async ({mount}) => {
  const component = await mount(Ex2);
  const response = await axios.get('http://localhost:3000/posts');
  const posts = response.data;
  const postCount = posts.length;
  const numElems = await component.locator('div.card').count();
  expect(numElems).toBeGreaterThan(0);
  expect(numElems).toBe(postCount);
  // const postTitles = posts.map((post: { title: string }) => post.title);
  for (let post of posts) {
    const postTitle = post.subject;
    const postContent = post.entry;
    
    // Check if the card with the post title exists
    const card = component.locator(`div.card:has-text("${postTitle}")`).first();
    await expect(card).toBeVisible();

    // Check if the content and date are also present in the card
    await expect(card.locator('p')).toHaveText(postContent);
  }
});