import { Page, expect } from '@playwright/test';
import { ArticleList } from '../components/ArticleList';
import { ArticleData } from '../test-data/articles';
import { APP_BASE_URL } from '../test-data/env';

export class MainPage {
  readonly articleList: ArticleList;

  constructor(private page: Page) {
    this.articleList = new ArticleList(page.getByTestId('main-articles-list')); // TODO: confirm testid
  }

  // TODO: confirm Main page URL ("/" assumed)
  async goto() {
    await this.page.goto(`${APP_BASE_URL}/`);
  }

  // Expected result 3
  async expectArticleListed(article: ArticleData) {
    await expect(this.page).toHaveURL(`${APP_BASE_URL}/`);
    await expect(this.articleList.itemTitle(article.title)).toHaveText(article.title);
    await expect(this.articleList.itemDescription(article.title)).toHaveText(article.description);
  }
}
