ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
    ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS payment_code VARCHAR(64);

UPDATE orders SET payment_method = 'COD' WHERE payment_method IS NULL;
UPDATE orders SET payment_status = 'PENDING' WHERE payment_status IS NULL;
UPDATE orders SET payment_code = substr(md5(random()::text), 1, 8) WHERE payment_code IS NULL;

ALTER TABLE orders
    ALTER COLUMN payment_method SET NOT NULL,
    ALTER COLUMN payment_status SET NOT NULL;
