export interface ArticleData {
  title: string;
  description: string;
  body: string;
}

// Unique title per call: the title is used to find the article in lists
// and to clean it up via API, so it must not collide between parallel runs.
export function buildArticle(): ArticleData {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  return {
    title: `Autotest article ${suffix}`,
    description: 'Short description of the autotest article',
    body: 'Full body of the autotest article. It is shown only on the article page.',
  };
}
