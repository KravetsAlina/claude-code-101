// import { test } from '../fixtures/editor.fixture';
// import { MainPage } from '../pages/MainPage';
// import { buildArticle } from '../test-data/articles';

// test('user can create a new article', async ({ page, createArticlePage, trackArticleForCleanup }) => {
//   const article = buildArticle();
//   const mainPage = new MainPage(page);
//   trackArticleForCleanup(article.title);

//   // Step 1
//   await createArticlePage.openNewArticleForm();
//   await createArticlePage.expectFormDisplayed();

//   // Step 2
//   await createArticlePage.createArticle(article);
//   await createArticlePage.expectArticleCreated(article.title);

//   // Step 3
//   await mainPage.goto();
//   await mainPage.expectArticleListed(article);
// });
