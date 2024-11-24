- State
  - State란 무엇인가요?
    - **tate**는 React 컴포넌트에서 **동적인 데이터**를 관리하기 위한 객체입니다.
    - State는 컴포넌트의 **현재 상태**를 나타내며, 컴포넌트 내에서 변경될 수 있습니다.
  - State를 정의할 때 중요한 점은 무엇이고, 그 이유는 무엇인가요?
    **State는 불변성을 유지해야 한다.**
    - State를 직접 변경하지 않고, `setState`(Class Component) 또는 `useState`(Function Component)를 사용해야 합니다.
    **State는 비동기로 업데이트된다.**
    - `setState`는 비동기로 동작하므로, 이전 상태를 기반으로 새 상태를 계산할 때는 **콜백 함수**를 사용하는 것이 안전합니다.
  - React Component 생명주기에 대해 설명해주세요.
    React 컴포넌트는 생성, 업데이트, 제거의 3단계를 거칩니다. 이 과정에서 React는 컴포넌트의 생명주기(Lifecycle)를 관리합니다. 생명주기는 **Class Component**와 **Function Component(Hooks)**에서 다르게 동작합니다.
- Hooks
  - Hooks가 개발된 이유는 무엇인가요?
    - **Class Component의 복잡성 해결**
    - **Stateful Logic의 재사용 어려움**
      - Hooks는 로직을 함수로 분리하여 간단하게 재사용할 수 있습니다.
    - **코드 가독성 및 간결성**
      - Class Component에서는 `this` 키워드와 바인딩 이슈로 인해 코드가 장황하고 가독성이 떨어졌습니다.
      - Hooks는 함수형 컴포넌트 기반으로 작성되어 더 직관적이고 간결합니다.
  - useState에 대한 간단한 설명과 사용법을 설명해 주세요.
    `useState`는 React의 **상태 관리 Hook**으로, 함수형 컴포넌트에서 상태를 사용할 수 있게 합니다.
    ```jsx
    import React, { useState } from "react";

    function Counter() {
      const [count, setCount] = useState(0); // count는 상태 변수, setCount는 업데이트 함수

      return (
        <div>
          <p>Current Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
      );
    }
    ```
  - SideEffect의 사전적 의미와, React에서 사용되는 의미와 함께 React에서는 왜 해당 의미를 갖는지, 그 이유를 함께 설명해 주세요.
    사전적 의미 - 어떤 작업이 직접적으로 의도된 결과 외에 다른 영향을 미치는 것.
    React에서의 의미
    - React에서 Side Effect는 컴포넌트의 렌더링과 관련 없는 외부 작업을 의미합니다.
    - 예: 데이터 가져오기, DOM 수정, 타이머 설정, 로그 기록 등.
  - useEffect에 대한 간단한 설명과 사용법, 그리고 useEffect 함수가 실행되는 시점을 설명해 주세요.
    `useEffect`는 React 컴포넌트에서 Side Effect를 처리하기 위한 Hook입니다.
    ```jsx
    import React, { useState, useEffect } from "react";

    function Example() {
      const [count, setCount] = useState(0);

      // 렌더링 후 실행
      useEffect(() => {
        console.log(`Count: ${count}`);
      }, [count]); // count가 변경될 때만 실행

      return <button onClick={() => setCount(count + 1)}>Click me</button>;
    }
    ```
  - effect 함수가 mount, unmount가 각각 한 번만 실행되게 하려면 어떻게 해야 하나요?
    **마운트 시 한 번만 실행 -** 의존성 배열을 빈 배열(`[]`)로 전달하면 마운트 시 한 번만 실행됩니다.
    **언마운트 시 한 번 실행 -** 클린업 함수(`return` 내부의 함수)가 언마운트 시 호출됩니다.
  - Hooks의 규칙들에 대해 설명해 주세요.
    최상위 레벨에서만 Hooks를 호출해야 한다. React 함수에서만 Hooks를 호출해야 한다.
- Props-Drilling
  - Props-Drilling은 무엇인가요?
    **Props-Drilling**은 React에서 **데이터를 전달해야 하는 컴포넌트와 실제 데이터가 필요한 컴포넌트 간의 깊이가 많은 경우** 발생하는 현상을 말합니다.
  - 이를 어떻게 해결할 수 있을까요?
    - Context API (React 기본 제공)
    - 상태 관리 라이브러리 (Redux, Zustand, Recoil 등)
    - Custom Hook
    - Props Composition
- Context-Api
  React의 **Context API**는 컴포넌트 간의 데이터를 **Props를 통해 전달하지 않고**도, **컴포넌트 트리 전체에서 전역적으로 상태나 데이터를 공유할 수 있는 방법**을 제공합니다.
  React의 `createContext`와 `Provider`/`Consumer` 패턴을 기반으로 동작하며, Props-Drilling 문제를 해결하는 데 유용합니다.
- Redux
  - 상태관리는 왜 필요한가요?
    - 컴포넌트 간의 상태 공유
    - 상태 변경과 UI 동기화
    - 복잡성 증가 대응
    - 단방향 데이터 흐름 유지
  - 상태 관리 툴은 어떤 문제를 해결해 주나요?
    - Props-Drilling 문제 해결
    - 전역 상태 관리
    - 상태 변경 로직의 분리
    - 상태 변화 추적
    - 복잡한 데이터 흐름 관리
  - Redux의 기본 개념 세 가지에 대해 설명해 주세요.
    ### **Single Source of Truth**
    - Redux는 상태를 중앙 저장소(`Store`)에서 관리합니다.
    - 모든 컴포넌트는 이 저장소에서 상태를 읽거나 업데이트할 수 있습니다.
    - 단일 상태 관리로 상태의 일관성을 유지합니다.
    ### **2. State is Read-Only**
    - 상태는 직접 수정할 수 없으며, 상태를 변경하려면 반드시 **Action**을 통해야 합니다.
    - 이를 통해 상태 변경의 의도를 명확히 하며, 상태 변경 과정을 추적 가능하게 만듭니다.
    ### **3. Changes are Made with Pure Functions**
    - 상태 변경은 순수 함수인 **Reducer**에서 이루어집니다.
    - Reducer는 이전 상태와 Action을 입력받아 새로운 상태를 반환합니다.
  - Store, Action, Reducer의 의미와 특징에 대해 설명해 주세요.
    1. **Store**
    - 애플리케이션의 **전체 상태를 저장**하는 중앙 저장소입니다.
    - `getState()`: 현재 상태를 가져옵니다.
    - `dispatch(action)`: 상태를 변경하는 Action을 전달합니다.
    - `subscribe(listener)`: 상태가 변경될 때 호출될 콜백을 등록합니다.
    - 단일 Store에서 상태를 관리합니다.
    - 상태는 Store 내부에서만 존재하며, 직접 수정할 수 없습니다.
    1. **Action**
    - 상태 변경의 의도를 나타내는 **객체**입니다.
    - 최소한 `type` 속성을 가져야 하며, 추가적으로 데이터를 담을 수 있습니다.
    1. **Reducer**
    - 상태를 변경하는 **순수 함수**입니다.
    - 이전 상태와 Action을 입력받아 새로운 상태를 반환합니다.
  - Redux의 장점을 설명해 주세요.
    예측 가능한 상태 관리, 중앙 집중식 상태 관리, 디버깅 및 개발 도구, 유지보수성 향상, 비동기 작업 처리, 생태계와 커뮤니티
- Redux Toolkit
    <aside>
    💡 전역 상태 관리를 바로 이해하는 것은 쉽지 않으나, 차근차근, 공식문서와 블로그 등을 참고해서 꼼꼼하게 정리해 보세요! (매튜/김용민)
    
    </aside>
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - redux-toolkit과 redux의 차이
        
        Redux Toolkit은 Redux의 **공식 상태 관리 라이브러리**로, Redux를 더 쉽게 사용하도록 설계되었습니다.
        
    - redux-toolkit 사용법 (자세하게)
        - Provider
            1. `Provider`를 `react-redux`에서 가져옵니다.
            2. Redux Store를 생성하고, `store`를 `Provider`의 `store` 속성에 전달합니다.
            
            ```jsx
            import React from 'react';
            import ReactDOM from 'react-dom';
            import { Provider } from 'react-redux';
            import { configureStore } from '@reduxjs/toolkit';
            import rootReducer from './reducers'; // 여러 슬라이스를 결합한 Reducer
            import App from './App';
            
            const store = configureStore({ reducer: rootReducer });
            
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('root')
            );
            
            ```
            
        - configureStore
            
            ```jsx
            import { configureStore } from '@reduxjs/toolkit';
            import counterSlice from './features/counterSlice';
            
            const store = configureStore({
                reducer: {
                    counter: counterSlice.reducer,
                },
            });
            
            export default store;
            ```
            
        - createSlice
            
            `createSlice`는 Reducer, Action 생성 함수를 한 번에 생성합니다.
            
            ```jsx
            import { createSlice } from '@reduxjs/toolkit';
            
            const counterSlice = createSlice({
                name: 'counter',
                initialState: { value: 0 },
                reducers: {
                    increment: (state) => {
                        state.value += 1;
                    },
                    decrement: (state) => {
                        state.value -= 1;
                    },
                    incrementByAmount: (state, action) => {
                        state.value += action.payload;
                    },
                },
            });
            
            export const { increment, decrement, incrementByAmount } = counterSlice.actions;
            export default counterSlice;
            ```
            
        - useSelector
            
            `useSelector`는 Redux 상태를 읽는 데 사용되는 Hook입니다.
            
        - useDispatch
            
            `useDispatch`는 Redux Action을 디스패치(전달)하는 데 사용되는 Hook입니다.
            
            ```jsx
            import { useDispatch } from 'react-redux';
            import { increment, decrement } from './features/counterSlice';
            
            function CounterControls() {
                const dispatch = useDispatch();
            
                return (
                    <div>
                        <button onClick={() => dispatch(increment())}>Increment</button>
                        <button onClick={() => dispatch(decrement())}>Decrement</button>
                    </div>
                );
            }
            ```
            
        - 기타 사용 방법을 상세하게 정리해 보세요
            
            createAsyncThunk - 비동기 작업을 간단히 처리할 수 있는 함수입니다.

- Zustand
  **Zustand**는 React 애플리케이션에서 상태를 간단하고 효율적으로 관리할 수 있도록 도와주는 **경량 상태 관리 라이브러리**입니다. 독일어로 "상태"라는 뜻을 가지고 있습니다. Redux나 Context API와 같은 상태 관리 도구보다 설정과 사용이 간단하며, 더 직관적으로 사용할 수 있습니다.
