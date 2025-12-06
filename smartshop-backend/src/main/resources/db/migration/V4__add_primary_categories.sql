-- Seed primary categories for storefront filters
INSERT INTO categories (name, slug)
VALUES
    ('Điện thoại', 'dien-thoai'),
    ('Laptop', 'laptop'),
    ('Thời trang', 'thoi-trang'),
    ('Mỹ phẩm', 'my-pham'),
    ('Đồ gia dụng', 'do-gia-dung'),
    ('Thú cưng', 'thu-cung'),
    ('Đồng hồ', 'dong-ho'),
    ('Balo', 'balo'),
    ('Giày dép', 'giay-dep'),
    ('Sức khỏe', 'suc-khoe'),
    ('Thể thao', 'the-thao'),
    ('Khác', 'khac')
ON CONFLICT (slug) DO NOTHING;
