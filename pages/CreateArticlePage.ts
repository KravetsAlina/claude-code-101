import { Page, Locator, expect } from '@playwright/test';
import { ArticleList } from '../components/ArticleList';
import { ArticleData } from '../test-data/articles';
import { APP_BASE_URL } from '../test-data/env';

export class CreateArticlePage {
  readonly addNewArticleButton: Locator;
  readonly form: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly saveButton: Locator;
  readonly confirmationMessage: Locator;
  readonly articleList: ArticleList;

  constructor(private page: Page) {
    this.addNewArticleButton = page.getByRole('button', { name: 'Add new article' });
    this.form = page.getByTestId('article-form'); // TODO: confirm testid
    this.titleInput = page.getByLabel('Title'); // TODO: confirm label
    this.descriptionInput = page.getByLabel('Description'); // TODO: confirm label
    this.bodyInput = page.getByLabel('Body'); // TODO: confirm label
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.confirmationMessage = page.getByText('Article is created');
    this.articleList = new ArticleList(page.getByTestId('created-articles-list')); // TODO: confirm testid
  }

  async goto() {
    await this.page.goto(`${APP_BASE_URL}/create-article`);
  }

  async openNewArticleForm() {
    await this.addNewArticleButton.click();
  }

  async createArticle(article: ArticleData) {
    await this.titleInput.fill(article.title);
    await this.descriptionInput.fill(article.description);
    await this.bodyInput.fill(article.body);
    await this.saveButton.click();
  }

  // Expected result 1
  async expectFormDisplayed() {
    await expect(this.form).toBeVisible();
    await expect(this.titleInput).toBeVisible();
    await expect(this.descriptionInput).toBeVisible();
    await expect(this.bodyInput).toBeVisible();
  }

  // Expected result 2
  async expectArticleCreated(title: string) {
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.page).toHaveURL(/\/create-article/);
    await expect(this.articleList.itemTitle(title)).toHaveText(title);
  }
}
