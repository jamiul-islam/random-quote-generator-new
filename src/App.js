import React, { useState, useEffect } from "react";
import "./App.scss";
import QuoteBox from "./Components/QuoteBox.component";
import Spinner from "react-bootstrap/Spinner";

const quotesURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colorsArray = [
  "4FC1FF",
  "16a085",
  "27ae60",
  "2c3e50",
  "f39c12",
  "e74c3c",
  "9b59b6",
  "FB6964",
  "342224",
  "472E32",
  "BDBB99",
  "77B1A9",
  "73A857",
];

const randomArrVal = (arr) => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  async function fetchData() {
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [url]);
  return data;
};

function App() {
  const [sameColor, setSameColor] = useState("#4FC1FF");
  const quotes = useFetch(quotesURL);
  const [currentQuote, setCurrentQuote] = useState({ author: "", quote: "" });

  useEffect(() => {
    if (quotes) {
      handleNewQuote();
    }
  }, [quotes]);

  const handleNewQuote = () => {
    setSameColor(`#${randomArrVal(colorsArray)}`);
    let quoteArr = quotes.quotes;
    setCurrentQuote(randomArrVal(quoteArr));
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: `${sameColor}`, color: `${sameColor}` }}
    >
      {currentQuote.quote === "" ? (
        <Spinner
          animation="grow"
          className="loading-spinner"
          role="status"
          variant="light"
        >
          <span className="sr-only">loading</span>
        </Spinner>
      ) : (
        <QuoteBox
          accentColor={sameColor}
          currentQuote={currentQuote}
          handleNewQuote={handleNewQuote}
        />
      )}
    </div>
  );
}

export default App;
