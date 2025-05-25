CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  original_amount NUMERIC,
  final_amount NUMERIC
);
