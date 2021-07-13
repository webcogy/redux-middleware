# redux middleware sample

## sample list

- redux-logger
- - state, actions를 콘솔에서 실시간 확인 가능
- redux-devtools-extension
- - redux Dev Tools 개발자도구에서 사용 가능
- redux-thunk
- - 함수를 디스패치 / 프로미스, 라우터 연동
- react-router를 thunk를 이용해 연동
- - API 재로딩 문제 해결
- json-server
- - 개발용 가짜API서버
- axios
- - 비동기 API 요청
- CORS 와 Webpack DevServer Proxy
- - 개발할 때 CORS문제가 없도록 proxy를 설정해 작업 (실서버엔 CORS문제해결 필요함, 이건 오직 개발용임)
- redux-saga
- - 액션을 모니터링하다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식
- - Generator 문법, 프로미스, 라우터 연동

참고 : https://react.vlpt.us/redux-middleware/02-make-middleware.html

---

## redux 미들웨어 기본개념

```
const middleware = store => next => action => {
  // 하고 싶은 작업...
}
미들웨어는 결국 하나의 함수입니다. 함수를 연달아서 두번 리턴하는 함수죠.<br>
화살표가 여러번 나타나는게 도대체 뭐지, 하고 헷갈릴 수도 있을텐데요,<br>
이 함수를 function 키워드를 사용하여 작성한다면 다음과 같습니다.

function middleware(store) {
  return function (next) {
    return function (action) {
      // 하고 싶은 작업...
    };
  };
};
```

### redux-logger

참고 : https://react.vlpt.us/redux-middleware/03-logger-and-devtools.html

```
// redux-logger 라이브러리 사용, 콘솔에서 업데이트된 state와 action 실시간 확인 가능.
npm i --save redux-logger
```

### redux-devtools-extension

```
// redux-devtools-extension, 개발자도구에서 redux Tools 사용가능.
npm i --save redux-devtools-extension
```

## redux-thunk

redux-thunk는 리덕스에서 비동기 작업을 처리 할 때 가장 많이 사용하는 미들웨어입니다. 이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있습니다.

참고 : https://react.vlpt.us/redux-middleware/04-redux-thunk.html

```
yarn add redux-thunk
```

#### redux-thunk로 프로미스 다루기 with 리팩토링

참고 : https://react.vlpt.us/redux-middleware/05-redux-thunk-with-promise.html

#### 리액트 라우터 적용하기, API 재로딩 문제 해결하기

참고 : https://react.vlpt.us/redux-middleware/06-fix-reloading.html

```
yarn add react-router-dom
```

#### thunk에서 라우터 연동하기

참고 : https://react.vlpt.us/redux-middleware/07-router-with-thunk.html

일단, 컨테이너 컴포넌트내에서 그냥 단순히 withRouter를 사용해서 props 로 history 를 가져와서 사용해도 상관은 없습니다. 하지만 thunk에서 처리를 하면 코드가 훨씬 깔끔해질 수 있습니다. 취향에 따라 택하시면 됩니다.
withRouter : https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md

## json-server

참고 : https://react.vlpt.us/redux-middleware/08-json-server.html

프런트엔드 개발 연습을 하게 될 때마다 연습을 하는 것 뿐인데 직접 백엔드 개발을 하는것은 조금 귀찮습니다. 특히나 아직 백엔드쪽 지식이 없다면 더욱 힘들죠.
우리는 연습을 위해서 프런트엔드 프로젝트에서 실무와 비슷한 느낌으로 하기 위하여 가짜 API 서버를 만들어볼건데요, 이 때 사용되는 도구가 json-server 입니다. 이 도구를 사용하면 json 파일 하나만 있으면 연습용 서버를 쉽게 구성 할 수 있습니다.

```
// 가짜 API 서버 열기, (data.json 최상위에 생성 후 아래 명령어 입력)
npx json-server ./data.json --port 4000


// 또는 json-server 를 글로벌로 설치해서 다음과 같이 사용 할 수도 있습니다.
yarn global add json-server
json-server ./data.json --port 4000

// 접속
http://localhost:4000/posts
http://localhost:4000/posts/1
```

#### axios API요청

```
yarn add axios

./src/api/posts.js에서 확인
```

## CORS 와 Webpack DevServer Proxy

참고 : https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html
CORS : https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#HTTP_%EC%9D%91%EB%8B%B5_%ED%97%A4%EB%8D%94

브라우저에서 기본적으로 API를 요청 할 때에는 브라우저의 현재 주소와 API 의 주소의 도메인이 일치해야만 데이터를 접근 할 수 있게 되어 있습니다. 만약 다른 도메인에서 API를 요청해서 사용 할 수 있게 해주려면 CORS 설정이 필요합니다.

백엔드 개발자가 따로 있다면 백엔드 개발자에게 해당 도메인을 허용해달라고 요청을 해야겠죠. 그런데, 그럴 필요는 없습니다. 웹팩 개발서버에서 제공하는 Proxy라는 기능이 있기 때문이죠.

```
// package.json에 아래 소스 추가
...
"proxy": "http://localhost:4000"
```

나중에 여러분이 프로젝트를 완성하게 되어 배포하는 경우, 리액트로 만든 서비스와 API가 동일한 도메인에서 제공이되는 경우 이대로 계속 진행을 하시면 됩니다. 하지만, 만약에 API 의 도메인과 서비스의 도메인이 다르다면 (예: 서비스는 velog.io, API 는 api.velog.io), axios 의 글로벌 baseURL 을 설정하시면 됩니다.

예를 들어 index.js 에서 다음과 같이 작성을 하시면 됩니다.

```
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://api.velog.io/';
```

## redux-saga

참고 : https://react.vlpt.us/redux-middleware/10-redux-saga.html

redux-saga의 경우엔, 액션을 모니터링하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용합니다.

redux-saga는 redux-thunk로 못하는 다양한 작업들을 처리 할 수 있습니다. 예를 들자면..

1. 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있습니다
2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드를 실행 할 수 있습니다.
3. 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있습니다 (참고)
4. API 요청이 실패했을 때 재요청하는 작업을 할 수 있습니다.

이 외에도 다양한 까다로운 비동기 작업들을 redux-saga를 사용하여 처리 할 수 있답니다.

#### Generator 문법 배우기

```
// function* 로 사용, 콘솔창에서 아래 소스를 확인해 볼 수 있다.
function* sumGenerator() {
    console.log('sumGenerator이 시작됐습니다.');
    let a = yield;
    console.log('a값을 받았습니다.');
    let b = yield;
    console.log('b값을 받았습니다.');
    yield a + b;
}

const sg = sumGenerator();
sg.next();  // 'sumGenerator이 시작됐습니다.'
sg.next(1); // a값을 받았습니다.
sg.next(3); // b값을 받았습니다. value = 4
```

#### Generator로 액션 모니터링하기

```
function* watchGenerator() {
    console.log('모니터링 시작!');
    while(true) {
        const action = yield;
        if (action.type === 'HELLO') {
            console.log('안녕하세요?');
        }
        if (action.type === 'BYE') {
            console.log('안녕히가세요.');
        }
    }
}

const w = sumGenerator();
w.next(); // 모니터링 시작!
w.next({type:'HELLO'}) // 안녕하세요 ?
```

### 리덕스 사가 설치 및 비동기 카운터 만들기

```
yarn add redux-saga
```

.. 위의 블로그 내용 참고

### 프로미스 다루기

참고 : https://react.vlpt.us/redux-middleware/11-redux-saga-with-promise.html

# 정리

앞으로 프로젝트를 개발 할 때, 무조건 리덕스 + 리덕스 미들웨어를 사용할 필요는 없습니다. 하지만, 프로젝트의 규모가 커졌을 때, 상태를 전역적으로 사용해야 할 때, 비동기 작업을 자주 하게 될 때 리덕스와 리덕스 미들웨어를 잘 활용하시면 프로젝트를 관리 할 때 큰 도움을 줍니다.
