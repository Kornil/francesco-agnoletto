class DeployStats extends HTMLElement {
  unsubscribe?: () => void;

  // connect component
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
    const { loading, error, stats } = appStore.getState().deploy;

    if (loading) {
      this.renderWrapper(`<li>loading...</li>`);
      return;
    }

    if (error) {
      this.renderWrapper(`<li>${error}</li>`);
      return;
    }

    if (!stats) {
      this.renderWrapper(`<li>no deploy data available</li>`);
      return;
    }

    this.renderWrapper(`
      <li>run: #${stats.runNumber}</li>
      <li>duration: ${stats.durationSeconds}s</li>
      <li>commit: 
        <a href="https://github.com/Kornil/francesco-agnoletto/commit/${stats.commit}" target="_blank">
          ${stats.commit.slice(0, 7)}
        </a>
      </li>
    `);
  }

  private renderWrapper(content: string) {
    this.innerHTML = `
      <section>
        <h3>// Deployment</h3>
        <h4>updated from GitHub Actions</h4>
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

// register component
customElements.define("deploy-stats", DeployStats);
