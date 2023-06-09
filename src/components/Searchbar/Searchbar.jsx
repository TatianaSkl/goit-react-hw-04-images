import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, SearchForm, ButtonForm, ButtonLabel, InputForm } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText.trim() === '') {
      toast.error("Sorry, the search string can't be empty. Please try again.");
      return;
    }
    onSubmit(searchText);
    setSearchText('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonForm type="submit">
          <ButtonLabel>
            <AiOutlineSearch />
          </ButtonLabel>
        </ButtonForm>

        <InputForm
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchText}
        />
      </SearchForm>
    </Header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
