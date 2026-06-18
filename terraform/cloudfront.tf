resource "aws_cloudfront_origin_access_control" "frontend" {
  name = "francesco-agnoletto-bucket-oac"

  origin_access_control_origin_type = "s3"

  signing_behavior = "always"
  signing_protocol = "sigv4"
}

resource "aws_cloudfront_function" "redirect_to_html" {
  name    = "redirect-to-html"
  runtime = "cloudfront-js-2.0"
  code    = file("${path.module}/cloudfront-functions/redirect-to-html.js")
  publish = false
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "francesco-agnoletto" {
  enabled             = true
  default_root_object = "index.html"
  is_ipv6_enabled     = true
  web_acl_id          = aws_wafv2_web_acl.cloudfront.arn

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 404
    response_page_path    = "/error.html"
  }
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 404
    response_page_path    = "/error.html"
  }

  origin {
    domain_name                 = aws_s3_bucket.francesco-agnoletto-bucket.bucket_regional_domain_name
    origin_id                   = "frontend-s3"
    origin_access_control_id    = aws_cloudfront_origin_access_control.frontend.id
    response_completion_timeout = 0
  }

  default_cache_behavior {
    target_origin_id = "frontend-s3"
    cache_policy_id  = data.aws_cloudfront_cache_policy.caching_optimized.id
    compress         = true

    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = [
      "GET",
      "HEAD"
    ]

    cached_methods = [
      "GET",
      "HEAD"
    ]

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect_to_html.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [
    var.domain_name,
  ]

  depends_on = [
    aws_acm_certificate_validation.francesco_agnoletto
  ]

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.francesco_agnoletto.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
