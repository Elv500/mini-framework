import { test, expect } from '@playwright/test';

test('Get all projects', async ({ request }) => {
  const response = await request.get('project', {
    headers: {
      'Token': process.env.TOKEN!,
    },
  });

  const base = process.env.BASE_URL;
  
  console.log(await response.json());
  console.log(base);
});