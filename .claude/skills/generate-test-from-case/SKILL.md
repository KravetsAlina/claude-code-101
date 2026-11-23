---
name: generate-test-from-case
description: Use when the user gives a manual test case (precondition, steps, expected results) in plain language and wants it turned into an automated Playwright test following this project's conventions in CLAUDE.md.
---

# Generate a Playwright test from a test case


## Steps

1. If no test case is given directly in the conversation, look in
   test-cases/ for entries marked ---NEW---. Each such entry is one
   unit of work — process one at a time.
2. Read CLAUDE.md before writing any code.
3. Split the test case into Title, Precondition, Steps, and Expected
   results (steps and expected results may be paired one-to-one, e.g.
   "Step 1" / "Expected result 1").
4. If the precondition is missing data, or any step/expected result
   is ambiguous (e.g., unclear which page or which fields are meant)
   — ask the user instead of guessing.
5. Map the test case structure onto code:
   - Precondition → a fixture (setup + teardown) or beforeEach.
   - Each step → a call to the matching Page Object method.
   - Each expected-result bullet → a separate expect(), one-to-one —
     don't merge or skip any.
6. Before creating a new Page Object or locator — check pages/ and
   components/ for an existing one. Don't duplicate.
7. If a required locator isn't in the project's existing code — don't
   invent a plausible-looking one. Add an explicit placeholder
   // TODO: confirm testid and flag it in the summary.
8. Test data — including content the test itself creates, like an
   article's title or body — comes from test-data/, reused both when
   performing the action and when asserting the result. Don't inline it.
9. If the test creates data in the system (a new article, a new user,
   etc.) — the fixture must clean it up afterwards, so the test stays
   independent and repeatable (see CLAUDE.md "Setup and teardown").
10. Once the automated test is written and passing, go back to the
    test case in test-cases/ and remove the ---NEW--- marker. Leave
    the rest of the test case text in place as a record of what the
    test covers.


## Example

Input (test case):
Precondition: The user is logged in with a test account (email:
test.user@example.com, created via API before the test). The user is
on the home page.
Step 1: Click the menu button. In the menu, select Profile and click it.
Expected result:
- The user is redirected to the Profile page
- The avatar is displayed
- The email matches the one the user was created with
- The "Top up balance" button is visible and enabled

Output:

test-data/users.ts:
export const testUsers = {
  standard: { email: 'test.user@example.com' },
};

pages/ProfilePage.ts:
import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly avatar: Locator;
  readonly email: Locator;
  readonly topUpButton: Locator;

  constructor(private page: Page) {
    this.avatar = page.getByTestId('user-avatar'); // TODO: confirm testid
    this.email = page.getByTestId('user-email'); // TODO: confirm testid
    this.topUpButton = page.getByRole('button', { name: 'Top up balance' });
  }

  async expectLoaded(expectedEmail: string) {
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.avatar).toBeVisible();
    await expect(this.email).toHaveText(expectedEmail);
    await expect(this.topUpButton).toBeEnabled();
  }
}

tests/profile.spec.ts:
import { test } from '../fixtures/auth.fixture';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { testUsers } from '../test-data/users';

test('navigating to profile via menu shows correct user data', async ({ page }) => {
  const home = new HomePage(page);
  const profile = new ProfilePage(page);

  await home.goToProfile();
  await profile.expectLoaded(testUsers.standard.email);
});