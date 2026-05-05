-- Run this on NeonDB before deploying the embedding feature.
-- 1. Enable pg_vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding column
ALTER TABLE diningfm.episodes
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- 3. Create HNSW index for cosine similarity search
CREATE INDEX IF NOT EXISTS episodes_embedding_hnsw_idx
  ON diningfm.episodes
  USING hnsw (embedding vector_cosine_ops);
