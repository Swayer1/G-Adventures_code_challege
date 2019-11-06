import React from 'react';
import { Route } from 'react-router-dom';

import ArticleList from './containers/ArticleListView';
import ArticleDetailView from './containers/ArticleDetailView';

const BaseRouter = () => (
  <div>
    <Route exact path='/' component={ArticleList} />
    <Route exact path='/:articleID' component={ArticleDetailView} />
  </div>
);

export default BaseRouter;
