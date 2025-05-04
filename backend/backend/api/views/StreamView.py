import boto3
from django.http import StreamingHttpResponse, HttpResponse
from botocore.exceptions import ClientError
from django.http import JsonResponse
import re
import os
from django.conf import settings
from botocore.client import Config


def stream_mp3(request, filename):
    bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
    s3_key = f'tracks/{filename}'

    # Khởi tạo S3 client với AWS4-HMAC-SHA256
    s3 = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
        config=Config(signature_version='s3v4')
    )

    # Lấy thông tin Range từ header request nếu có
    range_header = request.headers.get('Range')
    range_match = None
    if range_header:
        range_match = re.match(r"bytes=(\d+)-(\d*)", range_header)

    try:
        if range_match:
            start = int(range_match.group(1))
            end = range_match.group(2)
            end = int(end) if end else None
            range_str = f"bytes={start}-" + (f"{end}" if end else "")

            # Lấy phần dữ liệu từ S3 theo range
            s3_obj = s3.get_object(
                Bucket=bucket_name, Key=s3_key, Range=range_str)
            stream = s3_obj['Body']
            content_length = s3_obj['ContentLength']

            # Trả về dữ liệu được stream theo Range
            response = StreamingHttpResponse(
                stream, status=206, content_type='audio/mpeg')
            response['Content-Range'] = f"bytes {start}-{start + content_length - 1}/{content_length}"
            response['Content-Length'] = str(content_length)
            response['Accept-Ranges'] = 'bytes'

        else:
            # Nếu không có range, trả về toàn bộ file
            s3_obj = s3.get_object(Bucket=bucket_name, Key=s3_key)
            stream = s3_obj['Body']
            content_length = s3_obj['ContentLength']

            # Trả về dữ liệu đầy đủ
            response = StreamingHttpResponse(stream, content_type='audio/mpeg')
            response['Content-Length'] = str(content_length)
            response['Accept-Ranges'] = 'bytes'

        # Thiết lập thông tin về filename
        response['Content-Disposition'] = f'inline; filename="{filename}"'
        return response

    except ClientError as e:
        # Nếu có lỗi, trả về thông báo lỗi với mã trạng thái 500 thay vì 404 để dễ dàng debug
        error_message = e.response.get('Error', {}).get(
            'Message', 'Lỗi không xác định')
        return HttpResponse(f"Lỗi: {error_message}", status=500)


# Hàm tạo pre-signed URL cho file
def generate_signed_url(file_key, expiration=420):  # 7 phút
    # Khởi tạo S3 client với AWS4-HMAC-SHA256
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
        config=Config(signature_version='s3v4')
    )

    url = s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': settings.AWS_STORAGE_BUCKET_NAME, 'Key': file_key},
        ExpiresIn=expiration
    )
    return url


# Hàm lấy URL của audio
def get_audio_url(request, filename):
    file_key = f"tracks/{filename}"
    signed_url = generate_signed_url(file_key)
    return JsonResponse({'url': signed_url})
