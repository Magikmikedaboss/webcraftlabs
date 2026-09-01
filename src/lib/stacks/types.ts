/**
 * Developer Stack Library data model.
 *
 * Deliberately small. This PR builds the hub's editorial architecture, not
 * the eventual Stack Builder engine — there is no recommendation logic here,
 * only enough structure for future guides to plug in without touching layout.
 */

type BaseTrack = {
  id: string;
  /** Build type, e.g. "Solo SaaS". */
  title: string;
  description: string;
  /** Who it's for and what it optimises for. */
  useCase: string;
  /** One-line architectural characterisation. Never a vendor pitch. */
  shape: string;
};

/**
 * A track with a real, published guide. `href` is required here so a
 * published track cannot exist without somewhere to send the reader.
 */
export type PublishedStackTrack = BaseTrack & {
  status: "published";
  /** Canonical article URL — /blog/<slug>. Stack guides are ordinary posts. */
  href: string;
};

/**
 * A track whose guide isn't written yet. `href?: undefined` makes a dead
 * link unrepresentable: you cannot give a planned track a destination, so
 * the hub cannot accidentally render one as clickable.
 */
export type PlannedStackTrack = BaseTrack & {
  status: "planned";
  href?: undefined;
};

export type StackTrack = PublishedStackTrack | PlannedStackTrack;

export function isPublished(track: StackTrack): track is PublishedStackTrack {
  return track.status === "published";
}

/** A dimension every stack guide is expected to address. */
export type StackCriterion = {
  id: string;
  label: string;
  detail: string;
};

/**
 * A cross-cutting comparison the library intends to cover (databases, auth,
 * hosting…). Same published/planned discipline as tracks, and the same
 * union rather than an optional href — a published topic without a
 * destination would be unreachable, and a planned one with a destination
 * would be a dead link.
 */
type BaseTopic = {
  id: string;
  label: string;
  detail: string;
};

export type PublishedDecisionTopic = BaseTopic & {
  status: "published";
  href: string;
};

export type PlannedDecisionTopic = BaseTopic & {
  status: "planned";
  href?: undefined;
};

export type DecisionTopic = PublishedDecisionTopic | PlannedDecisionTopic;

export function isPublishedTopic(topic: DecisionTopic): topic is PublishedDecisionTopic {
  return topic.status === "published";
}
