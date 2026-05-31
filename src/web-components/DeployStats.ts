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
      if (stats && stats.deployedAt) {
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
      this.innerHTML = `<p>${this.error}</p>`;
      return;
    }

    if (this.loading) {
      this.innerHTML = `<p>loading deployments…</p>`;
      return;
    }

    const appStore = window.appStore;
    const stats = appStore?.getState().deploy;

    if (!stats) {
      this.innerHTML = `<p>no data.</p>`;
      return;
    }

    this.innerHTML = `
      <ul>
        <li>deploy #${stats.runNumber}</li>
        <li>${new Date(stats.deployedAt).toLocaleString()}</li>
        <li>completed in ${stats.durationSeconds}s</li>
      </ul>
    `;
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }
}

// register component
customElements.define("deploy-stats", DeployStats);
