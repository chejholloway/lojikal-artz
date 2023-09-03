/**
 * Encodes a chunk of input text.
 *
 * @param {string} input - The input text to encode.
 * @returns {number} The encoded value.
 *
 */
function encodeString(input) {
  const characterCodes = input
    .padEnd(4, "\x00")
    .split("")
    .map((character) => character.charCodeAt(0));

  let encodedString = 0;

  for (let characters = 0; characters < 4; characters++) {
    for (let bits = 0; bits < 8; bits++) {
      encodedString |=
        ((characterCodes[characters] >> bits) & 1) << (bits * 4 + characters);
    }
  }

  return encodedString;
}

/**
 * Encodes a text into an array of encoded values.
 *
 * @param {string} text - The input text to encode.
 * @returns {number[]} Array of encoded values.
 *
 */
function encode(text) {
  const encodedValues = [];

  for (let i = 0; i < text.length; i += 4) {
    const chunk = text.slice(i, i + 4);
    encodedValues.push(encodeString(chunk));
  }

  return encodedValues;
}

/**
 * Decodes an array of encoded values into text.
 *
 * @param {number[]} encodedValues - Array of encoded values.
 * @returns {string} Decoded text.
 */
function decode(encodedValues) {
  const decodedTextChunks = []; // Initialize an array to store decoded chunks
  
  // Loop through each encoded value in the input array
  for (let i = 0; i < encodedValues.length; i++) {
    const encodedValue = encodedValues[i];
    const characterCodes = []; // Initialize an array to store character codes

    // Loop through each character in the chunk (4 characters per chunk)
    for (let characters = 0; characters < 4; characters++) {
      let characterCode = 0;

      // Loop through each bit in the character (8 bits per character)
      for (let bits = 0; bits < 8; bits++) {
        const bitPosition = bits * 4 + characters;
        const bitValue = (encodedValue >> bitPosition) & 1;
        characterCode |= bitValue << bits;
      }

      characterCodes.push(characterCode); // Store the character code
    }
	
    // Convert the character codes to characters and form a chunk
    const decodedChunk = String.fromCharCode(...characterCodes).replace(
      /\x00+$/,
      "",
    );

    decodedTextChunks.push(decodedChunk);
  }
  
  // Join all decoded chunks to form the final decoded text
  return decodedTextChunks.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const encodeButton = document.getElementById("encodeButton");
  const decodeButton = document.getElementById("decodeButton");
  const clearButton = document.getElementById("clearButton");
  
  const inputString = document.getElementById("inputString");
  const encodedText = document.getElementById("encodedText");
  const decodedText = document.getElementById("decodedText");
  
  let encodedValues = [];

  encodeButton.addEventListener("click", () => {
    const inputValue = inputString.value;
    const encoded = encode(inputValue);
	
    encodedValues = encoded;
    encodedText.textContent = encodedValues.join(", ");
  });

  decodeButton.addEventListener("click", () => {
    const decoded = decode(encodedValues);
	
    decodedText.textContent = decoded;
  });
  
  clearButton.addEventListener("click", () => {
    const decoded = decode(encodedValues);
	
    decodedText.textContent = "";
	encodedText.textContent = "";
	inputString.value = '';
  });  
});

/**
 * Tests the encoding function with example data.
 */
function testEncodeString() {
  const testData = [
    { string: "tacocat", encoded: 267487694 },
    { string: "never odd or even", encoded: 267657050 },
    { string: "lager, sir, is regal", encoded: 267394382 },
    {
      string: "go hang a salami, I'm a lasagna hog",
      encoded: 200319795,
    },
    {
      string: "egad, a base tone denotes a bad age",
      encoded: 267389735,
    },
  ];

  for (const data of testData) {
    const encoded = encodeString(data.string);
    console.assert(
      encoded === data.encoded,
      `Error: Encoded value for "${data.string}" does not match expected.`,
    );
  }
  console.log("All tests passed.");
}

// Uncomment to Run the tests
// testEncodeString();
