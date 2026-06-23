import { formatCurrency } from "../utils/format";

const selectors: string[] = [
  "[data-hosted-zone]",
  "[data-aws-cost-explorer]",
  "[data-cloudwatch]",
  "[data-s3]",
  "[data-lambda]",
  "[data-cloudfront]",
];

export function initCostStats() {
  const root = document.querySelector("[data-cost-stats]");
  if (!root) return;

  const appStore = window.appStore;
  if (!appStore) {
    setError(root);
    return;
  }

  const render = () => {
    const appStore = window.appStore;
    const { loading, error, stats } = appStore.getState().cost;

    if (loading) {
      setLoading(root);
      return;
    }

    if (error) {
      setError(root);
      return;
    }

    if (!stats || stats.length === 0) {
      setError(root);
      return;
    }

    selectors.map(
      (selector, index) =>
        (root.querySelector(selector)!.textContent =
          `${stats[index].service}: ${formatCurrency(Number(stats[index].amount))}`),
    );
  };

  render();

  appStore.subscribe(render);
}

function setLoading(root: Element) {
  selectors.map(
    (selector) => (root.querySelector(selector)!.textContent = "loading..."),
  );
}

function setError(root: Element) {
  selectors.map(
    (selector) =>
      (root.querySelector(selector)!.textContent = "not available."),
  );
}
