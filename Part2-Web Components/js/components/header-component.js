/**
 * A custom header component for displaying a title.
 * @extends HTMLElement
 */
class HeaderComponent extends HTMLElement {
  /**
   * Creates an instance of HeaderComponent.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.text = '32 Bit Text Encoding and Decoding' // Default text value

    // Define the component's shadow DOM structure
    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          text-align: center;
        }
      </style>
      <header>
        <h1>${this.text}</h1>
      </header>
    `
  }

  /**
   * Get the current text value of the header.
   * @returns {string} The current text value.
   */
  getText() {
    return this.text
  }

  /**
   * Set the text content of the header.
   * @param {string} text - The new text content.
   */
  setText(text) {
    this.text = text || '' // Ensure text is not undefined or null
    this.shadowRoot.querySelector('h1').textContent = this.text
  }
}

customElements.define('header-component', HeaderComponent)
