import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin() {
    await this.page.goto(process.env.UI_URL!);
  }

  async fillCredentials(email: string, password: string) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }

  async validateLogin(user: { isValid: boolean; email: string }) {
    if (user.isValid) {
      await expect(this.page).toHaveURL(/.*\/projects/, { timeout: 5000 });
    } else {
      const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);

      if (isEmailFormat) {
        await expect(this.page).toHaveURL('https://app.qase.io/login', { timeout: 5000 });
      }
    }
  }
}