import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
// import myLogger from './middlewares/myLogger'; // 미들웨어 동작방식을 알아보기위해 직접 만든 미들웨어, 실제론 redux-logger를 사용하자.
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
// import { BrowserRouter } from 'react-router-dom'; // 일반 라우터 사용시 필수객체
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}); // 사가 미들웨어를 만듭니다.

// applyMiddleware(logger) => 이전 state, 변경된 state, 사용한 action을 콘솔에서 확인할 수 있다.
// composeWithDevTools()   => redux dev Tools를 개발자도구에서 사용할 수 있다.
// ReduxThunk              => 액션이 아닌 함수를 디스패치할 수 있다. 비동기처리작업 시 사용 (예시: 카운터 액션 디스패치 딜레이)
const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware, // 사가 미들웨어를 적용하고
      logger
    )
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.


sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

ReactDOM.render(
  /* <BrowserRouter> */
  <Router history={customHistory}> 
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  /* </BrowserRouter> */,
  document.getElementById('root')
);
