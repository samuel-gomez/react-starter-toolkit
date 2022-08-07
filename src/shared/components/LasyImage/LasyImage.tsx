import { useState, useEffect } from 'react';
import loaderSVG from 'shared/images/puff.svg';
import './LasyImage.scss';

type TloadImage = string;
export const loadImage = (name: TloadImage) => import(`shared/images/${name}`);

const Loading = () => <img className="af-lasyimage" src={loaderSVG} alt="loading..." />;

type TuseLoadImage = {
  name: TloadImage;
  loadImageFn?: typeof loadImage;
  initState?: string | null;
};
export const useLoadImage = ({ name, loadImageFn = loadImage, initState = null }: TuseLoadImage) => {
  const [stateimage, setStateImage] = useState(initState);

  useEffect(() => {
    if (stateimage === null && name) {
      loadImageFn(name)
        .then(image => setStateImage(image.default))
        .catch(error => setStateImage(error));
    }
  }, [stateimage, loadImageFn, name]);

  return { stateimage, setStateImage };
};

type TLasyImage = {
  name: TloadImage;
  alt: string;
  useLoadImageFn?: typeof useLoadImage;
};

const LasyImage = ({ name, alt, useLoadImageFn = useLoadImage, ...rest }: TLasyImage) => {
  const { stateimage } = useLoadImageFn({ name });
  return stateimage !== null ? <img {...rest} src={stateimage} alt={alt} /> : <Loading />;
};

export default LasyImage;
