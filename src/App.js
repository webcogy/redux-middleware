import React from 'react';
// import CounterContainer from './containers/CounterContainer'; // redux-thunk로 카운터 딜레이
// import PostListContainer from './containers/PostListContainer'; // redux-thunk로 프로미스 다루기

import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import CounterContainer from './containers/CounterContainer';

function App() {
  // return <CounterContainer />;
  // return <PostListContainer />;
  return(
    <>
      <CounterContainer />
      <Route path="/" component={PostListPage} exact={true} />
      <Route path="/:id" component={PostPage} />
    </>
  )
}

export default App;