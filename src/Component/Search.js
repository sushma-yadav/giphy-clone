import React, { useEffect, useState } from 'react';
import '../Assets/css/search.css';
import logo from '../Assets/image/logo.png';

const Search = () => {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState('');
  const [heading, setHeading] = useState("Trending GIF's");
  const api = 'kETqp0gb0rG1eIlyarHHfNwSxKeZVegB';

  useEffect(() => {
    trendingData();
  }, []);
  const trendingData = () => {
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api}`)
      .then(res => res.json())
      .then(data => {
        setResult(data.data);
      });
  };
  const triggerSearch = e => {
    e.preventDefault();
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${input}&limit=10`
    )
      .then(res => res.json())
      .then(data => {
        setResult(data.data);
        setHeading('Search Results')
      });
     
  };
  const paginationResult = e => {
    const offset = e.target.innerHTML * 10;
    console.log(offset);
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${input}&limit=10&offset=${offset}`
    )
      .then(res => res.json())
      .then(data => {
        setResult(data.data);
      });
  };
  const paginationAllResult = () => {
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api}&q=${input}`
    )
      .then(res => res.json())
      .then(data => {
        setResult(data.data);
      });
  };
  return (
    <div className="search">
      <div className="search_bar">
        <div className="logo">
          <img src={logo} alt="" />
          
        </div>
        <div className="heading">
            <p>{heading}</p>
          </div>
        <form>
          <input
            type="text"
            placeholder="@username + tag to search a verified channel"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" onClick={triggerSearch} disabled={!input}>
            <img src="https://giphy.com/static/img/search-icon.svg" alt="" />
          </button>
        </form>
      </div>
      <div className="gif_container">
        {result.map(item => (
          <img
            src={item.images.downsized.url}
            alt=""
            height={`${item.images.downsized.height}px`}
            width={`${item.images.downsized.height}px`}
          />
        ))}
      </div>
      {input && (
        <div className="pagination">
          <button onClick={paginationResult}>1</button>
          <button onClick={paginationResult}>2</button>
          <button onClick={paginationResult}>3</button>
          <button onClick={paginationResult}>4</button>
          <button onClick={paginationResult}>5</button>
          <button onClick={paginationAllResult}>View All</button>
        </div>
      )}
    </div>
  );
};

export default Search;
