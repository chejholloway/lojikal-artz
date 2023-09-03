class OutputComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <section>
        <h4>Encoded Text:</h4>
        <div id="encodedText" aria-live="polite" aria-label="Encoded Text"></div>
        <h4>Decoded Text:</h4>
        <div id="decodedText" aria-live="polite" aria-label="Decoded Text"></div>
      </section>
    `
  }

  setEncodedText(content) {
    const encodedTextElement = this.shadowRoot.querySelector('#encodedText')
    encodedTextElement.textContent = content
  }

  setDecodedText(content) {
    const decodedTextElement = this.shadowRoot.querySelector('#decodedText')
    decodedTextElement.textContent = content
  }
}

customElements.define('output-component', OutputComponent)
