# Home Screen Redesign - Future Task

## Context
During navigation redesign planning, the user mentioned wanting to redesign the home screen to be more engaging.

## Current Home Page Structure
Located in `app/page.tsx`:

1. **Hero Section** (lines 44-108)
   - Value proposition + Newsletter signup form
   - Personal card with profile, title, quote, skill badges

2. **About Section** (lines 110-162)
   - Three-column expertise grid: Architecture, FP, Craftsmanship

3. **Newsletter Section** (lines 164-255)
   - Three feature cards explaining newsletter value

4. **Latest Articles Section** (lines 257-300)
   - Shows 3 most recent articles
   - "View All Articles" CTA

5. **Testimonials Section** (lines 302-377)
   - Two testimonials from colleagues
   - Closing CTA box

## User's Initial Ideas
- Make home more engaging
- Consider removing testimonials
- Promote articles and latest news more prominently
- Uncertain about exact structure - needs further discussion

## Questions to Discuss with User
1. What makes a home page "engaging" to you? (Examples from other sites?)
2. Should testimonials be removed entirely or just moved/minimized?
3. How should articles be promoted? (Featured article? Carousel? Categories?)
4. Should news have a dedicated section on home?
5. Any new sections to add? (Popular tags? Reading stats? Community?)
6. Mobile-first design considerations with new bottom nav?

## Design Considerations
- New bottom nav will change how users navigate to content
- Home may need less navigation-focused content
- Consider above-the-fold content priorities
- Balance between newsletter signup conversion and content discovery

## Related Files
- `app/page.tsx` - Main home page
- `components/newsletter-form.tsx` - Newsletter signup
- `lib/articles.ts` - Article fetching logic
- `tailwind.config.ts` - Brand colors and design tokens

## Next Steps
When ready to implement, run planning with prompt:
"Plan home screen redesign based on TODO_HOME_REDESIGN.md - ask clarifying questions first"
