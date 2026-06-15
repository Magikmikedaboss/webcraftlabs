-- Example schema for RSS Feed Ingestion System
CREATE TABLE IF NOT EXISTS sources (
    id TEXT PRIMARY KEY,
    name TEXT,
    metadata TEXT
);
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT,
    path TEXT,
    file_hash TEXT
);
CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT,
    document_id INTEGER,
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
    source_id TEXT,
    document_id INTEGER,
    chunk_id INTEGER,
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
    event_id INTEGER,
    entity_id INTEGER,
    role TEXT
);
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT
);
CREATE TABLE IF NOT EXISTS event_tags (
    event_id INTEGER,
    tag TEXT
);
CREATE TABLE IF NOT EXISTS quantitative_measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER,
    measurement TEXT
);
