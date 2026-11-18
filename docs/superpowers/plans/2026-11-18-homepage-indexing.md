# Homepage indexing implementation plan

Goal: publish durable search discovery for https://rriyaldhi.co/ only.

Scope approved in chat: keep Books and Travel as existing hash views; add no separate indexed pages. Preserve unrelated workspace changes. Use the existing Webpack/GitHub Pages pipeline without new dependencies.

- [ ] Add a homepage description, canonical URL, Google ownership verification and static homepage fallback to `src/index.ejs`.
- [ ] Add `public/robots.txt`, a single-URL `public/sitemap.xml`, and a public IndexNow verification file. Copy them into the clean production output and verify the output during every production build.
- [ ] Add an IndexNow notification after successful Pages deployment, submitting only the homepage after checking that the live key is available. Notification failures should be reported independently of a successful deployment.
- [ ] Build and test a temporary clean export of HEAD plus only this task's files, excluding unrelated Travel work. Review the diff, deploy, and verify the live files and metadata.
- [ ] Verify Google ownership; submit the sitemap and request homepage indexing in Google and Bing. Record the actual service responses, including any blockers. Capture the resulting account screens.

Verification: production build must fail if discovery files or homepage metadata are missing; run existing unit tests, check the no-JavaScript HTML, and verify successful live responses. Submission is distinct from actual indexing and ranking.
