export function qaseHeaders() {
  if (!process.env.TOKEN) {
    throw new Error('❌ Falta definir TOKEN en tu archivo .env');
  }

  return {
    Token: process.env.TOKEN!,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}