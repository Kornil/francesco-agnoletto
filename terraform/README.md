# Terraform infrastructure overview

This folder contains Terraform configuration for the project infrastructure deployed into a single AWS account/region.

All policies and roles have been set up to be as granular as possible following the principle of least responsability.

The config includes an s3 backend for remote state storage.

#### The configuration provisions the following resources:

- **S3**: A bucket for the frontend site with its own private access configuration allowing cloudfront only.
- **lambda-cloudwatch.tf lambda-cost-explorer.tf**: Two scheduled Lambdas, definitions and IAM policies are in the respective files.
	- CloudWatch metrics exporter (`cloudwatch-metrics-lambda`) — hourly.
	- Cost Explorer metrics exporter (`cost-explorer-lambda`) — daily.
- **eventBridge.tf**: Scheduled triggers to invoke the Lambdas.
- **aws-iam-openid-connect-provider.tf**: An OpenID Connect provider and roles to allow GitHub Actions to deploy Lambdas and the frontend.
- **route53.tf**: Uses an existing hosted zone for the configured domain name (lookup).
