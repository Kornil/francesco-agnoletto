import { dispatch, actions } from "./index";
import type { CloudfrontMetrics } from "./types";

export async function loadCloudfrontMetrics(): Promise<void> {
  dispatch(actions.setMetricsLoading(true));
  dispatch(actions.setMetricsError(null));

  try {
    const response = await fetch("/data/cloudfront-metrics.json");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const stats = (await response.json()) as CloudfrontMetrics;
    dispatch(actions.setMetricsStats(stats));
  } catch (error) {
    dispatch(
      actions.setMetricsError(
        error instanceof Error ? error.message : String(error),
      ),
    );
  } finally {
    dispatch(actions.setMetricsLoading(false));
  }
}
