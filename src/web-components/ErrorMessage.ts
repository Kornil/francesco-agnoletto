class ErrorMessage extends HTMLElement {
  // connect component
  connectedCallback() {
    this.textContent =
      "This page does not exist. Please check the URL and try again.";
  }
}

// register component
customElements.define("error-message", ErrorMessage);
