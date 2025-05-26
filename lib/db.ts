// Simplified read-only database for demonstration purposes
// Contains sample articles for the newsletter landing page

type Article = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  createdAt: string
  updatedAt: string
}

// Sample articles data
const articles: Article[] = [
  {
    id: "1",
    title: "Building Scalable Frontend Architectures",
    slug: "building-scalable-frontend-architectures",
    content: `# Building Scalable Frontend Architectures

As applications grow in complexity, having a solid frontend architecture becomes crucial for maintainability and team productivity.

## Key Principles

### 1. Component Composition
Break down your UI into small, reusable components that follow the single responsibility principle.

### 2. State Management
Choose the right state management solution based on your application's complexity and team size.

### 3. Code Organization
Structure your codebase in a way that makes it easy for new team members to understand and contribute.

## Best Practices

- **Separation of Concerns**: Keep business logic separate from UI components
- **Testing Strategy**: Implement comprehensive testing at all levels
- **Performance Optimization**: Consider bundle size and runtime performance from the start

Building scalable architectures is an investment in your team's future productivity.`,
    excerpt: "Learn how to design frontend architectures that grow with your business and stand the test of time.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Functional Programming in Modern JavaScript",
    slug: "functional-programming-modern-javascript",
    content: `# Functional Programming in Modern JavaScript

Functional programming principles can make your JavaScript code more predictable, testable, and maintainable.

## Core Concepts

### Immutability
Avoid mutating data structures. Instead, create new ones.

\`\`\`javascript
// Instead of this
const user = { name: 'John', age: 30 };
user.age = 31;

// Do this
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };
\`\`\`

### Pure Functions
Functions that always return the same output for the same input and have no side effects.

### Higher-Order Functions
Functions that take other functions as arguments or return functions.

## Benefits

- **Predictability**: Pure functions are easier to reason about
- **Testability**: No side effects make testing straightforward  
- **Reusability**: Functional composition promotes code reuse

Start small by applying these principles to utility functions and gradually expand to larger parts of your codebase.`,
    excerpt: "Explore how functional paradigms lead to more maintainable, testable, and robust frontend systems.",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    title: "The Art of Code Reviews",
    slug: "art-of-code-reviews",
    content: `# The Art of Code Reviews

Code reviews are one of the most effective ways to improve code quality and share knowledge within a team.

## What to Look For

### Code Quality
- **Readability**: Is the code easy to understand?
- **Maintainability**: Will this be easy to modify in the future?
- **Performance**: Are there any obvious performance issues?

### Architecture
- **Design Patterns**: Are appropriate patterns being used?
- **Separation of Concerns**: Is the code properly organized?
- **Dependencies**: Are dependencies managed well?

## Review Best Practices

### For Reviewers
- Be constructive and specific in feedback
- Explain the "why" behind suggestions
- Acknowledge good code when you see it

### For Authors
- Keep pull requests small and focused
- Provide context in the description
- Be open to feedback and discussion

## Building a Review Culture

Creating a positive code review culture takes time but pays dividends in code quality and team knowledge sharing.

Remember: The goal is to improve the code and help each other grow as developers.`,
    excerpt:
      "Discover battle-tested techniques for conducting effective code reviews that improve quality and team collaboration.",
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z",
  },
]

// Mock database functions (read-only)
export const db = {
  article: {
    findMany: async ({ take }: { take?: number } = {}) => {
      if (take) {
        return articles.slice(0, take)
      }
      return articles
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      if (where.slug) {
        return articles.find((article) => article.slug === where.slug) || null
      }
      if (where.id) {
        return articles.find((article) => article.id === where.id) || null
      }
      return null
    },
  },
}

// Helper function to generate a slug from a title (kept for potential future use)
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
