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
