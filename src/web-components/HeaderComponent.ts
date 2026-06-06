class HeaderComponent extends HTMLElement {
  // connect component
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Francesco Agnoletto</h1>
        <ul>
          <li>
            <a href="https://github.com/Kornil" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">github</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/in/francesco-agnoletto-176171114/" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">linkedin</a>
          </li>
        </ul>
      </header>
    `;
  }
}

// register component
customElements.define("header-component", HeaderComponent);
