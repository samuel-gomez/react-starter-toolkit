import React from 'react';
import { string } from 'prop-types';
import Resilience from 'shared/components/Resilience/Resilience';
import { Paging } from '@axa-fr/react-toolkit-all';
import Layout from 'Layout';
import Loader from 'shared/components/Loader';
import Table from 'shared/components/Table';
import { TITLE_BAR, TITLE, TABLE_HEADERS_MEMBERS } from './constants';

const Members = ({ titleBar, title, loaderMode, members, anomaly, onChangePaging, pagination, onChangeSorting, sorting }) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <Loader mode={loaderMode}>
      <Resilience anomaly={anomaly}>
        <Table items={members} headers={TABLE_HEADERS_MEMBERS} onSort={onChangeSorting} sorting={sorting} />
        <Paging {...pagination} onChange={onChangePaging} id="paging" />
      </Resilience>
    </Loader>
  </Layout>
);

Members.propTypes = {
  titleBar: string,
  title: string,
};

Members.defaultProps = {
  titleBar: TITLE_BAR,
  title: TITLE,
};

export default Members;
