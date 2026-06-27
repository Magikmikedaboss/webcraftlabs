
import { permanentRedirect } from "next/navigation";

// Synthetic Minds intro is now the series overview blog post.
export default function Page() {
  permanentRedirect("/blog/synthetic-minds-series");
}
