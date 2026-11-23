import { Locator } from '@playwright/test';

// Reusable article list: used under the form on the Create Article page
// and on the Main page. The root locator is passed in by the page.
export class ArticleList {
  constructor(readonly root: Locator) {}

  item(title: string): Locator {
    return this.root.getByTestId('article-item').filter({ hasText: title }); // TODO: confirm testid
  }

  itemTitle(title: string): Locator {
    return this.item(title).getByTestId('article-title'); // TODO: confirm testid
  }

  itemDescription(title: string): Locator {
    return this.item(title).getByTestId('article-description'); // TODO: confirm testid
  }
}
