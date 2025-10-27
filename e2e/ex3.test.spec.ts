import {test, expect} from '@playwright/experimental-ct-vue';
import axios from 'axios';
import Ex3 from '../src/components/Ex3.vue';

test('Ex3 delete first blog post test', async ({mount}) => {
    await axios.get('http://localhost:3000/addPost', {
                        params: {
                            subject: "Testing Post Deletion",
                            entry: "This is a test post to check if deletion works.",
                            mood: "Angry"
                        }
                    })
    const component = await mount(Ex3);
    const response = await axios.get('http://localhost:3000/posts');
    const posts = response.data;
    const postCount = posts.length;
    const numElems = await component.locator('div.card').count();
    expect(numElems).toBeGreaterThan(0);
    expect(numElems).toBe(postCount);
    await component.locator('button:has-text("Delete")').first().click();
    const newResponse = await axios.get('http://localhost:3000/posts');
    const newPosts = newResponse.data;
    const newPostCount = newPosts.length;
    const numElemsAfterDel = await component.locator('div.card').count();
    expect(numElemsAfterDel).toBe(newPostCount);
    expect(numElemsAfterDel).toBe(numElems-1);
    for (let post of newPosts) {
        const postTitle = post.subject;
        const postContent = post.entry;
        
        // Check if the card with the post title exists
        const card = component.locator(`div.card:has-text("${postTitle}")`).first();
        await expect(card).toBeVisible();

        // Check if the content and date are also present in the card
        await expect(card.locator('p')).toHaveText(postContent);
    }
});