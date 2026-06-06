import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
} from "@aws-sdk/client-cost-explorer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { formatDate } from "./utils/format";

const client = new CostExplorerClient({
  region: "us-east-1",
});
const s3 = new S3Client({ region: "us-east-1" });

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), 1);
const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

export const handler = async () => {
  try {
    const commandParams: GetCostAndUsageCommandInput = {
      TimePeriod: {
        Start: formatDate(start),
        End: formatDate(end),
      },
      Metrics: ["UnblendedCost"],
      Granularity: "MONTHLY",
      GroupBy: [
        {
          Type: "DIMENSION",
          Key: "SERVICE",
        },
      ],
    };

    // reconsider adding tag-based filtering if needed in the future
    /* if (process.env.TAG_VALUE) {
      commandParams.Filter = {
        Tags: {
          Key: process.env.TAG_KEY,
          Values: [process.env.TAG_VALUE],
        },
      };
    } */

    const cost = await client.send(new GetCostAndUsageCommand(commandParams));

    const data = {
      serviceBreakdown:
        cost.ResultsByTime?.[0]?.Groups?.map((group) => ({
          service: group.Keys?.[0] ?? "Unknown",
          amount: group.Metrics?.UnblendedCost?.Amount,
          unit: group.Metrics?.UnblendedCost?.Unit,
        })) ?? [],
    };

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `data/cost-metrics.json`,
        Body: JSON.stringify(data),
        ContentType: "application/json",
        CacheControl: "max-age=86400, must-revalidate",
      }),
    );

    return data;
  } catch (error) {
    return error;
  }
};
