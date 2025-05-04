# 🎵 Spotify Backend

## 🛠 Hướng dẫn cài đặt

### Bước 1: Di chuyển vào thư mục backend
```bash

cd spotify/backend

```
### Bước 2: Tạo môi trường ảo
```bash

pip install virtualenv
python -m venv venv

```
### Bước 3: Kích hoạt môi trường ảo (Windows)
```bash

venv\Scripts\activate

```
### Bước 4: Cập nhật pip
```bash

python.exe -m pip install --upgrade pip

```
### Bước 5: Cài đặt các thư viện từ requirements.txt
```bash

pip install -r requirements.txt

```
### Bước 6: Cấu hình file môi trường
- Tạo .env
- Copy file .env.example sang .env
- Sau đó, cập nhật các biến sau:

SECRET_KEY

DEBUG

DATABASE_URL

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

AWS_STORAGE_BUCKET_NAME

💡 Nếu bạn dùng S3 để lưu trữ media/static, hãy tham khảo tài liệu cấu hình S3 của Django hoặc hỏi ChatGPT.

### Bước 7: Di chuyển vào thư mục dự án Django
```bash

cd backend

```
### Bước 8: 🚀 Chạy server
```bash

python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8888

```

✅ Yêu cầu hệ thống
   - Python 3.8+
   - pip

📁 Cấu trúc thư mục (tham khảo)
- Spotify/backend/
  └──────── backend/
           
            ├── backend/             # Django project

            ├── api/                 # Ứng dụng chính
            
            ├── venv/                # Môi trường ảo
            
            ├── requirements.txt     # Danh sách thư viện
            
            ├── .env.example         # Mẫu file môi trường
            
            └── README.md            # File hướng dẫn này