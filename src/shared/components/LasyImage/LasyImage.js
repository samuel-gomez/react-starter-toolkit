import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loaderSVG from 'shared/images/puff.svg';
import './LasyImage.scss';

export const loadImage = name => import(`shared/images/${name}`);

const Loading = () => <img className="af-lasyimage" src={loaderSVG} alt="loading..." />;

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

const LasyImage = ({ name, alt, useLoadImageFn, ...rest }) => {
  const { stateimage } = useLoadImageFn({ name });
  return stateimage !== null ? <img {...rest} src={stateimage} alt={alt} /> : <Loading />;
};

export const menuEnhancedPropTypes = {
  useLoadImageFn: PropTypes.func,
};

export const menuEnhancedDefaultProps = {
  useLoadImageFn: useLoadImage,
};

LasyImage.propTypes = menuEnhancedPropTypes;
LasyImage.defaultProps = menuEnhancedDefaultProps;

export default LasyImage;
