import { encode, decode } from '../encoder/index.js'

/**
 * Represents the Action Buttons Component.
 * @class
 * @extends HTMLElement
 */
class ActionButtonsComponent extends HTMLElement {
  /**
   * Creates an instance of ActionButtonsComponent.
   * @constructor
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <section>
        <button id="encodeButton" class="action-button" aria-label="Encode">Encode</button>
        <button id="decodeButton" class="action-button" aria-label="Decode">Decode</button>
        <button id="clearButton" class="action-button" aria-label="Clear">Clear</button>
      </section>
      <style>
        /* Your styles for the action buttons component */
      </style>
    `

    // Get references to the buttons within the Shadow DOM
    this.encodeButton = this.shadowRoot.querySelector('#encodeButton')
    this.decodeButton = this.shadowRoot.querySelector('#decodeButton')
    this.clearButton = this.shadowRoot.querySelector('#clearButton')

    // Add event listeners to the buttons
    this.encodeButton.addEventListener('click', () => this.encodeText())
    this.decodeButton.addEventListener('click', () => this.decodeText())
    this.clearButton.addEventListener('click', () => this.clear())
  }

  /**
   * Encodes the text and updates the output component.
   */
  encodeText() {
    // Retrieve input value from the input-component
    const inputElement = document.querySelector('input-component')
    const inputValue = inputElement.getInputValue()

    // Perform encoding
    const encodedValue = encode(inputValue)

    // Update the output component with the encoded value
    const outputElement = document.querySelector('output-component')
    console.assert(outputElement !== null, 'Output component is not found.')
    if (outputElement) {
      outputElement.setEncodedText(encodedValue.toString())
    }
  }

  /**
   * Decodes the text and updates the output component.
   */
  decodeText() {
    // Retrieve input value from the input-component
    const encodedText = document
      .querySelector('output-component')
      .shadowRoot.querySelector('#encodedText')
    console.assert(encodedText !== null, 'Encoded text element is not found.')

    const encodedTextValue = encodedText.textContent.trim()
    console.log('Encoded Text Value: ', encodedTextValue)

    // Split the encoded text into an array of encoded values
    const encodedValues = encodedTextValue
      .split(',')
      .map((value) => {
        const parsedValue = parseInt(value.trim(), 10)
        return isNaN(parsedValue) ? null : parsedValue
      })
      .filter((parsedValue) => parsedValue !== null)

    // Check if any values couldn't be parsed
    console.assert(
      encodedValues.length > 0,
      'No valid encoded values found in the encoded text.'
    )

    // Perform decoding
    const decodedValue = decode(encodedValues)

    // Update the output component with the decoded value
    const outputElement = document.querySelector('output-component')
    console.assert(outputElement !== null, 'Output component is not found.')
    if (outputElement) {
      outputElement.setDecodedText(decodedValue)
    }
  }

  /**
   * Clears the input and output components.
   */
  clear() {
    // Clear the input value in the input-component
    const inputElement = document.querySelector('input-component')
    console.assert(inputElement !== null, 'Input component is not found.')
    if (inputElement) {
      inputElement.clearInput()
    }

    // Clear the encoded and decoded values
    const outputElement = document.querySelector('output-component')
    console.assert(outputElement !== null, 'Output component is not found.')
    if (outputElement) {
      outputElement.setEncodedText('')
      outputElement.setDecodedText('')
    }
  }
}

customElements.define('action-buttons-component', ActionButtonsComponent)
