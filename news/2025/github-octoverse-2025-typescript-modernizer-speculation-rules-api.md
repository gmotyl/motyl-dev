---
title: "GitHub's 2025 Octoverse, TypeScript Modernizer, and the Speculation Rules API"
excerpt: "This week, we dive into GitHub's 2025 Octoverse report, Microsoft's new TypeScript Modernizer for VS Code, and how to use the Speculation Rules API for instant page loads."
publishedAt: "2025-12-18"
slug: "github-octoverse-2025-typescript-modernizer-speculation-rules-api"
hashtags: "#uidev #github #typescript #ai #vscode #performance #webdev #generated #en"
---

## Octoverse: A new developer joins GitHub every second as AI leads TypeScript to #1

**TLDR:** GitHub's 2025 Octoverse report reveals that a new developer joins GitHub every second, with AI driving a surge in activity and TypeScript becoming the most used language on the platform.

**Summary:**
GitHub's latest Octoverse report for 2025 paints a picture of explosive growth, with the platform now boasting over 180 million developers. A new developer joins every second, and this rapid expansion is largely fueled by the increasing adoption of AI tools. The report highlights that generative AI is now a standard part of the development process, with over 1.1 million public repositories using an LLM SDK.

One of the most significant takeaways from the report is the rise of TypeScript, which has overtaken both Python and JavaScript to become the most used language on GitHub. This shift is attributed to the fact that typed languages make AI-assisted coding more reliable. The report also notes that while Python remains dominant for AI and data science, the combined JavaScript/TypeScript ecosystem still accounts for more overall activity.

The report also dives into the global distribution of developers, with India leading the way in new sign-ups. The country is on track to have one in every three new developers on GitHub by 2030. The report also highlights the fastest-growing open-source projects, many of which are related to AI infrastructure.

For architects and teams, the Octoverse report provides valuable insights into the current state of the developer ecosystem. The rise of TypeScript suggests that adopting a typed language is becoming increasingly important for modern development. The report also underscores the need to embrace AI tools, as they are quickly becoming an integral part of the developer workflow.

**Key takeaways:**
- GitHub now has over 180 million developers, with a new developer joining every second.
- TypeScript has become the most used language on GitHub, surpassing Python and JavaScript.
- Generative AI is now a standard part of the development process.
- India is the fastest-growing region for new developers on GitHub.

**Link:** [Octoverse: A new developer joins GitHub every second as AI leads TypeScript to #1](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

## Announcing the JavaScript/TypeScript Modernizer for VS Code

**TLDR:** Microsoft has released a new AI-assisted tool for VS Code called the JavaScript/TypeScript Modernizer. It uses GitHub Copilot to help developers upgrade their projects, automating package updates and code changes.

**Summary:**
Keeping JavaScript and TypeScript projects up-to-date can be a tedious and time-consuming process. To address this, Microsoft has introduced the JavaScript/TypeScript Modernizer, a new extension for Visual Studio Code. This tool leverages GitHub Copilot to automate much of the modernization process, from upgrading npm packages to fixing breaking changes in the code.

The Modernizer works by analyzing your project's `package.json` file and proposing an upgrade plan. It then automatically updates your dependencies to their latest versions and suggests any necessary code changes to accommodate new APIs or breaking changes. The entire process is guided by an interactive Copilot Chat experience, which explains what's happening and asks for confirmation when needed.

This tool is particularly useful for developers working with older codebases that need to be brought up-to-date with modern JavaScript and TypeScript practices. By automating the most tedious parts of the upgrade process, the Modernizer can save developers a significant amount of time and effort.

For development teams, the JS/TS Modernizer offers a way to streamline the process of maintaining and upgrading projects. It can help to ensure that projects are always using the latest and most secure versions of their dependencies, and it can free up developers to focus on more creative and high-impact work.

**Key takeaways:**
- Microsoft has released the JavaScript/TypeScript Modernizer for VS Code.
- The tool uses GitHub Copilot to automate the process of upgrading JS/TS projects.
- It can update npm packages and suggest code changes to fix breaking changes.
- The Modernizer is currently available in the preview version of the GitHub Copilot App Modernization extension.

**Link:** [Announcing the JavaScript/TypeScript Modernizer for VS Code - Microsoft for Developers](https://developer.microsoft.com/blog/jsts-modernizer-preview)

## <100ms E-commerce: Instant loads with Speculation Rules API

**TLDR:** The Speculation Rules API (SRA) is a new browser feature that can dramatically improve the perceived performance of websites by prerendering or prefetching pages that a user is likely to visit next.

**Summary:**
In the world of e-commerce, speed is everything. A faster website leads to a better user experience and higher conversion rates. The Speculation Rules API (SRA) is an experimental browser feature that can help to make websites feel instant by prerendering or prefetching pages in the background.

The SRA allows developers to provide hints to the browser about which pages a user is likely to navigate to next. The browser can then start loading these pages in an invisible tab, so that when the user clicks on a link, the page appears to load instantly. The API provides two main options: `prerender` and `prefetch`. Prerendering fully loads and renders a page in the background, while prefetching only downloads the page's document.

The article provides a detailed guide on how to use the SRA, including how to define speculation rules in a `<script>` tag and how to use the different options for `eagerness` and `source`. It also discusses the potential caveats of using the SRA, such as increased server load and the need to handle analytics and A/B testing carefully.

For developers working on e-commerce sites or any other website where performance is critical, the SRA is a powerful tool that can be used to create a much faster and more responsive user experience. While the API is still experimental, it is available in modern versions of Chromium-based browsers, and it is likely to become more widely supported in the future.

**Key takeaways:**
- The Speculation Rules API can be used to prerender or prefetch pages in the background.
- This can make websites feel instant and dramatically improve perceived performance.
- The API is currently experimental and only available in Chromium-based browsers.
- Developers should be mindful of the potential caveats, such as increased server load and issues with analytics.

**Link:** [<100ms E-commerce: Instant loads with Speculation Rules API](https://blog.sentry.io/less-than-100ms-e-commerce-instant-loads-with-speculation-rules-api/)
