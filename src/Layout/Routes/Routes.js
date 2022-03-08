import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from 'NotFound';
import PageUnauthorize from 'Unauthorize';
import Members from 'Members';
import SearchMembers from 'SearchMembers';
import SlashDesignSystem from 'SlashDesignSystem';
import Modal from 'Demos/Modal';
import Button from 'Demos/Button';
import Dashboard from 'Dashboard';
import Layout from 'Layout';
import ROUTE_URL from 'Layout/constants';

export const LayoutDashboard = props => Layout(Dashboard, props);
export const LayoutMembers = props => Layout(Members, props);
export const LayoutSearchMembers = props => Layout(SearchMembers, props);
export const LayoutSlashDesignSystem = props => Layout(SlashDesignSystem, props);
export const LayoutModal = props => Layout(Modal, props);
export const LayoutButton = props => Layout(Button, props);

const RoutesCmpt = () => (
  <Routes>
    <Route exact path={ROUTE_URL.DASHBOARD} element={<LayoutDashboard />} />
    <Route exact path={ROUTE_URL.MEMBERS} element={<LayoutMembers />} />
    <Route exact path={ROUTE_URL.SEARCHMEMBERS} element={<LayoutSearchMembers />} />
    <Route exact path={ROUTE_URL.SLASH} element={<LayoutSlashDesignSystem />} />
    <Route exact path={ROUTE_URL.MODAL} element={<LayoutModal />} />
    <Route exact path={ROUTE_URL.BUTTON} element={<LayoutButton />} />
    <Route exact path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorize />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default RoutesCmpt;
