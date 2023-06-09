import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { Container, Searchbar, Loader, ImageGallery, ErrorMessage, Button } from 'components';
import { fetchGallery } from '../../service/gallery-api';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (page !== 1 || searchText !== '') {
        setIsLoading(true);
        try {
          const response = await fetchGallery({ searchText, page });
          if (response.hits.length === 0) {
            throw new Error(`Sorry, no photo from ${searchText}!`);
          }
          setImages(prevImages => [...prevImages, ...response.hits]);
          setTotalPages(Math.ceil(response.totalHits / 12));
          setError(null);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [searchText, page]);

  const handleSearch = searchText => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreButton = images.length !== 0 && page < totalPages;
  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {showLoadMoreButton && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};
