/**
 * Represents the Footer Component.
 * @class
 * @extends HTMLElement
 */
class FooterComponent extends HTMLElement {
  /**
   * Creates an instance of FooterComponent.
   * @constructor
   * @param {string} [textContent=''] - The text content for the footer.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.text = '© 2023 Made with ❤️ by Che\' J. Holloway'
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          background-color: black;
          color: white;
          text-align: center;
        }
      </style>
      <footer>
        <p>${this.text}</p>
      </footer>
    `

    // Ensure that text is a string
    console.assert(
      typeof text === 'string',
      'Footer text must be a string.'
    )

    // Set the text content for the footer
    this.setFooterText(text)
  }

  /**
   * Sets the text content for the footer.
   * @param {string} text - The text content to set.
   */
  setFooterText(textContent) {
    const footerElement = this.shadowRoot.querySelector('footer p')
    console.assert(footerElement !== null, 'Footer element is not found.')
    if (footerElement) {
      footerElement.textContent = text
    }
  }
}

customElements.define('footer-component', FooterComponent)
