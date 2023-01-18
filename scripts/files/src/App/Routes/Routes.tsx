/* eslint-disable max-lines-per-function */
import { useContext, ComponentProps, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTE_URL from 'App/Routes/constants';
import { UserContext } from 'App/UserProvider';
import Loader, { MODES } from 'shared/components/Loader';
import { PROFILS } from 'shared/constants';

const Home = lazy(() => import('pages/Home'));
const PageUnauthorize = lazy(() => import('pages/Unauthorize'));
const PageNotFound = lazy(() => import('pages/NotFound'));

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  UserContextObj = UserContext,
  authorized = PROFILS,
  NavigateCmpt = Navigate,
  LoaderCmpt = Loader,
) => {
  const NewComp = (props: ComponentProps<typeof Component> | object) => {
    const userContext = useContext(UserContextObj);

    if (userContext.isEnabled && userContext.isLoading) {
      return <LoaderCmpt text="Chargement des données utilisateur..." mode={MODES.get} classModifier="fullscreen" />;
    }

    return authorized.includes(userContext?.authRole) || !userContext.isEnabled ? (
      <Component {...(props as T)} />
    ) : (
      <NavigateCmpt to={ROUTE_URL.UNAUTHORIZE} />
    );
  };

  return <NewComp />;
};

type TRoutesCmpt = {
  HomeCmpt?: typeof Home;
  PageUnauthorizeCmpt?: typeof PageUnauthorize;
  withAuthFn?: typeof withAuth;
};

const RoutesCmpt = ({ HomeCmpt = Home, PageUnauthorizeCmpt = PageUnauthorize, withAuthFn = withAuth }: TRoutesCmpt) => (
  <Suspense fallback={<Loader text="Chargement de la page..." mode={MODES.get} classModifier="fullscreen" />}>
    <Routes>
      <Route index path={ROUTE_URL.HOME} element={withAuthFn(HomeCmpt)} />
      <Route path={ROUTE_URL.UNAUTHORIZE} element={<PageUnauthorizeCmpt />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesCmpt;
