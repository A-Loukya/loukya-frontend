import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://bajajtask-loukya.vercel.app/bfhl",
        parsedData
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Invalid JSON or API error", error);
      alert("Please enter a valid JSON or check the API.");
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      e.target.checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="response">
        {selectedOptions.includes("numbers") && (
          <div>
            <h3>Numbers</h3>
            <p>{response.numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("alphabets") && (
          <div>
            <h3>Alphabets</h3>
            <p>{response.alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("highest_lowercase_alphabet") && (
          <div>
            <h3>Highest Lowercase Alphabet</h3>
            <p>{response.highest_lowercase_alphabet.join(", ")}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON like { "data": ["A", "C", "z"] }'
          rows={6}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="options">
          <h2>Select Options to Display:</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
