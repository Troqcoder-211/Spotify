from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from api.serializers.UserSerializer import UserSerializer
from api.models.User import User


class AuthView(APIView):
    permission_classes = [AllowAny]

    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "success": True,
                "message": "Đăng kí thành công",
                "data": {
                    "user": UserSerializer(user).data
                }
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "message": "Dữ liệu không hợp lệ",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            # Chỉ trả về thông báo lỗi chung
            return Response({
                "success": False,
                "message": "Email hoặc mật khẩu không đúng"
            }, status=status.HTTP_401_UNAUTHORIZED)

        # Token
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "message": "Đăng nhập thành công",
            "data": {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }
        }, status=status.HTTP_200_OK)

    def refresh_token(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({
                "success": False,
                "message": "Thiếu refresh token"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)
            return Response({
                "success": True,
                "message": "Làm mới access token thành công",
                "data": {
                    "access": access,
                    "refresh": str(refresh)
                }
            }, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({
                "success": False,
                "message": "Refresh token không hợp lệ hoặc đã hết hạn",
                "error": str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        action = kwargs.get("action")

        if action == "register":
            return self.register(request)
        elif action == "login":
            return self.login(request)
        elif action == "refresh":
            return self.refresh_token(request)
        else:
            return Response({
                "success": False,
                "message": "Hành động không hợp lệ"
            }, status=status.HTTP_400_BAD_REQUEST)
