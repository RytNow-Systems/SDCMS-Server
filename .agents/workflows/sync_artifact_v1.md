---
description: Syncs an updated rule or artifact with the codebase, refactors code to match, and automatically bumps the artifact version.
---

1. Ask the user which artifact in `.agent/rules/` was recently updated.
2. Read the specified artifact to understand the new rules, schemas, or API contracts.
3. Create a safety checkpoint.

// turbo
4. Run `git add -A && git commit -m "chore: checkpoint before artifact sync"` 

// turbo
5. Run terminal commands (e.g., `grep -rn "keyword" src/`) to efficiently locate codebase files affected by the artifact update, rather than blindly reading the whole directory.

6. Refactor the necessary codebase files to perfectly match the new artifact definitions.
7. Evaluate the severity of the changes made (minor vs. major).

// turbo
8. Run `git mv` to increment the version number in the artifact's filename (e.g., `git mv .agent/rules/schema_v1.md .agent/rules/schema_v1.1.md`). 

9. Update the description frontmatter inside the artifact file to log the changes and the new version. 

10. Output a summary of the refactored files and the new artifact version.