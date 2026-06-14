resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]
}

// github-action-deploy-cloudwatch
resource "aws_iam_role_policy" "github-action-deploy-cloudwatch-metrics" {
  name = "github-action-deploy-cloudwatch-metrics"
  role = aws_iam_role.github-action-deploy-cloudwatch-metrics.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid : "UpdateSpecificLambda",
        Effect : "Allow",
        Action : [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction"
        ],
        Resource : aws_lambda_function.francesco-agnoletto-cloudwatch-metrics-lambda.arn
      }
    ]
  })
}

resource "aws_iam_role" "github-action-deploy-cloudwatch-metrics" {
  name = "github-action-deploy-cloudwatch-metrics"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:Kornil/francesco-agnoletto:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

// github-action-deploy-cost-explorer
resource "aws_iam_role_policy" "github-action-deploy-cost-explorer" {
  name = "github-action-deploy-cost-explorer"
  role = aws_iam_role.github-action-deploy-cost-explorer.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid : "UpdateSpecificLambda",
        Effect : "Allow",
        Action : [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction"
        ],
        Resource : aws_lambda_function.francesco-agnoletto-cost-explorer-lambda.arn
      }
    ]
  })
}

resource "aws_iam_role" "github-action-deploy-cost-explorer" {
  name = "github-action-deploy-cost-explorer"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:Kornil/francesco-agnoletto:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

// github-action-deploy-frontend
resource "aws_iam_role_policy" "github-action-deploy-francesco-agnoletto-com" {
  name = "github-actions-deploy-francesco-agnoletto.com"
  role = aws_iam_role.github-action-deploy-francesco-agnoletto-com.id

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Sid : "BucketAccess",
        Effect : "Allow",
        Action : [
          "s3:ListBucket"
        ],
        Resource : aws_s3_bucket.francesco-agnoletto-bucket.arn
      },
      {
        Sid : "ObjectAccess",
        Effect : "Allow",
        Action : [
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObject"
        ],
        Resource : "${aws_s3_bucket.francesco-agnoletto-bucket.arn}/*"
      },
      {
        Effect : "Allow",
        Action : [
          "cloudfront:CreateInvalidation"
        ],
        Resource : var.cloudfront_distribution_arn
      }
    ]
  })
}

resource "aws_iam_role" "github-action-deploy-francesco-agnoletto-com" {
  name = "github-action-deploy-francesco-agnoletto.com"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:Kornil/francesco-agnoletto:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

