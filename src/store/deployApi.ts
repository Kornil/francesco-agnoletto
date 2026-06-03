import { dispatch, actions } from "./index";
import type { DeployStats } from "./types";

export async function loadDeployStats(): Promise<void> {
  dispatch(actions.setDeployLoading(true));
  dispatch(actions.setDeployError(null));

  try {
    const response = await fetch("/data/deploy-stats.json");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const stats: DeployStats = await response.json();
    dispatch(actions.setDeployStats(stats));
  } catch (error) {
    dispatch(
      actions.setDeployError(
        error instanceof Error ? error.message : String(error),
      ),
    );
  } finally {
    dispatch(actions.setDeployLoading(false));
  }
}
