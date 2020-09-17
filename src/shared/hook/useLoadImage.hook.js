import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loaderSVG from 'shared/images/puff.svg';

export const loadImage = name => import(`shared/images/${name}`);

const Loading = () => (
  <img style={{ position: 'absolute', transform: 'translate(-50%,-50%)', left: '50%', top: '50%' }} src={loaderSVG} alt="loading..." />
);

export const useLoadImage = ({ name, loadImageFn = loadImage, initState = null }) => {
  const [stateimage, setStateImage] = useState(initState);

  useEffect(() => {
    if (stateimage === null) {
      loadImageFn(name)
        .then(image => setStateImage(image.default))
        .catch(error => setStateImage(error));
    }
  }, [stateimage, loadImageFn, name]);

  return { stateimage, setStateImage };
};

const ImageEnhanced = ({ name, alt, useLoadImageFn }) => {
  const { stateimage } = useLoadImageFn({ name });
  return stateimage !== null ? <img src={stateimage} alt={alt} /> : <Loading />;
};

export const menuEnhancedPropTypes = {
  useLoadImageFn: PropTypes.func,
};

export const menuEnhancedDefaultProps = {
  useLoadImageFn: useLoadImage,
};

ImageEnhanced.propTypes = menuEnhancedPropTypes;
ImageEnhanced.defaultProps = menuEnhancedDefaultProps;

export default ImageEnhanced;
