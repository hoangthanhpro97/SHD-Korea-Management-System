# Cursor AI — Quy tắc dự án SHD Korea

You are working on a regulated personal-data workflow. Write minimal, tested code. The user is a non-programmer: explain in Vietnamese, show a short plan first, wait for consent before destructive changes.

## Source-of-truth rules
1. Read `docs/shd-spec/README.md` and `docs/shd-spec/docs/02_REQUIREMENTS_TRACEABILITY.md` before implementation.
2. Treat SOP01/SOP02 as BUSINESS SOURCES; `docs/11_OPEN_DECISIONS.md` remains pending. Do not invent approval authorities.
3. Case, application, task, document, learning status, invoice are separate objects.
4. Handover ≠ sent to school ≠ school receipt ≠ acceptance.
5. No modification/fabrication of legal documents. No AI decisions regarding academic/visa outcomes.
6. Dates, fees, authority requirements are configuration, not constants from older SOP.

## Engineering rules
- Use TypeScript strict, ESLint, tests; no broad unverified refactors.
- Before a task: list files to create/modify, tests, risks, stop conditions.
- Do not mutate PRODUCTION or use real student data. Never run destructive shell commands without explicit approval.
- Do not include secrets/API tokens/service account keys/real passport numbers in repo, logs, examples or AI prompts.
- Auth/authorization must be enforced server-side & Firebase security rules; never rely solely on UI hiding.
- Logs redact PII. All privileged workflow transitions write immutable audit records.
- Use synthetic test fixtures in `data/synthetic_demo_cases.json`.
- Commit one bounded feature after tests; if tests fail, explain why and ask user before wider changes.

## Current task phase
Sprint 0 only: demo local app scaffold; no Google APIs, Firebase billing or credentials before approval.
