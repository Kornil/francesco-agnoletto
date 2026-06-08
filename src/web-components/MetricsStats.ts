import { formatBytes, formatPercentage } from "../utils/format";

class MetricsStats extends HTMLElement {
  unsubscribe?: () => void;

  connectedCallback() {
    const appStore = window.appStore;
    if (!appStore) {
      this.renderWrapper(`<li>Store not available</li>`);
      return;
    }

    const updateView = () => {
      this.renderContent();
    };

    updateView();
    this.unsubscribe = appStore.subscribe(updateView);
  }

  private renderContent() {
    const appStore = window.appStore;
    const { loading, error, stats } = appStore.getState().metrics;

    if (loading) {
      this.renderWrapper(`<li>loading...</li>`);
      return;
    }

    if (error) {
      this.renderWrapper(`<li>${error}</li>`);
      return;
    }

    if (!stats) {
      this.renderWrapper(`<li>no metrics data available</li>`);
      return;
    }

    this.renderWrapper(`
      <li>requests/month: ${stats.requests}</li>
      <li>bandwidth/month: ${formatBytes(stats.bandwidth)}</li>
      <li>cache hit rate: ${formatPercentage(stats.cacheHitRate)}</li>
      <li>origin latency: ${stats.originLatency.toFixed(2)}ms</li>
      <li>availability: ${formatPercentage(stats.availability)}</li>
    `);
  }

  private renderWrapper(content: string) {
    this.innerHTML = `
      <section>
        <h3>// Metrics</h3>
        <h4>updated hourly from Amazon CloudWatch</h4>
        <ul>
          ${content}
        </ul>
      </section>
    `;
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }
}

customElements.define("metrics-stats", MetricsStats);
