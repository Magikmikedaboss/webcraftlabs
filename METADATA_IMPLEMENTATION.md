# Open Graph & Twitter Card Metadata Implementation

## Overview
Complete implementation of Open Graph and Twitter Card metadata across all pages, plus Google Analytics (G-Y2FCT6ZTP4) integration.

## Changes Made

### 1. Google Analytics Integration
**File**: `src/components/GoogleAnalytics.tsx` (NEW)
- Created client component with GA4 tracking script
- Production-only loading (checks NODE_ENV)
- Tracking ID: G-Y2FCT6ZTP4

### 2. Root Layout Updates
**File**: `src/app/layout.tsx`
- Added GoogleAnalytics component
- Expanded metadata with complete OG/Twitter configuration
- Added title template: `%s | WebCraft Labz`
- Added keywords, robots, and verification tags
- Set default OG image and Twitter card settings

### 3. Page-Level Metadata Updates

#### Static Pages
All pages now include:
- Shortened `title` (template adds site name)
- Complete `openGraph` metadata with images (1200x630)
- Complete `twitter` metadata with large image cards
- Appropriate OG type (`website` for static pages, `article` for posts)

**Updated Pages**:
- `src/app/page.tsx` - Homepage with hero image
- `src/app/about/page.tsx` - About page
- `src/app/services/page.tsx` - Services page
- `src/app/portfolio/page.tsx` - Portfolio page
- `src/app/contact/page.tsx` - Contact page
- `src/app/build/page.tsx` - Build calculator page
- `src/app/blog/page.tsx` - Blog index page
- `src/app/news/page.tsx` - News index page

#### Dynamic Pages
**Blog Posts** (`src/app/blog/[slug]/page.tsx`):
- Dynamic metadata generation per post
- OG type: `article`
- Includes publishedTime, authors, and tags
- Uses post-specific title and description
- Default fallback image

**News Posts** (`src/app/news/[slug]/page.tsx`):
- Dynamic metadata generation per post
- OG type: `article`
- Includes publishedTime, authors, and tags
- Uses post-specific title and description
- Default fallback image

## Social Media Preview Images

### Image Mapping
- **Homepage**: `/images/tranquil-scene-grass-meadow-sky-sunset-mountain-water-webcraft-labs-hero-image.jpg`
- **About**: `/images/web-development-cross-platform-solutions-design-and-development.jpg`
- **Services**: `/images/beautiful-landscape-with-trees-and-mountains-marketing-agency-hero.jpg`
- **Portfolio**: `/images/modern-computer-display-on-an-office-desk-with-a-web-design.jpg`
- **Contact**: `/images/website-marketing-design-man-holding-megaphone-standing-on-orchid.jpg`
- **Build**: `/images/dynamic-website-speed-light-trails-with-long-exposure-.jpg`
- **Blog**: `/images/structure-database-software-development.jpg`
- **News**: `/images/business-marketing-solutions-concept-art.jpg`
- **Blog Posts**: `/images/structure-database-software-development.jpg` (default)
- **News Posts**: `/images/business-marketing-solutions-concept-art.jpg` (default)

All images are 1200x630 pixels (optimal for social media sharing).

## Testing

### How to Test Social Media Previews

1. **Facebook Sharing Debugger**:
   - URL: https://developers.facebook.com/tools/debug/
   - Enter your page URL and click "Debug"
   - Check Open Graph tags

2. **Twitter Card Validator**:
   - URL: https://cards-dev.twitter.com/validator
   - Enter your page URL
   - Preview the card appearance

3. **LinkedIn Post Inspector**:
   - URL: https://www.linkedin.com/post-inspector/
   - Enter your page URL
   - Check preview

### Google Analytics Testing

1. **Real-time Reports**:
   - Go to Google Analytics dashboard
   - Navigate to Reports > Realtime
   - Visit your site and verify page views appear

2. **Tag Assistant**:
   - Install Google Tag Assistant Chrome extension
   - Visit your site and check if GA4 tag fires correctly

## SEO Benefits

1. **Better Social Sharing**: Rich previews with images, titles, and descriptions
2. **Improved CTR**: Attractive social media cards increase click-through rates
3. **Brand Consistency**: Consistent metadata across all pages
4. **Analytics Tracking**: Complete visitor behavior tracking with GA4
5. **Search Engine Optimization**: Proper meta tags help search engines understand content

## Future Enhancements

1. Add dynamic OG images per blog/news post (if featured images are added)
2. Implement structured data (JSON-LD) for rich snippets
3. Add article-specific metadata (reading time, author profiles)
4. Implement Open Graph video tags for video content
5. Add locale-specific metadata for internationalization

## Maintenance

- Update GA tracking ID if needed in `src/components/GoogleAnalytics.tsx`
- Replace default images with post-specific images when available
- Keep metadata descriptions under 160 characters for optimal display
- Ensure all images remain at 1200x630 resolution
