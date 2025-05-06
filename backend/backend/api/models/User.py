from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError

# Quản lý User


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, groups=None, **extra_fields):
        # Kiểm tra email
        if not email:
            raise ValidationError("Users must have an email address")
        email = self.normalize_email(email)  # Chuyển hóa email
        # Trạng thái tài khoản mặc định là active
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, username=username, **extra_fields)
        if password:
            user.set_password(password)  # Mã hóa mật khẩu nếu có
        else:
            raise ValidationError("Password is required for creating a user")

        user.save(using=self._db)

        # Nếu có nhóm (groups), gán cho user
        if groups:
            user.groups.set(groups)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        # Quản trị viên cần có quyền staff
        extra_fields.setdefault('is_staff', True)
        # Quản trị viên cần có quyền superuser
        extra_fields.setdefault('is_superuser', True)

        # Tạo user với các quyền của superuser
        return self.create_user(email, username, password, **extra_fields)

# Định nghĩa User Model


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    account_type = models.CharField(max_length=20, default='free', choices=[
                                    ('free', 'Free'), ('premium', 'Premium')])
    country = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='users/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    # Chỉ dùng groups để gán quyền từ nhóm
    groups = models.ManyToManyField('auth.Group', blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username
