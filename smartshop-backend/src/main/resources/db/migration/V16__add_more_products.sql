-- Add more diverse products to the catalog
INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'iPad Pro 12.9"', 'Màn Liquid Retina XDR mini-LED, chip M4, camera TrueDepth, hỗ trợ Apple Pencil Pro và Magic Keyboard, 512GB storage.', 29990000, 25, 'ACTIVE',
       'https://www.apple.com/newsroom/images/2024/05/apple-unveils-stunning-new-ipad-pro-with-m4-chip-and-apple-pencil-pro/article/Apple-iPad-Pro-hero-240507_big.jpg.large_2x.jpg', c.id
FROM categories c WHERE c.slug = 'dien-thoai'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'iPad Pro 12.9"');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Samsung Galaxy Tab S9', 'Màn hình AMOLED 11 inch 120Hz, chip Snapdragon 8 Gen 2, S Pen đi kèm, pin 8400mAh sạc nhanh 45W.', 18990000, 30, 'ACTIVE',
       'https://images.samsung.com/is/image/samsung/p6pim/uk/2307/gallery/uk-galaxy-tab-s9-5g-x716-sm-x716bzabeub-thumb-537006154', c.id
FROM categories c WHERE c.slug = 'dien-thoai'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Samsung Galaxy Tab S9');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Lenovo ThinkPad X1 Carbon Gen 11', 'Intel Core i7-1365U, 16GB RAM, 512GB SSD, màn 14" WUXGA IPS, nhẹ 1.12kg, pin 57Wh.', 35990000, 20, 'ACTIVE',
       'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MzQ5NTgzfGltYWdlL3BuZ3xoYzEvaDdjLzE0NzgzNTc3MTkxNDU0LnBuZ3w0MTc0YjU3ZGI3YjM5ZDU3YzQ3YWNhMjEwMjM4MTk3NTU2ZGQzZTMyOTM5YzA2ZTJmYjQ2MDhjYzhjOWJiOGRi/lenovo-laptop-thinkpad-x1-carbon-gen-11-14-intel-hero.png', c.id
FROM categories c WHERE c.slug = 'laptop'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Lenovo ThinkPad X1 Carbon Gen 11');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'HP Pavilion Gaming', 'Ryzen 5 5600H, RTX 3050, 8GB RAM, 512GB SSD, màn 15.6" FHD 144Hz, tản nhiệt dual-fan.', 17990000, 35, 'ACTIVE',
       'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08259551.png', c.id
FROM categories c WHERE c.slug = 'laptop'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'HP Pavilion Gaming');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'AirPods Pro (2nd Gen)', 'Active Noise Cancellation, Adaptive Audio, chip H2, case sạc MagSafe với loa tìm kiếm, pin 6 giờ.', 6290000, 50, 'ACTIVE',
       'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'AirPods Pro (2nd Gen)');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Anker PowerCore 20,000mAh', 'Sạc dự phòng 20,000mAh, dual USB-A + USB-C PD 30W, PowerIQ technology, thiết kế nhỏ gọn.', 990000, 100, 'ACTIVE',
       'https://m.media-amazon.com/images/I/61IBzMAbekL.jpg', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Anker PowerCore 20,000mAh');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Logitech MX Master 3S', 'Chuột không dây MagSpeed scroll 8K dpi, kết nối đa thiết bị, pin 70 ngày, USB-C sạc nhanh.', 2490000, 60, 'ACTIVE',
       'https://resource.logitech.com/w_800,c_lpad,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1', c.id
FROM categories c WHERE c.slug = 'khac'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Logitech MX Master 3S');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Casio G-Shock GA-2100', 'Đồng hồ G-Shock octagonal case, chống nước 200m, điện kế kim + số, tuổi thọ pin 3 năm.', 3290000, 40, 'ACTIVE',
       'https://www.g-shock.eu/cdn/shop/files/GA-2100-1A1ER_6.jpg?v=1700497858', c.id
FROM categories c WHERE c.slug = 'dong-ho'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Casio G-Shock GA-2100');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Citizen Eco-Drive', 'Đồng hồ năng lượng ánh sáng, mặt sapphire chống xước, dây da thật, kháng nước 10ATM.', 7990000, 25, 'ACTIVE',
       'https://cdn11.bigcommerce.com/s-s8f93jk/images/stencil/1280w/products/30047/73829/BM7463-12A_3__03568.1715195524.jpg?c=2', c.id
FROM categories c WHERE c.slug = 'dong-ho'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Citizen Eco-Drive');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Adidas Ultraboost 23', 'Giày chạy Boost midsole với torsion system, upper Primeknit+, đế Continental rubber grip.', 4590000, 45, 'ACTIVE',
       'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8a6d3a48d76c4e3a8b74af3e00474e1a_9366/Ultraboost_Light_Shoes_Blue_GY9350_01_standard.jpg', c.id
FROM categories c WHERE c.slug = 'giay-dep'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Adidas Ultraboost 23');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Vans Old Skool', 'Giày sneaker classic canvas + suede, đế waffle, side stripe nổi bật, phong cách skate timeless.', 1890000, 80, 'ACTIVE',
       'https://images.vans.com/is/image/Vans/VN000D3HY28-HERO?wid=1600&hei=1984&fmt=jpeg&qlt=90&resMode=sharp2&op_usm=0.9,1.7,8,0', c.id
FROM categories c WHERE c.slug = 'giay-dep'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Vans Old Skool');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Uniqlo Áo sơ mi Oxford', 'Áo sơ mi cotton 100% Oxford weave, cổ button-down, phom regular fit, dễ ủi và giặt máy.', 590000, 120, 'ACTIVE',
       'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455379/item/goods_09_455379.jpg', c.id
FROM categories c WHERE c.slug = 'thoi-trang'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Uniqlo Áo sơ mi Oxford');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Quần kaki nam', 'Quần kaki cotton chino slim fit, túi chéo ẩn, đai thắt lưng, màu be/navy versatile cho văn phòng.', 490000, 100, 'ACTIVE',
       'https://m.media-amazon.com/images/I/61W6M8mqk7L._AC_UY1000_.jpg', c.id
FROM categories c WHERE c.slug = 'thoi-trang'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Quần kaki nam');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Đầm maxi nữ', 'Đầm dài maxi vải rayon mềm mát, cổ yếm hai dây, eo thun co giãn, họa tiết bohemian cho đi biển.', 750000, 60, 'ACTIVE',
       'https://i.etsystatic.com/26542966/r/il/57629f/5668806349/il_570xN.5668806349_4xtt.jpg', c.id
FROM categories c WHERE c.slug = 'thoi-trang'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Đầm maxi nữ');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Innisfree Green Tea Foam Cleanser', 'Sữa rửa mặt trà xanh Jeju, làm sạch sâu lỗ chân lông, cấp ẩm amino acid, pH 5.5 lành tính.', 190000, 150, 'ACTIVE',
       'https://www.innisfree.com/my/en/upload/product/48844/innisfree-green-tea-foam-cleanser-150ml-1.png', c.id
FROM categories c WHERE c.slug = 'my-pham'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Innisfree Green Tea Foam Cleanser');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'CeraVe Moisturizing Cream', 'Kem dưỡng ẩm ceramides + hyaluronic acid, công nghệ MVE giải phóng chậm, không gây mụn.', 390000, 100, 'ACTIVE',
       'https://m.media-amazon.com/images/I/71u9DvUOwzL.jpg', c.id
FROM categories c WHERE c.slug = 'my-pham'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'CeraVe Moisturizing Cream');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'La Roche-Posay Sunscreen SPF50+', 'Kem chống nắng broad-spectrum UVA/UVB, công thức mỏng nhẹ cho mọi loại da, kháng nước 40 phút.', 550000, 90, 'ACTIVE',
       'https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/america/us/products/anthelios/anthelios-melt-in-milk-sunscreen-spf-60/antheliosmeltinmilkspf60faceandboduysunscreenlotion5oz-front.jpg', c.id
FROM categories c WHERE c.slug = 'my-pham'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'La Roche-Posay Sunscreen SPF50+');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Lò vi sóng Sharp 20L', 'Lò vi sóng 20L công suất 800W, 8 chế độ nấu tự động, đĩa xoay thủy tinh, timer điện tử.', 2490000, 40, 'ACTIVE',
       'https://img.fptshop.com.vn/Uploads/Originals/2024/5/27/638523851033341327_lo-vi-song-sharp-20-lit-r-g225vn-s-1.jpg', c.id
FROM categories c WHERE c.slug = 'do-gia-dung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Lò vi sóng Sharp 20L');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Philips Nồi cơm điện 1.8L', 'Nồi cơm điện 1.8L lòng niêu ceramic chống dính, công nghệ 3D heating đều tăng, giữ ấm 24h.', 1790000, 55, 'ACTIVE',
       'https://images.philips.com/is/image/philipsconsumer/13e33f65e71f475db2ccaf4800da5729', c.id
FROM categories c WHERE c.slug = 'do-gia-dung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Philips Nồi cơm điện 1.8L');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Máy xay sinh tố Oster', 'Máy xay 600W cối thủy tinh 1.25L, lưỡi dao inox 6 cánh, 3 tốc độ + pulse, dễ tháo rời vệ sinh.', 1290000, 70, 'ACTIVE',
       'https://m.media-amazon.com/images/I/71THUEbZjEL.jpg', c.id
FROM categories c WHERE c.slug = 'do-gia-dung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Máy xay sinh tố Oster');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Royal Canin Puppy Food', 'Thức ăn hạt cho chó con, giàu DHA từ dầu cá, prebiotics hỗ trợ tiêu hóa, viên nhỏ dễ nhai.', 890000, 80, 'ACTIVE',
       'https://www.royalcanin.com/ph/~/media/Royal-Canin-Philippines/Product-Categories/Dog/DogPuppy-Wet-Pouch/PUPPY-Wet-Product-page-image.ashx', c.id
FROM categories c WHERE c.slug = 'thu-cung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Royal Canin Puppy Food');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Kong Classic Toy', 'Đồ chơi cao su tự nhiên cho chó, độ bền cao, có thể nhồi snack bên trong, massage nướu răng.', 290000, 120, 'ACTIVE',
       'https://kongcompany.com/cdn/shop/files/KONG_Classic_Red_1200x1200_f6fcb1fb-e2a2-400d-80f3-13f4f7c653be.png', c.id
FROM categories c WHERE c.slug = 'thu-cung'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Kong Classic Toy');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Optimum Nutrition Whey Protein', 'Whey protein isolate 24g per serving, BCAAs, nhanh hấp thu sau tập, hương vani/chocolate.', 1590000, 50, 'ACTIVE',
       'https://m.media-amazon.com/images/I/71jYFi-XHZL.jpg', c.id
FROM categories c WHERE c.slug = 'suc-khoe'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Optimum Nutrition Whey Protein');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Nature Made Omega-3', 'Viên dầu cá Omega-3 EPA/DHA 1000mg, hỗ trợ tim mạch và não bộ, không mùi tanh.', 690000, 80, 'ACTIVE',
       'https://m.media-amazon.com/images/I/81Hkt5AzgLL.jpg', c.id
FROM categories c WHERE c.slug = 'suc-khoe'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Nature Made Omega-3');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Tạ tay cao su 5kg (đôi)', 'Tạ tay bọc cao su 2x5kg, grip chống trượt, compact cho tập bicep curl và shoulder press tại nhà.', 450000, 60, 'ACTIVE',
       'https://m.media-amazon.com/images/I/61mqxLuFM6L.jpg', c.id
FROM categories c WHERE c.slug = 'the-thao'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Tạ tay cao su 5kg (đôi)');

INSERT INTO products (name, description, price, stock, status, image_url, category_id)
SELECT 'Dây kháng lực tập gym', 'Bộ 5 dây kháng lực latex tự nhiên các mức độ, có tay cầm và móc cửa, kèm túi đựng.', 350000, 100, 'ACTIVE',
       'https://m.media-amazon.com/images/I/71J6Y7j4VTL._AC_SL1500_.jpg', c.id
FROM categories c WHERE c.slug = 'the-thao'
AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Dây kháng lực tập gym');
