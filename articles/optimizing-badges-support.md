---
title: 'Optimizing Build-Time Hashtag Indexing'
excerpt: 'How critical thinking led to a performant and user-friendly hashtag system for my blog.'
publishedAt: '2025-06-04'
slug: 'optimizing-badges-support'
hashtags: '#performance #ai #vibe-coding #ux'
---

### TLDR:

Ever tried making a static site smart enough to filter articles by hashtags without breaking a sweat (or your server)? I did, and it was a hilarious, slightly frustrating, but ultimately successful (vibe) ride to **build-time hashtag indexing**. V0 generated some problems though and even it managed to bake the branch, but it saved me hours of hard work, so I guess vibe coding it was worth it :rocket:

---

### Using AI for design inspiration

So, I had this grand vision: a beautiful collection of articles, all neatly tucked away as **MDX files** in a Git repository (there will be another article that describes my blogs architecture and why I chose this approach). But here's the kicker – I wanted to filter them by hashtags. Easy, right? Just slap some tags on 'em.

Ah, but the devil's in the details 👹, especially when you're talking **performance**. My articles are static, meaning no fancy database queries. How do you filter a bazillion MDX files efficiently without making your users wait for an eternity? Let's ask AI and see what it comes up with.

---

### The Prompt That Started It All (and the debates that followed)

My initial plea to the digital gods (okay, the AI) went something like this:

> add hashtags support in article metadata, on article list it should be possible to filter by hashtag, before you implement anything figure out what would be most efficient way in terms of performance, since articles are just mdx files in git repository, so maybe we should support hashtags in file name somehow to make it easy to filter

The V0 came back with options:

1.  **Hashtags in frontmatter + runtime filtering:** "Clean metadata!" it chirped. "But we'll have to read _all the files_ every single time someone wants to filter!"
2.  **Hashtags in filename:** "Super fast filtering!" but filenames are not very readable with this approach
3.  **Frontmatter + build-time hashtag index:** "Clean metadata _and_ fast filtering! But it's a bit more complex to set up."

I went with option 3, since it was the most performant and flexible solution.

### First problems

V0 decided to implement changes anyway, without waiting for my response. It implemented option 1, probably thinking I was a simpleton with five articles. I will deal with that later, since there was much bigger problem. My existing articles content _vanished_. Poof! Gone! **"Don't you dare touch my words V0!"** My articles are like my babies; you can dress 'em up in new metadata, but you can't rewrite their stories.

> never modify content of articles, the text, you can modify metadata only. I prefer Option 3: Frontmatter + build-time hashtag index

V0 reimplemented logic, but it ignored my request to not modify content of articles. I had to react:

> where is content of my articles you lost the content, I prefer hashtags written as actual #hashtag in metadata,

OK finally articles content was restored. Additionally more flexible hashtag format was added: `#tag1 #tag2` or `["tag1", "tag2"]`. The parser became smart enough to handle the `#` automatically. Crisis, mostly, averted :muscle:

#### Styling issue

Next, the aesthetics. My hashtag badges were practically invisible, like ninjas in a snowstorm – white text on a light background. Unacceptable!

> text on hastag badge in article list is barely visible since the background is light and text is white, make the text darker, much darker

V0 turned badges into boring black and white. I had to be more specific:

> badge background should be more purple, light purple, also when you click on hashtag badge in the list or in the article it should go to list filtered by this hashtag

OK it was acceptable now.

---

### How hastags work now

After all the back-and-forth, we landed on quite clever solution:

#### Build-Time Hashtag Indexing: The Secret Sauce

This is where the magic happens. Imagine your static site getting ready for prime time (aka the build process). Instead of just sitting there, it gets busy:

- **It scans all my articles _once_.** Think of it as a super-efficient librarian reading all the book titles and their categories.
- **It builds an index.** This index is basically a cheat sheet: "If you're looking for `#react`, check out `article-slug-1` and `article-slug-2`."
- **Performance? <span class="math-inline">O\(1\)</span>!** When you click a hashtag, it's not scanning every file; it's doing an instant lookup in that pre-built index. It's like having a direct line to the exact articles you need. Whether I have 10 articles or 10,000, filtering is **lightning fast**. This is what I expected from the beginning.

My articles' metadata now neatly holds the hashtags, easy to read and manage. I might refine this solution in the future, but is is good enough for now.

#### User-Friendly UI: The Cherry on Top

- **Clickable badges:** Every hashtag is now a portal. Click it on an article card, click it on the article page itself – it whisks you away to a filtered list of all articles sharing that tag. It's intuitive, it's smooth, and it makes Browse a joy.

So, yeah, it was a bit of a journey, but totally worth it. Now, my static site isn't just pretty; it's smart, fast, and ready to serve up content with a side of performance.

---

### Time for pull request

I learned V0 makes a lot of mistakes, so I push the changes to develop branch (it's easy workflow since I am only one working on this project). I create a [pull request](https://github.com/gmotyl/motyl-dev/pull/6) to merge my changes to main branch. Since project is open source, Github created code review for me, Yea another AI that verified V0's work. It found some issues, but I ignored them for now, since I plan to audit the codebase soon anyway. It will be right time to get back to this PR and address the issues.

### The Plot Thickens: Build Failures :warning:

The PR merged but it did not deploy! Turned out it was working fine in V0 interface but it failed to build on Vercel. Time to roll up my sleeves and fix this mess! :muscle:

Here is the problem I encountered:

#### Build Error Due to fs Module Usage :file_folder:

- **Issue:** The build failed because the code was using Node.js's fs module synchronously in a client-side context. Next.js expects server-side code (like file system operations) to be asynchronous.
- **Solution:** Switched from `import fs from "fs"` to `import fs from "fs/promises"`. This change ensures that all file system operations are asynchronous, using promises, which is compatible with Next.js's server-side rendering and API routes.

#### Additional changes

I refactored code from mdx to md files, as they have better support in IDE where I write the articles. If you are curious why I use static files for my blog articles and other architectural decisions, I will write about it in separate article (promise to link it here when it's published :wink: )
Additionally I added prettier to the project, since it was annoying that V0 adds semicolons and removes them randomly :)

[PR Link](https://github.com/gmotyl/motyl-dev/pull/6)

---

### Conclusion :tada:

Vibe coding, works indeed! :rocket: ...but it requires some expertise to make it right. In the end, I managed to get it working, but I had to fix some issues manually, and I learned something in the process. I am glad I persevered, because the result is worth it. **_It took only 2h to implement this feature, and I am happy with the result._**

#newsletter-cta
