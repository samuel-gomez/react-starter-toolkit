import Image from 'next/image';
import STATUS from './constants';

const Status = ({ status = STATUS }) => (
  <menu className="af-status-badge">
    {status.map(({ href, src, alt }) => (
      <a className="af-status-badge__link" key={href} href={href}>
        <Image alt={alt} src={src} fill sizes="(max-width: 768px) 100vw" />
      </a>
    ))}
  </menu>
);

export default Status;
