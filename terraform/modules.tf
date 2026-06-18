module "github-oidc" {
  source = "./modules/github-oidc"

  cloudwatch_lambda_arn       = aws_lambda_function.francesco-agnoletto-cloudwatch-metrics-lambda.arn
  cost_explorer_lambda_arn    = aws_lambda_function.francesco-agnoletto-cost-explorer-lambda.arn
  frontend_bucket_arn         = aws_s3_bucket.francesco-agnoletto-bucket.arn
  cloudfront_distribution_arn = module.hosting.aws_cloudfront_distribution_arn
}

module "hosting" {
  source = "./modules/hosting"

  bucket_regional_domain_name = aws_s3_bucket.francesco-agnoletto-bucket.bucket_regional_domain_name
}
