// import { test } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import users from '../../data/users.json';

// const allTestUsers = [
//   ...Object.entries(users).map(([id, u]) => ({
//     id,
//     email: u.email,
//     password: u.password,
//     description: `Usuario inválido: ${id}`,
//     isValid: false
//   })),
//   {
//     id: 'valid_user',
//     email: process.env.EMAIL!,
//     password: process.env.PASSWORD!,
//     description: 'Usuario válido de .env',
//     isValid: true
//   }
// ];

// for (const userCase of allTestUsers) {
//   test(`${userCase.description} - ${userCase.id}`, async ({ page }) => {
//     const loginPage = new LoginPage(page);

//     await loginPage.gotoLogin();
//     await loginPage.fillCredentials(userCase.email, userCase.password);
//     await loginPage.submit();
//     await loginPage.validateLogin(userCase);
//   });
// }