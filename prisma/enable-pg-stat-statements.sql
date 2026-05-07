-- Run this on NeonDB to enable slow query monitoring.
-- After installing, use the Neon MCP list_slow_queries tool to analyze query performance.
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
