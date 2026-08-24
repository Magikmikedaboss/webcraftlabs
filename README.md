This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## IndexNow Setup

This project includes an IndexNow integration to submit URLs quickly after content updates.

1. Set environment variables:
	- `INDEXNOW_KEY`: Your IndexNow key value.
	- `INDEXNOW_SUBMIT_TOKEN`: A secret token used to authorize submissions.
	- `NEXT_PUBLIC_SITE_URL`: Your canonical site URL (already used by the app).

2. Key verification endpoint:
	- `GET /api/indexnow/key`
	- Returns your `INDEXNOW_KEY` in plain text.

3. Submit URLs endpoint:
	- `POST /api/indexnow`
	- Header: `x-indexnow-token: <INDEXNOW_SUBMIT_TOKEN>`
	- Optional JSON body:

```json
{
  "urls": [
	 "https://www.webcraftlabz.com/blog/example-post",
	 "https://www.webcraftlabz.com/news/example-update"
  ]
}
```

If no `urls` list is provided, the endpoint submits URLs from the generated sitemap.

### Optional: Automatic Trigger on Content Updates

This repo includes a [GitHub Actions workflow](.github/workflows/indexnow-submit.yml) that triggers on pushes to `main` when content or site structure changes (blog, news, archive, knowledge, services, sitemap, key static pages, and the IndexNow API itself).

Add these GitHub repository secrets to enable it:

- `INDEXNOW_ENDPOINT` (example: `https://www.webcraftlabz.com/api/indexnow`)
- `INDEXNOW_SUBMIT_TOKEN` (must match your app environment value)

If either secret is missing, the workflow exits safely without failing your deployment.
