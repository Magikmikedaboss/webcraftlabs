# PoweredBy Component

A brandable "Powered by WebCraft Labz" badge that you can add to client websites.

## Usage

```tsx
import PoweredBy from "@/components/PoweredBy";

// In your footer or page
<PoweredBy />
```

## Props

- `variant`: `"light" | "dark" | "simple"` - Visual style (default: "light")
- `size`: `"sm" | "md" | "lg"` - Size of the badge (default: "md")
- `className`: Additional CSS classes

## Examples

### Light variant (default)
```tsx
<PoweredBy variant="light" size="md" />
```
Best for light backgrounds. Has subtle shadow and border.

### Dark variant
```tsx
<PoweredBy variant="dark" size="md" />
```
Best for dark backgrounds. Has dark background with light text.

### Simple variant
```tsx
<PoweredBy variant="simple" size="sm" />
```
Minimal style, no background or border. Great for subtle placement.

## Installation on Client Sites

### Option 1: Copy Component File
Copy `src/components/PoweredBy.tsx` to the client's project and import it.

### Option 2: NPM Package (Future)
Coming soon: `npm install @webcraftlabz/powered-by`

### Option 3: Embed Code
For non-React sites, use the HTML snippet below:

```html
<a 
  href="https://webcraftlabz.com" 
  target="_blank" 
  rel="noopener noreferrer"
  style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,0.8); border: 1px solid #e5e7eb; text-decoration: none; color: #4b5563; font-size: 14px; font-weight: 500; transition: all 0.2s;"
  onmouseover="this.style.color='#111827'; this.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.1)';"
  onmouseout="this.style.color='#4b5563'; this.style.boxShadow='0 1px 2px 0 rgba(0,0,0,0.05)';"
>
  <img 
    src="https://webcraftlabz.com/images/branding/flaming-phoenix-logo-design-website-marketing-developer.svg" 
    alt="WebCraft Labz" 
    width="20" 
    height="20"
    style="width: 20px; height: 20px;"
  />
  <span>Powered by <strong>WebCraft Labz</strong></span>
</a>
```

## Common Placements

### Footer (recommended)
```tsx
<footer>
  {/* Your footer content */}
  <PoweredBy variant="light" size="sm" className="mt-6" />
</footer>
```

### Sidebar
```tsx
<aside>
  {/* Sidebar content */}
  <PoweredBy variant="simple" size="sm" />
</aside>
```

### Bottom of page
```tsx
<div className="fixed bottom-4 right-4">
  <PoweredBy variant="light" size="sm" />
</div>
```

## Customization

You can override styles with the `className` prop:

```tsx
<PoweredBy 
  variant="light" 
  size="sm"
  className="opacity-70 hover:opacity-100"
/>
```

## Benefits

- **Brand Awareness**: Every client site links back to WebCraft Labz
- **SEO**: Quality backlinks from client sites
- **Social Proof**: Shows professional work and credibility
- **Lead Generation**: Potential clients can discover your services
- **Professional**: Subtle, tasteful branding that doesn't distract

## Best Practices

1. **Placement**: Footer is most common and professional
2. **Size**: Use "sm" for most cases to keep it subtle
3. **Variant**: Match your client's site theme (light/dark)
4. **Permission**: Include in client contracts that badge stays for X months
5. **Value Exchange**: Offer small discount if client keeps badge visible
