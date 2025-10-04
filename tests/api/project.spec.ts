import { test, expect } from '@playwright/test';
import { QaseRequest } from '../../utils/QaseRequest';

let projectCode: string;

test.describe('Qase API - Projects CRUD', () => {

  test('Listar proyectos', async () => {
    const response = await QaseRequest.get('project');
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Crear proyecto', async () => {
    projectCode = 'AUTO' + Date.now().toString().slice(-4);

    const body = {
      title: 'Proyecto API Playwright',
      code: projectCode,
      description: 'Proyecto creado desde tests automatizados',
      access: 'all',
    };

    const response = await QaseRequest.post('project', body);
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Obtener proyecto creado', async () => {
    const response = await QaseRequest.getCode('project', projectCode);
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Eliminar proyecto creado', async () => {
    const response = await QaseRequest.delete('project', projectCode);
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
});