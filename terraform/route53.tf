data "aws_route53_zone" "francesco-agnoletto-zone" {
  name         = var.domain_name
  private_zone = false
}
