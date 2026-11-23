# Project Conventions

## Locators
- Semantic locators: `getByRole`, `getByPlaceholder`, `getByLabel`, `getByTestId`.
- No CSS selectors or XPath — they break when markup changes.
- If a required testid doesn't exist in the component code, don't invent
  a similar one — mark it `// TODO: confirm testid` and ask.

## Project structure
tests/          — test scenario files (*.spec.ts), one test() = one scenario
pages/          — Page Object classes, one class per page
components/     — reusable UI parts (menu, header, modals)
fixtures/       — Playwright fixtures (setup and teardown)
test-data/      — test data; nothing hardcoded directly in tests/

## Page Object Model
- Each page is a separate class in pages/.
- Locators are defined in the constructor; methods are actions and
  assertions for that page.
- Reusable elements (menu, header) are extracted into components/,
  not duplicated across Page Objects.
- Single Responsibility: one file/class is responsible for one area;
  don't mix navigation and assertions for different pages in one class.

## Test data
- No hardcoded values (email, names) directly in tests/*.spec.ts.
- Data lives in test-data/, imported into the test.

## Setup and teardown
- Prefer Playwright fixtures (test.extend) over beforeEach/afterEach
  where possible: setup and teardown live in one place.
- If a fixture creates data (a user, an entity via API) — always clean
  it up after the test (code after await use()), don't leave leftovers.
- For expensive one-time setup for a whole file — beforeAll/afterAll,
  with mandatory cleanup in afterAll.

## Test independence
- Each test must pass independently of other tests and regardless of
  execution order (including parallel runs).

## Assertions
- Verify the full expected result, not just one fact (e.g., both the
  URL and element visibility).
- Use web-first assertions (await expect(locator)...), not waitForTimeout.

## Running tests
npx playwright test --project=chromium
npx playwright test --project=chromium --headed
npx playwright show-report

## Commit messages
- Format: `type(scope): short summary` (Conventional Commits), imperative mood, under 72 characters.
- Types: feat, fix, test, refactor, docs, chore.
- Scope is optional — the page, component, or area the change touches (e.g. `test(profile)`, `chore(config)`).
- One commit = one logical change. If a diff mixes unrelated concerns, split it into separate commits.
- Never commit secrets, credentials, or files outside the project folder.