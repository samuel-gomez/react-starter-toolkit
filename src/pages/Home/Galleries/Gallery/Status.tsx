import STATUS from './constants';

const Status = ({ status = STATUS }) => (
  <menu className="af-status-badge">
    {status.map(({ href, src, alt }) => (
      <a className="af-status-badge__link" key={href} href={href}>
        <img alt={alt} src={src} />
      </a>
    ))}
  </menu>
);

export default Status;
