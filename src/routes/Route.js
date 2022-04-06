import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "@/components/Loading";

const ResourcesList = React.lazy(() => import("@/pages/ResourcesList"));
const FirstList = React.lazy(() => import("@/pages/FirstList"));
const SecondaryList = React.lazy(() => import("@/pages/SecondaryList"));
const Editor = React.lazy(() => import("@/pages/Editor"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const HowToUse = React.lazy(() => import("@/pages/HowToUse"));

const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route path="/" exact component={ResourcesList} />
            <Route path="/shopify-metafields" exact component={ResourcesList} />
            <Route
                path="/shopify-metafields/resources-list"
                component={ResourcesList}
            />
            <Route
                path="/shopify-metafields/first-list/:ownerResource"
                component={FirstList}
            />
            {/* <Route
                path="/shopify-metafields/secondary-list/:ownerResource"
                component={SecondaryList}
            /> */}
            <Route
                path="/shopify-metafields/editor/:ownerResource"
                component={Editor}
            />
            {/* <Route path="/shopify-metafields/pricing" component={Pricing} /> */}
            <Route path="/shopify-metafields/how-to-use" component={HowToUse} />
        </Switch>
    </Suspense>
);

export default Routes;
