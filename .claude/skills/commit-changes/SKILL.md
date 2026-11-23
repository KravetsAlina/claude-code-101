---
name: commit-changes
description: Use when the user asks to commit changes, stage changes, write a commit message, or says something like "commit this" or "collect what needs to be pushed".
---

# Commit changes

## Steps

1. Run `git status` and `git diff` (staged and unstaged) to see what actually changed.
2. If any untracked or changed path looks unrelated to the project, or outside
   the repository folder (e.g. config files, credentials, .env, anything under
   a home directory) — stop and ask before adding it. Never run `git add .`
   or `git add -A` blindly; stage specific files.
3. If the diff contains more than one unrelated concern (e.g. a new test plus
   an unrelated edit to CLAUDE.md), ask whether to split it into separate
   commits instead of combining them.
4. Classify the change and draft a commit message following the "Commit
   messages" convention in CLAUDE.md. If the type isn't obvious from the
   files touched, ask instead of guessing.
5. Show the user the exact files to be staged and the proposed commit
   message, and wait for confirmation before running `git add` and
   `git commit`.
6. Never run `git push`. Pushing is a separate action the user asks for
   explicitly, after reviewing the commit.