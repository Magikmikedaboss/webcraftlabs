import Link from 'next/link';

import Callout from '@/components/mdx/Callout';
import Checklist from '@/components/mdx/Checklist';
import DiagnosticScore from '@/components/mdx/DiagnosticScore';
import PullQuote from '@/components/mdx/PullQuote';
import Stat from '@/components/mdx/Stat';
import MDXTakeaways, { Takeaways as TypedTakeaways } from '@/components/mdx/Takeaways';
import MdxImage from '@/components/mdx/MdxImage';
import SafeMdxImage from '@/components/mdx/SafeMdxImage';
import ArticleImage from '@/components/mdx/ArticleImage';
import MdxLink from '@/components/mdx/MdxLink';
import AffiliateDisclosure from '@/components/mdx/AffiliateDisclosure';
import AffiliateLink from '@/components/analytics/AffiliateLink';

import {
  BigQuote,
  Insight,
  StatBlock,
  SplitCompare,
  PostTimeline,
  Chapter,
} from '@/components/blog/EditorialTemplateV2';

import {
  LabHero,
  LabSection,
  LabNote,
  LabCard,
  FrameworkScorecard,
  LabStackDiagram,
  DecisionFlow,
  LabVerdict,
  ScoreBar,
  LabContents,
  QuickPicks,
  FrameworkTable,
  LabObservation,
  ExperimentResult,
  HandSketch,
  LabStamp,
  FrameworkAccordion,
  FAQ,
  NextSteps,
  ClassifiedHeader,
  RecoveredLog,
  SystemOutput,
  HandwrittenNote,
  FieldNotebook,
  MarginNote,
  EvidenceCard,
  QuestionCard,
  ThoughtExperiment,
  ScholarlyExample,
} from '@/components/blog/lab-notebook';

const mdxComponents = {
  // common MDX components
  Link,
  Callout,
  Stat,
  Checklist,
  DiagnosticScore,
  PullQuote,
  // Use the MDX-friendly wrapper at runtime for MDX rendering
  Takeaways: MDXTakeaways,
  // editorial components
  BigQuote,
  Insight,
  StatBlock,
  SplitCompare,
  PostTimeline,
  Chapter,
  ArticleImage,
  // lab notebook components
  LabHero,
  LabSection,
  LabNote,
  LabCard,
  FrameworkScorecard,
  LabStackDiagram,
  DecisionFlow,
  LabVerdict,
  ScoreBar,
  LabContents,
  QuickPicks,
  FrameworkTable,
  LabObservation,
  ExperimentResult,
  HandSketch,
  LabStamp,
  FrameworkAccordion,
  FAQ,
  NextSteps,
  ClassifiedHeader,
  RecoveredLog,
  SystemOutput,
  HandwrittenNote,
  FieldNotebook,
  MarginNote,
  EvidenceCard,
  QuestionCard,
  ThoughtExperiment,
  ScholarlyExample,
  // affiliate — AffiliateLink is the only component that marks a link
  // sponsored. AffiliateDisclosure is registered so a one-off article can
  // place it inline, but articles should normally set `affiliate: true` in
  // frontmatter and let the template render it above the fold instead.
  AffiliateLink,
  AffiliateDisclosure,
  // media
  img: MdxImage,
  Image: SafeMdxImage,
  // Adds rel="noopener noreferrer" to external markdown links; never
  // sponsored/nofollow, and never target="_blank". See MdxLink.
  a: MdxLink,
};

export default mdxComponents;
export { mdxComponents };
// Re-export the strongly-typed Takeaways component for TypeScript callers
export { TypedTakeaways as Takeaways };
