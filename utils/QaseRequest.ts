import { request, APIRequestContext } from '@playwright/test';
import { qaseHeaders } from './QaseHeaders';

export class QaseRequest {
  private static api: APIRequestContext;

  private static async getApi(): Promise<APIRequestContext> {
    if (!QaseRequest.api) {
      const baseURL = process.env.API_URL;
      if (!baseURL) {
        throw new Error('Falta definir API_URL en tu archivo .env');
      }

      QaseRequest.api = await request.newContext({ baseURL });
    }
    return QaseRequest.api;
  }

  static async get(endpoint: string) {
    const api = await QaseRequest.getApi();
    return api.get(endpoint, { headers: qaseHeaders() });
  }

  static async post(endpoint: string, data?: any) {
    const api = await QaseRequest.getApi();
    return api.post(endpoint, { headers: qaseHeaders(), data });
  }

  static async getCode(endpoint: string, code: string) {
    const api = await QaseRequest.getApi();
    return api.get(`${endpoint}/${code}`, { headers: qaseHeaders() });
  }

  static async put(endpoint: string, data?: any) {
    const api = await QaseRequest.getApi();
    return api.put(endpoint, { headers: qaseHeaders(), data });
  }

  static async delete(endpoint: string, code?: string) {
    const api = await QaseRequest.getApi();
    return api.delete(`${endpoint}/${code}`, { headers: qaseHeaders() });
  }
}