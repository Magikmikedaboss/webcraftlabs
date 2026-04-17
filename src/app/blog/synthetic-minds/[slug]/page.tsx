import { notFound } from "next/navigation";
// All Synthetic Minds episodes are now MDX blog posts.
// This dynamic route is deprecated and intentionally left blank.
export default function DeprecatedSyntheticMindsPage() {
  return notFound();
}
