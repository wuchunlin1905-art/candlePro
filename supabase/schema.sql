-- Lumière 网站数据库初始化脚本
-- 在 Supabase Dashboard → SQL Editor 中运行此脚本

-- 页面图片表
CREATE TABLE IF NOT EXISTS site_images (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('hero', 'gallery', 'product', 'about')),
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  scent TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 Row Level Security
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 公开读取（任何人可浏览网站）
CREATE POLICY "Public read site_images" ON site_images FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- 仅登录用户可写入（管理员）
CREATE POLICY "Auth write site_images" ON site_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write products" ON products FOR ALL USING (auth.role() = 'authenticated');

-- 创建图片存储桶（如果不存在，也可在 Dashboard → Storage 手动创建）
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 存储桶策略：公开读取
CREATE POLICY "Public read site-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

-- 存储桶策略：登录用户可上传
CREATE POLICY "Auth upload site-assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update site-assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete site-assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');
