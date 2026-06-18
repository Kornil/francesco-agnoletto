variable "domain_name" {
  description = "The domain name for the CloudFront distribution"
  type        = string
  default     = "francesco-agnoletto.com"
}

variable "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  type        = string
  default     = "E183VIHR915PJ2"
}

variable "cloudfront_distribution_arn" {
  description = "The ARN for the CloudFront distribution"
  type        = string
  default     = "arn:aws:cloudfront::168992393550:distribution/E183VIHR915PJ2"
}

variable "route53_validation_record" {
  type    = string
  default = "_c8a7c1bc50c730674e8faf8d639fa896.francesco-agnoletto.com."
}

variable "route53_CNAME_record" {
  type    = string
  default = "_9f4d49085d39212b8edaf27b6a3365a9.jkddzztszm.acm-validations.aws."
}
