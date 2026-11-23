import { APIRequestContext, expect } from '@playwright/test';
import { TestUser } from '../test-data/users';

// All endpoints, payloads and response shapes below are assumptions.
export class AppApi {
  constructor(private request: APIRequestContext) {}

  // TODO: confirm endpoint, payload and whether an admin token is required
  async createUser(user: TestUser): Promise<{ id: string }> {
    const res = await this.request.post('/api/users', {
      data: { email: user.email, password: user.password, role: user.role },
    });
    expect(res.ok(), `create user failed: ${res.status()}`).toBeTruthy();
    return res.json();
  }

  // TODO: confirm endpoint
  async deleteUser(userId: string): Promise<void> {
    const res = await this.request.delete(`/api/users/${userId}`);
    expect(res.ok(), `delete user failed: ${res.status()}`).toBeTruthy();
  }

  // TODO: confirm endpoint and response shape ({ token })
  async login(user: TestUser): Promise<string> {
    const res = await this.request.post('/api/auth/login', {
      data: { email: user.email, password: user.password },
    });
    expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy();
    const { token } = await res.json();
    return token;
  }

  // TODO: confirm endpoint, query param and response shape ([{ id, title }])
  async findArticleIdsByTitle(token: string, title: string): Promise<string[]> {
    const res = await this.request.get('/api/articles', {
      params: { title },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.ok(), `find articles failed: ${res.status()}`).toBeTruthy();
    const articles: { id: string; title: string }[] = await res.json();
    return articles.filter((a) => a.title === title).map((a) => a.id);
  }

  // TODO: confirm endpoint
  async deleteArticle(token: string, articleId: string): Promise<void> {
    const res = await this.request.delete(`/api/articles/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.ok(), `delete article failed: ${res.status()}`).toBeTruthy();
  }
}
