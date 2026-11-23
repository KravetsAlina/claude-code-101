---NEW---

Title
User can create a new article

Precondition
User is logged in with a test account that has the Editor role
(account created via API before the test).
User is on the Create Article page (/create-article).

Step 1
Click the "Add new article" button.

Expected result 1
A form for creating a new article is displayed, with fields for
title, description, and body.

Step 2
Fill in the title, description, and body fields with test data.
Click the "Save" button.

Expected result 2
A confirmation message "Article is created" is shown.
The newly created article appears in a list below the form, on the
same Create Article page, showing the title that was entered.

Step 3
Navigate to the Main page.

Expected result 3
The newly created article appears in the articles list on the Main
page, showing its title and description. (The full body is not
expected to be shown here — only in the article's own page.)

Postcondition
The article created during this test is deleted via API after the
test, so repeated runs don't leave test data behind.