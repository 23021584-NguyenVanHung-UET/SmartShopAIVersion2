-- Update product prices to realistic VND values

UPDATE products SET price = 24990000 WHERE name = 'iPhone 15';
UPDATE products SET price = 18990000 WHERE name = 'Samsung Galaxy S23';
UPDATE products SET price = 32990000 WHERE name = 'MacBook Air M3';
UPDATE products SET price = 28990000 WHERE name = 'Dell XPS 13';
UPDATE products SET price = 149000 WHERE name = 'Áo thun basic';
UPDATE products SET price = 350000 WHERE name = 'Serum Vitamin C';
UPDATE products SET price = 1890000 WHERE name = 'Nồi chiên không dầu';
UPDATE products SET price = 285000 WHERE name = 'Thức ăn hạt cho mèo';
UPDATE products SET price = 6990000 WHERE name = 'Apple Watch SE';
UPDATE products SET price = 450000 WHERE name = 'Balo laptop 15 inch';
UPDATE products SET price = 1290000 WHERE name = 'Giày chạy bộ';
UPDATE products SET price = 320000 WHERE name = 'Vitamin tổng hợp';
UPDATE products SET price = 250000 WHERE name = 'Thảm tập yoga';
UPDATE products SET price = 500000 WHERE name = 'E-gift voucher';

-- Also update existing order items to reflect new prices
UPDATE order_items oi
SET unit_price = p.price
FROM products p
WHERE oi.product_id = p.id
  AND oi.order_id IN (
    SELECT id FROM orders WHERE user_id = (
      SELECT id FROM users WHERE email = 'user@smartshop.local'
    )
  );

-- Recalculate order totals
UPDATE orders o
SET total_amount = (
    SELECT COALESCE(SUM(oi.quantity * oi.unit_price), 0)
    FROM order_items oi
    WHERE oi.order_id = o.id
)
WHERE o.user_id = (SELECT id FROM users WHERE email = 'user@smartshop.local');
