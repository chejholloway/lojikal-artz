class InputComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        #inputString {
          margin-bottom: 1rem;
        }
      </style>
      <section>
        <label for="inputString">Enter a String:</label>
        <input type="text"
               id="inputString"
               aria-label="Input String"
               placeholder="Enter a String..." />
      </section>
    `

    // Get a reference to the input element within the Shadow DOM
    this.inputElement = this.shadowRoot.querySelector('#inputString')
  }

  getInputValue() {
    // Return the current value of the input element
    return this.inputElement.value
  }

  clearInput() {
    // Clear the input element
    this.inputElement.value = ''
  }
}

customElements.define('input-component', InputComponent)
