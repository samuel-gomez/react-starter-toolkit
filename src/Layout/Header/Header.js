import React from 'react';
import PropTypes from 'prop-types';
import { Header, Name, User, Infos } from '@axa-fr/react-toolkit-all';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import withClassModifier from '@axa-fr/react-toolkit-core/dist/withClassModifier.hoc';
import Skeleton from 'shared/components/Skeleton';
import Resilience from 'shared/components/Resilience/Resilience';
import withAuthentication from 'shared/hoc/withAuthentication';
import './Header.scss';

export const HeaderInfo = ({ isLoaded, children }) => (isLoaded ? <>{children}</> : <Skeleton classModifier="info" />);

export const HeaderInfoWithClassModifier = withClassModifier(HeaderInfo);

export const HeaderApp = ({ infos, title, link, authName, authRole, anomaly }) => (
  <Header>
    <Name title={title} img={logo} alt={title} />
    {infos && (
      <Resilience anomaly={anomaly} resilienceModifier="simple infos">
        <HeaderInfoWithClassModifier isLoaded={infos.length > 0}>
          <Infos infos={infos} />
        </HeaderInfoWithClassModifier>
      </Resilience>
    )}
    <User name={authName} href={link} profile={authRole} />
  </Header>
);

HeaderApp.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  infos: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      definition: PropTypes.string,
    }),
  ),
  authName: PropTypes.string,
  authRole: PropTypes.string,
};

HeaderApp.defaultProps = {
  title: 'OASIS',
  infos: null,
  link: '#',
  authName: 'Non Connecté',
  authRole: 'Profil',
};

export default withAuthentication(HeaderApp);
