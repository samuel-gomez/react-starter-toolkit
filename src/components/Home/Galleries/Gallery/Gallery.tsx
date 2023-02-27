import Image from 'next/image';
import Status from './Status';

type TItem = {
  titleItem: string;
  linkItem: string;
  imageItem: string;
};

type TGallery = {
  title: string;
  description: string;
  image: string;
  alt: string;
  items: TItem[];
  first?: boolean;
};

const Gallery = ({ title, description, image, alt, items, first }: TGallery) => (
  <section className="af-gallery">
    <header className="af-gallery__header">
      <Image className="af-gallery__header-image" src={`/images/${image}`} alt={alt} width={180} height={180} />
      <h2 className="af-gallery__header-title">{title}</h2>
      <p className="af-gallery__header-description">{description}</p>
      {first && <Status />}
    </header>
    <main className="af-gallery__main">
      {items.map(({ titleItem, linkItem, imageItem }) => (
        <article key={imageItem} className={`af-gallery__item af-gallery__${imageItem}`}>
          <div className="af-gallery__item-info-wrap">
            <div className="af-gallery__item-info">
              <div className={`af-gallery__item-info-front af-gallery__${imageItem}`}></div>
              <div className="af-gallery__item-info-back">
                <h3 className="af-gallery__item-title">{titleItem}</h3>
                <a title={`Voir ${titleItem}`} className="af-gallery__item-link" href={linkItem} target="_blank" rel="noreferrer">
                  View on WebSite
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </main>
  </section>
);

export default Gallery;
