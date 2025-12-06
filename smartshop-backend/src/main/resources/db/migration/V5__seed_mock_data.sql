-- Seed mock data for quick local API testing

-- Demo user (password: admin123)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@smartshop.local') THEN
        INSERT INTO users (name, email, password, role)
        VALUES ('Demo User', 'user@smartshop.local', '$2a$10$TApdWDaVYS0jLJEChOzs7u16oTupq6PrnaejwNdquEeG5uWoyRuPK', 'USER');
    END IF;
END $$;

-- Helper inserts for products per category slug (skip if name already exists)
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'iPhone 15', 'Flagship smartphone with A16 Bionic chip', 999.00, 'https://picsum.photos/seed/iphone15/600/600', c.id
FROM categories c WHERE c.slug = 'dien-thoai'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'iPhone 15');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Samsung Galaxy S23', 'Premium Android phone with great camera', 899.00, 'https://picsum.photos/seed/galaxys23/600/600', c.id
FROM categories c WHERE c.slug = 'dien-thoai'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Samsung Galaxy S23');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'MacBook Air M3', 'Lightweight laptop with Apple Silicon', 1299.00, 'https://picsum.photos/seed/macbookair/600/600', c.id
FROM categories c WHERE c.slug = 'laptop'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'MacBook Air M3');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Dell XPS 13', 'Compact ultrabook with InfinityEdge display', 1199.00, 'https://picsum.photos/seed/dellxps/600/600', c.id
FROM categories c WHERE c.slug = 'laptop'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Dell XPS 13');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Áo thun basic', 'Áo thun cotton thoáng mát, dễ phối đồ', 15.00, 'https://picsum.photos/seed/ao-thun/600/600', c.id
FROM categories c WHERE c.slug = 'thoi-trang'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Áo thun basic');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Serum Vitamin C', 'Làm sáng da và dưỡng ẩm hằng ngày', 25.00, 'https://picsum.photos/seed/serumvc/600/600', c.id
FROM categories c WHERE c.slug = 'my-pham'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Serum Vitamin C');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Nồi chiên không dầu', 'Dung tích 5L, tiết kiệm dầu mỡ', 89.00, 'https://picsum.photos/seed/noichien/600/600', c.id
FROM categories c WHERE c.slug = 'do-gia-dung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Nồi chiên không dầu');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Thức ăn hạt cho mèo', 'Hạt khô dinh dưỡng cho mèo trưởng thành', 19.00, 'https://picsum.photos/seed/hatmeo/600/600', c.id
FROM categories c WHERE c.slug = 'thu-cung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Thức ăn hạt cho mèo');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Apple Watch SE', 'Đồng hồ thông minh hỗ trợ theo dõi sức khỏe', 279.00, 'https://picsum.photos/seed/applewatch/600/600', c.id
FROM categories c WHERE c.slug = 'dong-ho'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Apple Watch SE');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Balo laptop 15 inch', 'Chống sốc, nhiều ngăn, phù hợp đi học/đi làm', 35.00, 'https://picsum.photos/seed/balo/600/600', c.id
FROM categories c WHERE c.slug = 'balo'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Balo laptop 15 inch');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Giày chạy bộ', 'Đệm êm, thoáng khí cho chạy bộ hằng ngày', 65.00, 'https://picsum.photos/seed/giaychay/600/600', c.id
FROM categories c WHERE c.slug = 'giay-dep'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Giày chạy bộ');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Vitamin tổng hợp', 'Bổ sung vitamin và khoáng chất thiết yếu', 22.00, 'https://picsum.photos/seed/vitamintonghop/600/600', c.id
FROM categories c WHERE c.slug = 'suc-khoe'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Vitamin tổng hợp');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Thảm tập yoga', 'Chống trượt, dày 8mm cho luyện tập tại nhà', 18.00, 'https://picsum.photos/seed/yogamat/600/600', c.id
FROM categories c WHERE c.slug = 'the-thao'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Thảm tập yoga');

INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'E-gift voucher', 'Mã quà tặng điện tử cho mọi dịp', 50.00, 'https://picsum.photos/seed/voucher/600/600', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'E-gift voucher');

-- Sample order for the demo user (uses the seeded products)
DO $$
DECLARE
    demo_user_id BIGINT;
    phone_id BIGINT;
    laptop_id BIGINT;
    new_order_id BIGINT;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE email = 'user@smartshop.local';
    IF demo_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM orders WHERE user_id = demo_user_id) THEN
        SELECT id INTO phone_id FROM products WHERE name = 'iPhone 15' LIMIT 1;
        SELECT id INTO laptop_id FROM products WHERE name = 'MacBook Air M3' LIMIT 1;

        INSERT INTO orders (user_id, status, total_amount)
        VALUES (demo_user_id, 'PAID', 0)
        RETURNING id INTO new_order_id;

        IF phone_id IS NOT NULL THEN
            INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            VALUES (
                new_order_id,
                phone_id,
                1,
                (SELECT CAST(price AS NUMERIC(19, 2)) FROM products WHERE id = phone_id)
            );
        END IF;

        IF laptop_id IS NOT NULL THEN
            INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            VALUES (
                new_order_id,
                laptop_id,
                1,
                (SELECT CAST(price AS NUMERIC(19, 2)) FROM products WHERE id = laptop_id)
            );
        END IF;

        UPDATE orders
        SET total_amount = (
            SELECT COALESCE(SUM(quantity * unit_price), 0)
            FROM order_items
            WHERE order_id = new_order_id
        )
        WHERE id = new_order_id;
    END IF;
END $$;
