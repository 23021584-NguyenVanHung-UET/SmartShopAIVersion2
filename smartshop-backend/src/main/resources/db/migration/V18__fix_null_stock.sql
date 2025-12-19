-- Update products with null stock to 0
UPDATE products 
SET stock = 0 
WHERE stock IS NULL;

-- Ensure stock column has default value for future inserts
ALTER TABLE products ALTER COLUMN stock SET DEFAULT 0;
