/**
 * middleware 직접 만들어보기
 * 
 * 이 예제는 미들웨어의 동작방식을 알아보기 위해서 만든 것이고,
 * 실제 실무에선 redux-logger 라이브러리를 사용하는게 좋다.
 */

const myLogger = store => next => action => {
    console.log(action); // 먼저 액션을 출력합니다.
    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
  
    // 업데이트 이후의 상태를 조회합니다.
    console.log('\t', store.getState()); // '\t' 는 탭 문자 입니다.
  
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };
  
  export default myLogger;