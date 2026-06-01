# Francesco Agnoletto's portfolio

This project is a showcase of a full architecture, cloud, backend and frontend, using the most cost effective options while keeping low complexity. 

## Architecture overview

Frontend codebase -> push to GitHub -> trigger GitHub Actions -> push to private Amazon S3 bucket (zero API tokens, just OIDC scoped role) -> AWS CloudFront deployment.

## Frontend

Frontend is a zero-dependency web components and typescript project.

## Backend

Amazon S3 hosts a private bucket where the frontend bundle is uploaded.

## CI

CI uses GitHub actions to trigger a build of the frontend code as well as the deployment statistics generation. Both are then uploaded on Amazon S3.
