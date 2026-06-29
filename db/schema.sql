-- Example schema for RSS Feed Ingestion System
CREATE TABLE IF NOT EXISTS sources (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    metadata TEXT
);
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL REFERENCES sources(id),
    path TEXT NOT NULL,
    file_hash TEXT,
    UNIQUE(source_id, path)
);
CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
-- Child-side FK indexes (not covered by PK or leftmost composite key)
CREATE INDEX IF NOT EXISTS idx_documents_source_id ON documents(source_id);
CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_research_events_chunk_id ON research_events(chunk_id);
CREATE INDEX IF NOT EXISTS idx_event_entities_entity_id ON event_entities(entity_id);
CREATE INDEX IF NOT EXISTS idx_event_tags_tag_id ON event_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_quantitative_measurements_event_id ON quantitative_measurements(event_id);
