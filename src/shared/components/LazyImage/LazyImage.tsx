import Image from 'next/image';
import { useState, useEffect, ImgHTMLAttributes } from 'react';
import loaderSVG from 'shared/images/puff.svg';
import './LazyImage.scss';

type TloadImage = string;
export const loadImage = async (name: TloadImage) => import(`../../../../public/images/${name}`);

const Loading = () => <Image className="af-lasyimage" src={loaderSVG} alt="loading..." fill />;

type StaticImport = string;
type TuseLoadImage = {
  name: TloadImage;
  loadImageFn?: typeof loadImage;
  initState?: { src: string | StaticImport };
};

const useLoadImage = ({ name, loadImageFn = loadImage, initState = { src: '' } }: TuseLoadImage) => {
  const [stateimage, setStateImage] = useState(initState);

  useEffect(() => {
    if (stateimage.src === '' && name) {
      loadImageFn(name)
        .then(image => setStateImage(image.default))
        .catch(error => setStateImage(error));
    }
  }, [stateimage, loadImageFn, name]);

  return { stateimage, setStateImage };
};

type TLasyImage = ImgHTMLAttributes<HTMLImageElement> & {
  name: TloadImage;
  alt: string;
  useLoadImageFn?: typeof useLoadImage;
};

const LasyImage = ({ name, alt, useLoadImageFn = useLoadImage, ...rest }: TLasyImage) => {
  const { stateimage } = useLoadImageFn({ name });
  return stateimage !== null && stateimage.src !== '' ? (
    <Image className={rest.className} alt={alt} src={stateimage.src} fill sizes="(max-width: 768px) 100vw" />
  ) : (
    <Loading />
  );
};

export default LasyImage;
