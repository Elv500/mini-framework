import { test, expect, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Projects - CRUD', () => {  
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.fillCredentials(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.submit();
    await page.waitForURL(/.*\/projects/);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Crear un nuevo proyecto', async () => {
    await page.goto('https://app.qase.io/projects');
    await page.click('button:has-text("Create new project")');
    await page.fill('#project-name', 'Proyecto automatizado');
    await page.fill('#project-code', 'TEST');
    await page.fill('#description-area', 'Este es un proyecto de prueba con Playwright');
    await page.check('input[type="radio"][value="public"]');
    await page.click('button:has-text("Create project")');
    await expect(page.locator('text=Proyecto automatizado')).toBeVisible();

    await page.goto('https://app.qase.io/projects');
    await page.click('a:has-text("Proyecto automatizado")');
    await page.click('a:has-text("Settings")');
    await page.click('button:has-text("Delete project")');
    await page.locator('div#modals dialog button:has-text("Delete project")').click();
  });

//   test('Eliminar el proyecto creado', async () => {
//     await page.click('a:has-text("Proyecto automatizado")');
//     await page.click('a:has-text("Settings")');
//     await page.click('button:has-text("Delete project")');
//     await page.locator('div#modals dialog button:has-text("Delete project")').click();
//   });
});