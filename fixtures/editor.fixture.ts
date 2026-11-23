/// <reference lib="dom" />  // addInitScript callback runs in the browser
import { test as base, request } from '@playwright/test';
import { AppApi } from '../api/AppApi';
import { CreateArticlePage } from '../pages/CreateArticlePage';
import { API_BASE_URL } from '../test-data/env';
import { buildEditorUser, TestUser } from '../test-data/users';

type EditorSession = TestUser & { id: string; token: string };

type Fixtures = {
  api: AppApi;
  editor: EditorSession;
  createArticlePage: CreateArticlePage;
  trackArticleForCleanup: (title: string) => void;
};

export const test = base.extend<Fixtures>({
  api: async ({}, use) => {
    const context = await request.newContext({ baseURL: API_BASE_URL });
    await use(new AppApi(context));
    await context.dispose();
  },

  // Precondition: an Editor account created via API; deleted after the test.
  editor: async ({ api }, use) => {
    const user = buildEditorUser();
    const { id } = await api.createUser(user);
    const token = await api.login(user);
    await use({ ...user, id, token });
    await api.deleteUser(id);
  },

  // Precondition: the editor is logged in and on the Create Article page.
  createArticlePage: async ({ page, editor }, use) => {
    // TODO: confirm how the app stores auth (localStorage key "authToken" assumed)
    await page.addInitScript((token) => {
      window.localStorage.setItem('authToken', token);
    }, editor.token);
    const createArticlePage = new CreateArticlePage(page);
    await createArticlePage.goto();
    await use(createArticlePage);
  },

  // Postcondition: articles created during the test are deleted via API.
  trackArticleForCleanup: async ({ api, editor }, use) => {
    const titles: string[] = [];
    await use((title) => titles.push(title));
    for (const title of titles) {
      for (const id of await api.findArticleIdsByTitle(editor.token, title)) {
        await api.deleteArticle(editor.token, id);
      }
    }
  },
});

export { expect } from '@playwright/test';
