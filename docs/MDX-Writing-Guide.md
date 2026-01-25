# MDX Writing Guide for WebCraft Labs Blog & News

This guide shows you how to write well-structured, readable blog posts and news articles using MDX.

## Frontmatter (Required at the top of every file)

```mdx
---
title: "Your Post Title Here"
description: "A compelling 1-2 sentence summary that appears in previews and meta tags"
date: "2026-01-15"
tags: ["web-development", "design", "performance"]
featured: true  # Optional: shows as featured post on index page
---
```

## Basic Structure for a Blog Post

```mdx
---
title: "How to Build Fast Marketing Websites"
description: "Learn the essential techniques for creating high-performance marketing sites that convert visitors into customers."
date: "2026-01-15"
tags: ["web-development", "marketing", "performance"]
featured: true
---

## Introduction

Start with a compelling opening paragraph that hooks the reader. Explain what they'll learn and why it matters.

This is your second paragraph. Keep paragraphs focused on one main idea. The improved spacing will make this easy to read.

## Main Section Heading (H2)

Use H2 headings for your main sections. These create clear visual breaks and help readers scan your content.

### Subsection (H3)

Use H3 headings for subsections within a main topic. These provide additional structure without overwhelming the reader.

Here's how you write effective content:

- Use bullet points for lists of items
- Keep each point concise and focused
- Add spacing between related concepts

#### Minor Point (H4)

Use H4 for minor points or sub-subsections. Don't go deeper than H4 - it gets too complex.

## Using Special Components

### Callouts

<Callout type="info">
This is an info callout. Use it to highlight important information that readers shouldn't miss.
</Callout>

<Callout type="warning">
This is a warning callout. Use it for potential pitfalls or things to watch out for.
</Callout>

<Callout type="success">
This is a success callout. Use it for tips, best practices, or positive outcomes.
</Callout>

### Pull Quotes

<PullQuote>
"Use pull quotes to highlight key insights or memorable statements from your article. They break up text and draw attention to important ideas."
</PullQuote>

### Key Takeaways

<Takeaways 
  title="Key Takeaways"
  items={[
    { id: "takeaway-1", text: "First important point readers should remember" },
    { id: "takeaway-2", text: "Second key insight from this section" },
    { id: "takeaway-3", text: "Third actionable takeaway they can implement" }
  ]}
/>

### Statistics

<Stat value="73%" label="of users prefer fast-loading sites" />

### Checklists

<Checklist
  items={[
    "First step in your process",
    "Second important action item",
    "Third thing to verify or complete"
  ]}
/>

## Writing Tips for Better Readability

### Use Clear Headings

Structure your content with descriptive headings that tell readers what each section covers. This helps them:

1. Scan the article quickly
2. Find specific information
3. Understand the flow of your argument

### Write Short Paragraphs

Keep paragraphs to 2-4 sentences when possible. This makes content:

- Easier to read on screens
- Less intimidating visually
- More scannable for busy readers

### Add Visual Breaks

Use these elements to break up long text:

- **Lists** for multiple related points
- **Blockquotes** for important quotes
- **Code blocks** for technical examples
- **Pull quotes** for key insights

### Emphasize Important Points

Use **bold text** for key terms or important concepts. Use *italic text* for emphasis or introducing new terms.

## Code Examples

When sharing code, use proper syntax highlighting:

```javascript
// JavaScript example
function buildWebsite() {
  const site = {
    fast: true,
    accessible: true,
    beautiful: true
  };
  return site;
}
```

```css
/* CSS example */
.editorial .prose {
  max-width: 68ch;
  line-height: 1.8;
  font-size: 1.0625rem;
}
```

Inline code looks like this: `const example = "inline code"`.

## Links and References

Link to external resources like [this example](https://example.com). Make link text descriptive so readers know where they're going.

Internal links work the same way: [Check our services](/services).

## Images

Add images with descriptive alt text:

```mdx
![Description of the image for accessibility](/images/example.jpg)
```

## Blockquotes

Use blockquotes for quotes from other sources:

> "This is a quote from an expert or another source. It's styled differently to stand out from your main content."
> 
> — Source Name

## Lists

### Unordered Lists

Use bullet points when order doesn't matter:

- First point
- Second point
- Third point
  - Nested point
  - Another nested point

### Ordered Lists

Use numbers when sequence matters:

1. First step
2. Second step
3. Third step
   1. Sub-step
   2. Another sub-step

## Horizontal Rules

Use horizontal rules to create strong visual breaks:

---

Content after the break starts fresh.

## Complete Example Post

Here's a complete example showing all elements together:

```mdx
---
title: "5 Essential Web Performance Tips"
description: "Boost your website speed with these proven optimization techniques that improve user experience and conversions."
date: "2026-01-15"
tags: ["performance", "web-development", "optimization"]
featured: true
---

## Why Website Speed Matters

Your website's loading speed directly impacts user experience and business results. Studies show that even a 1-second delay can reduce conversions by 7%.

<Stat value="53%" label="of mobile users abandon sites that take over 3 seconds to load" />

In this guide, you'll learn five essential techniques to make your website blazingly fast.

## 1. Optimize Your Images

Images often account for 50-70% of a page's total weight. Here's how to fix that:

### Choose the Right Format

- **WebP** for photos and complex images
- **SVG** for logos and icons
- **PNG** for images requiring transparency

<Callout type="info">
Modern browsers support WebP, which provides 25-35% better compression than JPEG.
</Callout>

### Implement Lazy Loading

```javascript
<img 
  src="image.jpg" 
  loading="lazy" 
  alt="Description"
/>
```

## 2. Minimize JavaScript

<PullQuote>
"The fastest JavaScript is the JavaScript you don't ship."
</PullQuote>

Reduce your JavaScript bundle size by:

1. Removing unused dependencies
2. Code splitting for large applications
3. Deferring non-critical scripts

<Checklist
  items={[
    "Audit your dependencies with webpack-bundle-analyzer",
    "Remove unused npm packages",
    "Implement dynamic imports for large components"
  ]}
/>

## 3. Enable Compression

Enable Gzip or Brotli compression on your server. This can reduce file sizes by 70-90%.

<Callout type="success">
Most modern hosting providers enable compression by default. Check your server configuration to confirm.
</Callout>

## 4. Use a CDN

Content Delivery Networks (CDNs) serve your files from servers closest to your users, reducing latency.

### Benefits of CDNs

- Faster load times globally
- Reduced server load
- Better reliability and uptime

## 5. Optimize Critical Rendering Path

Prioritize above-the-fold content to improve perceived performance:

```html
<!-- Inline critical CSS -->
<style>
  /* Critical styles here */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Key Takeaways

<Takeaways 
  title="Remember These Points"
  items={[
    { id: "opt-img", text: "Optimize images with modern formats and lazy loading" },
    { id: "min-js", text: "Minimize JavaScript by removing unused code" },
    { id: "cdn", text: "Enable compression and use a CDN for global performance" },
    { id: "critical-path", text: "Prioritize critical rendering path for faster perceived load times" }
  ]}
/>

## Next Steps

Ready to implement these optimizations? Start with images - they typically provide the biggest wins with the least effort.

<Callout type="info">
Need help optimizing your website? [Contact us](/contact) for a free performance audit.
</Callout>

---

*Last updated: 2026-01-15*
```

## Best Practices Summary

1. **Start with frontmatter** - Always include title, description, date, and tags
2. **Use clear hierarchy** - H2 for main sections, H3 for subsections, H4 sparingly
3. **Break up text** - Use lists, callouts, and pull quotes to add visual variety
4. **Write short paragraphs** - 2-4 sentences keeps content scannable
5. **Add actionable takeaways** - Help readers remember and apply what they learned
6. **Include examples** - Code blocks, images, and real-world scenarios
7. **End with next steps** - Guide readers on what to do with this information

## File Naming Convention

Save your MDX files with descriptive, URL-friendly names:

- ✅ `how-to-build-fast-websites.mdx`
- ✅ `5-essential-performance-tips.mdx`
- ❌ `blog post 1.mdx`
- ❌ `My New Article!.mdx`

## Where to Save Files

- **Blog posts**: `src/content/blog/your-post-name.mdx`
- **News articles**: `src/content/news/your-news-name.mdx`

---

Happy writing! Your posts will now have professional typography, great spacing, and excellent readability. 🎉
