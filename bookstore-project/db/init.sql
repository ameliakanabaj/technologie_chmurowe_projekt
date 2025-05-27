CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  titles TEXT[],
  original_amount NUMERIC,
  final_amount NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
