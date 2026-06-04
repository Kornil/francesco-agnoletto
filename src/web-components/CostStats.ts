import "../styles/deploy-stats.css";
import { formatCurrency } from "../utils/format";

class CostStats extends HTMLElement {
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
    const { loading, error, stats } = appStore.getState().cost;

    if (loading) {
      this.renderWrapper(`<li>loading...</li>`);
      return;
    }

    if (error) {
      this.renderWrapper(`<li>${error}</li>`);
      return;
    }

    if (!stats || stats.length === 0) {
      this.renderWrapper(`<li>no cost data available</li>`);
      return;
    }

    this.renderWrapper(`
      ${stats
        .map(
          (item) =>
            `<li>${item.service}: ${formatCurrency(Number(item.amount))}</li>`,
        )
        .join("")}
    `);
  }

  private renderWrapper(content: string) {
    this.innerHTML = `
      <div class="deploy-stats-wrapper">
        <ul>
          ${content}
        </ul>
      </div>
    `;
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }
}

customElements.define("cost-stats", CostStats);
