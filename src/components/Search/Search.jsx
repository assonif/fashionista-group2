import React from 'react';
import { useState, useEffect } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import './Search.scss';
import ProductResults from '../ProductResults';

import { useCart } from '../../hooks/cart';

const Search = ({ show }) => {
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState('');
  const API_URL = 'https://undefined.netlify.app/api/catalog';

  const { openSearch } = useCart();

  function handleChange(event) {
    setSearched(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (searched !== '') {
        const resultFiltered = result.filter((element) =>
          element.name.startsWith(searched.toUpperCase())
        );
        setProducts(resultFiltered);
      } else {
        setProducts(result);
      }
    }
    fetchData();
  });

  return (
    <>
      {show && (
        <div className="drawer">

          <header className="drawer__header">
            <div className="app__container">
              <div className="header__context">
                <div className="header__icons">
                <FiArrowLeft 
                  size={25}
                  onClick={() => openSearch()}
                  />
                </div>
                <div className="header__title">Buscar produtos</div>
              </div>
            </div>
          </header>

          <div className="drawer__content">
            <div className="search">
              <div className="search__form">
                <form>
                  <input
                    type="text"
                    className="search__input"
                    placeholder="Buscar por produto..."
                    value={searched}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <ProductResults searched={searched} products={products} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
