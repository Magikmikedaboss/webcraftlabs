# TODO: Fix Issues Across Multiple Files

## Files to Edit:

### 1. docs/MDX-Writing-Guide.md
- [x] Replace all occurrences of "2024-01-15" with "2026-01-15"

### 2. docs/Portfolio-Customization-Guide.md
- [x] Fix corrupted header line 1: replace with "# Portfolio Page Customization Guide"

### 3. PRODUCTION_READINESS_REPORT.md
- [x] Tighten wording and fix grammar in contact form sections (lines 86-114, 179-188, 388-401)
- [x] Make bullets concise and parallel
- [x] Fix punctuation and capitalization in TODO code comments
- [x] Ensure consistent terminology for email/database options

### 4. src/app/build/BuildCalculatorClient.tsx
- [x] Add cleanup for all setTimeout calls using refs and useEffect cleanup
- [x] Update email input to type="email" with autocomplete="email"
- [x] Update website input to type="url" with autocomplete="url"

### 5. src/app/portfolio/page.tsx
- [x] Make category buttons non-interactive (replace <button> with <span> or add disabled attribute)
- [x] Replace "#" placeholder links with null or empty string
- [x] Update component to hide/disable CTAs when link is falsy

### 6. src/components/content/PostCard.tsx
- [x] Replace hardcoded Tailwind colors with CSS variables
- [x] Use text-[var(--primary)], text-[var(--text)], text-[var(--muted)], border-[var(--border)], bg-[var(--card)] or bg-[var(--surface)]

### 7. src/components/content/PostIndexClient.tsx
- [x] Add aria-label="Search posts" to search input
- [x] Add aria-label="Filter by tag" to select element

### 8. src/components/mdx/Takeaways.tsx
- [x] Update component to accept items as objects with unique id: {id, text}
- [x] Update mapping to use key={item.id} and render item.text

### 9. src/lib/mdx/blog.ts
- [x] Fix sort comparator to return 0 when dates are equal

### 10. src/lib/mdx/news.ts
- [x] Fix sort comparator to return 0 when dates are equal

### 11. src/lib/theme-toggle.ts
- [x] Add server-side guard to toggleTheme (check typeof document === 'undefined')
- [x] Add server-side guard to getCurrentTheme (return 'light' when typeof document === 'undefined')
