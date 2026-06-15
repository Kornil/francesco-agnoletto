terraform {
  backend "s3" {
    bucket       = "francesco-agnoletto-terraform-state-168992393550-us-east-1-an"
    key          = "terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
