variable "domain_name" {
  description = "The domain name for the CloudFront distribution"
  type        = string
  default     = "francesco-agnoletto.com"
}

variable "bucket_regional_domain_name" {
  type = string
}
