class ErrorMessage extends HTMLElement {
  // connect component
  connectedCallback() {
    this.innerHTML = `<ul>
        <h3>// Error</h3>
        <li>This page does not exist.</li>
        <li> Please check the URL and try again.</li>
      </ul>`;
  }
}

// register component
customElements.define("error-message", ErrorMessage);
