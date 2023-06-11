import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Item onClick={onOpenModal}>
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </Item>
      {showModal && <Modal url={largeImageURL} alt={tags} onClose={onCloseModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
