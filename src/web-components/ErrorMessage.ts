class ErrorMessage extends HTMLElement {
  // connect component
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h3>// Error</h3>
        <ul>
          <li>This page does not exist.</li>
          <li> Please check the URL and try again.</li>
        </ul>
      </section>`;
  }
}

// register component
customElements.define("error-message", ErrorMessage);
