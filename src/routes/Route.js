import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Loading from '@/components/Loading';

const ResourcesList = React.lazy(() => import('@/pages/ResourcesList'))
const FirstList = React.lazy(() => import('@/pages/FirstList'))
const SecondaryList = React.lazy(() => import('@/pages/SecondaryList'))
const Editor = React.lazy(() => import('@/pages/Editor'))
const ActivityLog = React.lazy(() => import('@/pages/ActivityLog'))
const Pricing = React.lazy(() => import('@/pages/Pricing'))
const HowToUse = React.lazy(() => import('@/pages/HowToUse'))

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/" exact component={ResourcesList} />
      <Route path="/web/view/resources-list" component={ResourcesList} />
      <Route path="/web/view/first-list/:ownerResource" component={FirstList} />
      <Route path="/web/view/secondary-list/:ownerResource" component={SecondaryList} />
      <Route path="/web/view/editor/:ownerResource" component={Editor} />
      <Route path="/web/view/activity-logs" component={ActivityLog} />
      <Route path="/web/view/pricing" component={Pricing} />
      <Route path="/web/view/how-to-use" component={HowToUse} />
    </Switch>
  </Suspense>
);

export default Routes;