import "../styles/deploy-stats.css";

class DeployStats extends HTMLElement {
  unsubscribe?: () => void;
  loading = true;
  error: string | null = null;

  // connect component
  connectedCallback() {
    const appStore = window.appStore;
    if (!appStore) {
      this.error = "Store not available";
      this.loading = false;
      this.renderContent();
      return;
    }

    fetch("/stats.json")
      .then((r) => r.json())
      .then((stats) => {
        appStore.dispatch(appStore.actions.setDeployStats(stats));
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
        this.renderContent();
        return;
      });

    const updateView = () => {
      const stats = appStore.getState().deploy;

      // Check if we have valid data
      if (stats && stats.commit) {
        this.loading = false;
        this.error = null;
      } else {
        this.loading = true;
      }

      this.renderContent();
    };

    updateView();
    this.unsubscribe = appStore.subscribe(updateView);
  }

  private renderContent() {
    if (this.error) {
      this.renderWrapper(`<li>${this.error}</li>`);
      return;
    }

    if (this.loading) {
      this.renderWrapper(`<li>loading...</li>`);
      return;
    }

    const appStore = window.appStore;
    const stats = appStore?.getState().deploy;

    if (!stats) {
      this.renderWrapper(`<li>no data.</li>`);
      return;
    }

    this.renderWrapper(`
      <li>deploy #${stats.runNumber}</li>
      <li>completed in ${stats.durationSeconds}s</li>
      <li>
        <a href="https://github.com/Kornil/francesco-agnoletto/commit/${stats.commit}" target="_blank">${stats.commit.slice(0, 7)}</a>
      </li>
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

// register component
customElements.define("deploy-stats", DeployStats);
