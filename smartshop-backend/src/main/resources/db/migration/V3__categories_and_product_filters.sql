-- Categories and product-category link
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products
    ADD COLUMN IF NOT EXISTS category_id BIGINT REFERENCES categories(id);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

-- Seed default categories for frontend
INSERT INTO categories (name, slug)
VALUES 
    ('Áo', 'ao'),
    ('Quần', 'quan'),
    ('Giày', 'giay'),
    ('Phụ kiện', 'phu-kien'),
    ('Điện tử', 'dien-tu')
ON CONFLICT (slug) DO NOTHING;
