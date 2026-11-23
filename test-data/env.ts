// The articles app is a separate app from saucedemo (the baseURL in
// playwright.config.ts), so its URLs are defined here and used as absolute URLs.
// TODO: confirm base URL of the articles app
export const APP_BASE_URL = process.env.ARTICLES_APP_URL ?? 'https://articles-app.example.com';
// TODO: confirm base URL of the articles API
export const API_BASE_URL = process.env.ARTICLES_API_URL ?? 'https://articles-app.example.com';
