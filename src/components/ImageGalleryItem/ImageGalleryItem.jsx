import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <Item onClick={toggleModal}>
      <Image src={webformatURL} alt={tags} loading="lazy" />

      {showModal && <Modal url={largeImageURL} alt={tags} onClose={toggleModal} />}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
