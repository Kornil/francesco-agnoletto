data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_s3_bucket" "francesco-agnoletto-bucket" {
  bucket           = format("francesco-agnoletto-frontend.com-%s-%s-an", data.aws_caller_identity.current.account_id, data.aws_region.current.region)
  bucket_namespace = "account-regional"
}

resource "aws_s3_bucket_public_access_block" "francesco-agnoletto-bucket-public-access-block" {
  bucket = aws_s3_bucket.francesco-agnoletto-bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "francesco-agnoletto-bucket-policy" {
  bucket = aws_s3_bucket.francesco-agnoletto-bucket.id

  policy = jsonencode({
    Version = "2008-10-17"
    Id : "PolicyForCloudFrontPrivateContent",

    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"

        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        Action = "s3:GetObject"

        Resource = "${aws_s3_bucket.francesco-agnoletto-bucket.arn}/*"

        Condition = {
          ArnLike = {
            "AWS:SourceArn" = module.hosting.aws_cloudfront_distribution_arn
          }
        }
      }
    ]
  })
}
