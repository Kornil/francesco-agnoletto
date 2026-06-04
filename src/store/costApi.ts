import { dispatch, actions } from "./index";
import type { CostBreakdownItem } from "./types";

const servicesDictionary: Record<string, string> = {
  "Amazon Simple Storage Service": "S3",
  "AWS Lambda": "lambda",
  "CloudFront Flat-Rate Plans": "cloudfront (flat-rate)",
  AmazonCloudWatch: "cloudwatch",
  "AWS Cost Explorer": "AWS cost explorer",
};

export async function loadCostMetrics(): Promise<void> {
  dispatch(actions.setCostLoading(true));
  dispatch(actions.setCostError(null));

  try {
    const response = await fetch("/data/cost-metrics.json");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const payload = (await response.json()) as {
      serviceBreakdown: CostBreakdownItem[];
    };
    const stats = payload.serviceBreakdown
      .filter((item) => !!servicesDictionary[item.service])
      .map((item) => ({
        service: servicesDictionary[item.service],
        amount: String(item.amount),
      }));
    dispatch(actions.setCostStats(stats));
  } catch (error) {
    dispatch(
      actions.setCostError(
        error instanceof Error ? error.message : String(error),
      ),
    );
  } finally {
    dispatch(actions.setCostLoading(false));
  }
}
