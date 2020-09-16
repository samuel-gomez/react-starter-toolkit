import React from 'react';
import { TITLE_BAR, TITLE } from './constants';
import './Dashboard.scss';

const Dashboard = ({ header, footer, title, menu }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
    </div>
    {footer()}
  </>
);

export default Dashboard;
