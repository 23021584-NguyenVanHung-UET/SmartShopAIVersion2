-- Refresh mock catalog with real product imagery and richer descriptions
UPDATE products
SET description = '6.1-inch Super Retina XDR display, A16 Bionic, 48MP main camera with dual eSIM, and USB-C for faster everyday charging.',
    image_url = 'https://images.macrumors.com/t/wRYjv-yOOKWJXXK2qH71pFDDcWs=/1600x/article-new/2023/09/PRODUCT-RED-Apple.jpg'
WHERE name = 'iPhone 15';
UPDATE products
SET description = '6.1-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2 for Galaxy, triple camera with 3x optical zoom, and Vision Booster for bright daylight.',
    image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Samsung Galaxy S23';
UPDATE products
SET description = '13-inch Liquid Retina display, fanless design with Apple M3, up to 18 hours of battery life, and MagSafe fast charging in a 1.24kg chassis.',
    image_url = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'MacBook Air M3';
UPDATE products
SET description = '13.4-inch InfinityEdge 16:10 display, Intel Evo platform for all-day productivity, CNC aluminum body, and dual Thunderbolt 4 ports.',
    image_url = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Dell XPS 13';
UPDATE products
SET description = 'Áo thun cotton 100% 210gsm, cổ tròn, phom regular, bền màu sau nhiều lần giặt, dễ phối với quần jeans hoặc jogger.',
    image_url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Áo thun basic';
UPDATE products
SET description = 'Serum Vitamin C 15% giúp làm sáng da, cải thiện thâm mụn, kết hợp hyaluronic acid để cấp ẩm và phục hồi hàng rào bảo vệ da.',
    image_url = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Serum Vitamin C';
UPDATE products
SET description = 'Nồi chiên không dầu dung tích 5L, điều khiển cảm ứng 7 chế độ, công suất 1500W, giỏ chiên chống dính tháo rời dễ vệ sinh.',
    image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Nồi chiên không dầu';
UPDATE products
SET description = 'Thức ăn hạt cho mèo trưởng thành, giàu protein từ gà, bổ sung taurine và omega-3 giúp lông óng mượt và hệ tiêu hóa khỏe.',
    image_url = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Thức ăn hạt cho mèo';
UPDATE products
SET description = 'Apple Watch SE GPS, chip S8, cảm biến nhịp tim quang học, phát hiện té ngã, tích hợp chế độ luyện tập và thông báo thông minh.',
    image_url = 'https://www.apple.com/newsroom/images/product/watch/lifestyle/Apple_announces-watch-se_09152020.jpg.og.jpg?202512022249'
WHERE name = 'Apple Watch SE';
UPDATE products
SET description = 'Balo chống sốc cho laptop 15", ngăn chính rộng, ngăn phụ chống nước cho phụ kiện, đệm lưng thoáng khí khi đeo cả ngày.',
    image_url = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'Balo laptop 15 inch';
UPDATE products
SET description = 'Giày chạy bộ đệm EVA, upper mesh thoáng khí, đế ngoài cao su chống trượt, phù hợp chạy bộ hằng ngày và tập gym.',
    image_url = 'https://media.istockphoto.com/id/1688015574/photo/white-sneaker-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=gz8bGn7h_eaF4uJGJjdZYYhJDrrigHAygo2Vi8tZjH8='
WHERE name = 'Giày chạy bộ';
UPDATE products
SET description = 'Vitamin tổng hợp cung cấp nhóm B, C, D3 và khoáng chất thiết yếu, hỗ trợ năng lượng và miễn dịch, dùng 1 viên sau bữa sáng.',
    image_url = 'https://m.media-amazon.com/images/I/81CzRFN1EOL._AC_UF1000,1000_QL80_.jpg'
WHERE name = 'Vitamin tổng hợp';
UPDATE products
SET description = 'Thảm tập yoga dày 8mm, bề mặt TPE chống trượt, kèm dây buộc, phù hợp tập yoga, pilates và stretching tại nhà.',
    image_url = 'https://cdn.thewirecutter.com/wp-content/media/2024/07/yoga-mat-2048px-1633-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200'
WHERE name = 'Thảm tập yoga';
UPDATE products
SET description = 'Mã quà tặng điện tử, giao ngay qua email, dùng được cho mọi danh mục sản phẩm và có hạn sử dụng 12 tháng.',
    image_url = 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80'
WHERE name = 'E-gift voucher';
-- New products with real imagery and detailed specs
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Xiaomi Redmi Note 13 Pro', 'Màn AMOLED 120Hz, Snapdragon 7s Gen 2, camera 200MP chống rung OIS và pin 5100mAh sạc nhanh 67W.', 8990000,
       'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'dien-thoai'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Xiaomi Redmi Note 13 Pro');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Asus ROG Zephyrus G14', 'Laptop gaming 14-inch 120Hz, Ryzen 9, RTX 4060, tản nhiệt vapor chamber và pin 76Wh trong thân máy 1.65kg.', 39990000,
       'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'laptop'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Asus ROG Zephyrus G14');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Sony WH-1000XM5', 'Tai nghe chống ồn chủ động với 8 micro và chip V1, thời lượng pin 30 giờ, sạc nhanh 3 phút nghe 3 giờ, hỗ trợ 2 thiết bị song song.', 8990000,
       'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Sony WH-1000XM5');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Kindle Paperwhite Signature', 'Màn e-ink 6.8 inch 300ppi, đèn tự điều chỉnh, sạc không dây và dung lượng 32GB cho thư viện sách offline.', 3890000,
       'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Kindle Paperwhite Signature');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Dyson V12 Detect Slim', 'Máy hút bụi không dây nhẹ 2.4kg, laser phát hiện bụi mịn, thời gian chạy tới 60 phút, màng lọc HEPA khóa bụi 99.99%.', 15990000,
       'https://helios-i.mashable.com/imagery/reviews/07Ftc7ZwEt5rCOc5sShBSGP/hero-image.fill.size_1248x702.v1722881004.png', c.id
FROM categories c WHERE c.slug = 'do-gia-dung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Dyson V12 Detect Slim');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Garmin Forerunner 265', 'Đồng hồ GPS màn AMOLED, đo VO2 Max, đề xuất bài tập dựa trên hồi phục, pin 13 ngày ở chế độ smartwatch.', 11290000,
       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'dong-ho'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Garmin Forerunner 265');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Nike Air Zoom Pegasus 41', 'Giày chạy midsole ReactX với hai túi Air Zoom, upper engineered mesh thoáng khí và đế waffle bám đường tốt.', 3790000,
       'https://cdn.shopify.com/s/files/1/0129/6942/files/mens-nike-pegasus-41-ghost-blue-void-grey_1.jpg?v=1753121657', c.id
FROM categories c WHERE c.slug = 'giay-dep'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Nike Air Zoom Pegasus 41');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT 'Laneige Water Sleeping Mask', 'Mặt nạ ngủ dưỡng ẩm với hyaluronic acid và squalane, kết cấu gel nhẹ, cấp nước suốt đêm cho da mượt mà.', 890000,
       'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80', c.id
FROM categories c WHERE c.slug = 'my-pham'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Laneige Water Sleeping Mask');
INSERT INTO products (name, description, price, image_url, category_id)
SELECT
    'Quần jeans nam',
    'Quần jeans cotton stretch 98% cotton 2% spandex, phom slim fit, màu xanh indigo wash, 5 túi cổ điển, bền bỉ và thoải mái cho mặc hàng ngày.',
    550000,
    'https://hips.hearstapps.com/hmg-prod/images/mhl-052324-jean-opener-2076-66acf6900d29d.jpg?crop=0.6668889629876625xw:1xh;center,top&resize=1200:*',
    c.id
FROM categories c
WHERE c.slug = 'thoi-trang'
  AND NOT EXISTS (
      SELECT 1
      FROM products p
      WHERE p.name = 'Quần jeans nam'
  );

INSERT INTO products (name, description, price, image_url, category_id)
SELECT
    'Áo khoác hoodie',
    'Áo khoác hoodie nỉ fleece cotton/poly blend, mũ trùm có dây rút, túi kangaroo lớn, in graphic tối giản, ấm áp và phong cách streetwear.',
    650000,
    'https://astraldesigns.com/cdn/shop/files/Astral-Logowear-F23-OGCElementsHoodie-SpaceBlack-2249_1500x.png?v=1701904680',
    c.id
FROM categories c
WHERE c.slug = 'thoi-trang'
  AND NOT EXISTS (
      SELECT 1
      FROM products p
      WHERE p.name = 'Áo khoác hoodie'
  );

INSERT INTO products (name, description, price, image_url, category_id)
SELECT
    'Giày sneaker',
    'Giày sneaker da tổng hợp cao cấp, đế phylon nhẹ với cushioning, upper knit thoáng khí, lưỡi gà padded, đa năng cho casual và hoạt động nhẹ.',
    750000,
    'https://paulevansny.com/cdn/shop/products/pau3359_092_a.jpg?v=1588715902&width=3000',
    c.id
FROM categories c
WHERE c.slug = 'giay-dep'
  AND NOT EXISTS (
      SELECT 1
      FROM products p
      WHERE p.name = 'Giày sneaker'
  );

INSERT INTO products (name, description, price, image_url, category_id)
SELECT
    'Quần short nữ',
    'Quần short nữ cotton twill mềm mại, cạp cao elastic với dây rút, phom relaxed fit, túi hai bên, lý tưởng cho mùa hè và outfit thoải mái.',
    350000,
    'https://m.media-amazon.com/images/I/61Sx250QMiL._AC_UY1000_.jpg',
    c.id
FROM categories c
WHERE c.slug = 'thoi-trang'
  AND NOT EXISTS (
      SELECT 1
      FROM products p
      WHERE p.name = 'Quần short nữ'
  );

INSERT INTO products (name, description, price, image_url, category_id)
SELECT
    'Váy midi',
    'Váy midi chiffon nhẹ nhàng in họa tiết floral, cổ V sâu, tay lỡ phồng, eo chiết ly tạo form, phù hợp dạo phố hoặc sự kiện semi-formal.',
    850000,
    'http://gilrodriguez.com/cdn/shop/products/Black-dropwaist-dress-1.jpg?v=1762457435&width=2048',
    c.id
FROM categories c
WHERE c.slug = 'thoi-trang'
  AND NOT EXISTS (
      SELECT 1
      FROM products p
      WHERE p.name = 'Váy midi'
  );

