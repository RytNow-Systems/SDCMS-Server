---
description: Retrofits the existing backend codebase to comply with the latest AGENTS.md rules (Zod validation, text-based Bruno tests, and parcel_id transition)
---

// turbo
1. Verify that a `.antigravityignore` file exists in the project root containing `node_modules/`. If missing, create it first. 


2. Create a safety checkpoint. 

// turbo
3. Run `git add -A && git commit -m "chore: checkpoint before backend retrofit"`

// turbo
4. Use `grep` in the terminal to identify all Express route files in `src/` that lack Zod validation imports. 

// parallel
5. Create and integrate strict Zod validation schemas for all identified routes. 

// turbo
6. Use `find . -name "*.bru"` in the terminal to locate all native Bruno files. 

// parallel
7. Convert the configuration of each identified `.bru` file into a new plain-text `[FeatureName]_Test_Data.txt` file, ensuring you include post-request scripts and assertions.
 
8. Run `git rm` on all the old native `.bru` files to remove them safely. (Wait for user approval).

// turbo
9. Use `grep -rn "qr_code" src/` in the terminal to locate any logic that stores, processes, or returns `qr_code` strings/blobs. 

10. Refactor the identified `qr_code` logic to strictly use and return `parcel_id` instead, enforcing that the frontend handles QR generation.

// turbo
11. Run the linter (`npm run lint`) to ensure the refactored code is clean. 

12. Output a structured summary of the retrofitted files.