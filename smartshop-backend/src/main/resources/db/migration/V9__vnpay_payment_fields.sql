ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS payment_transaction_no VARCHAR(64),
    ADD COLUMN IF NOT EXISTS payment_bank_code VARCHAR(32),
    ADD COLUMN IF NOT EXISTS payment_pay_date TIMESTAMPTZ;
