-- Example schema for RSS Feed Ingestion System
CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    name TEXT,
    metadata TEXT
);
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL REFERENCES sources(id),
    path TEXT,
    file_hash TEXT
);
CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL REFERENCES sources(id),
    document_id INTEGER NOT NULL REFERENCES documents(id),
    page_number INTEGER,
    section TEXT,
    text TEXT
);
CREATE TABLE IF NOT EXISTS entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT,
    entity_name TEXT,
    entity_variant TEXT,
    extra TEXT
);
CREATE TABLE IF NOT EXISTS research_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL REFERENCES sources(id),
    document_id INTEGER NOT NULL REFERENCES documents(id),
    chunk_id INTEGER NOT NULL REFERENCES chunks(id),
    page_number INTEGER,
    domain TEXT,
    event_type TEXT,
    study_stage TEXT,
    biological_system TEXT,
    application_area TEXT,
    outcome TEXT,
    failure_reason TEXT,
    decision_taken TEXT,
    decision_driver TEXT,
    evidence_snippet TEXT,
    evidence_strength_v TEXT,
    confidence_v TEXT
);
CREATE TABLE IF NOT EXISTS event_entities (
    event_id INTEGER NOT NULL REFERENCES research_events(id),
    entity_id INTEGER NOT NULL REFERENCES entities(id),
    role TEXT,
    PRIMARY KEY (event_id, entity_id)
);
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS event_tags (
    event_id INTEGER NOT NULL REFERENCES research_events(id),
    tag_id INTEGER NOT NULL REFERENCES tags(id),
    PRIMARY KEY (event_id, tag_id)
);
CREATE TABLE IF NOT EXISTS quantitative_measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL REFERENCES research_events(id),
    measurement TEXT
);
