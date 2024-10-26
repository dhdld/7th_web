- useRef
  React에서 DOM 요소나 값의 **참조(reference)를 유지**하기 위해 사용하는 Hook입니다. `useRef`로 생성된 객체는 컴포넌트가 **재렌더링되더라도 값이 유지**되며, 이를 통해 DOM 요소에 직접 접근하거나 값이 변경되더라도 컴포넌트를 재렌더링하지 않도록 할 수 있습니다.

### Controlled Input

**`Controlled Input`**은 React의 상태(state)에 의해 폼의 값을 관리하는 방식입니다. Input의 value가 컴포넌트의 상태에 연결되어 있고, 상태값이 달라질 떄 마다, 입력 필드의 값도 갱신됩니다.

쉽게 말해서, Input의 값은, **`React Component가 제어`**하고, 모든 입력 변화 또한, **`컴포넌트의 상태로 반영`**되어집니다.

### UnControlled Input

**`Uncontrolled Input`**은 React의 state가 아닌 DOM 자체에서 입력 값을 관리하는 방식입니다. 폼의 값은 **`React 컴포넌트가 직접 관리하지 않고`**, 필요할 때 DOM에서 직접 값을 참조하는 방법입니다. 이를 위해 `ref`를 사용하여 **`DOM 요소에 직접 접근`**할 수 있습니다.

### react-hook-form & yup

**`react-hook-form`**과 **`yup`**은 React에서 폼을 간편하게 관리하고, 유효성 검사를 수행하는 데 유용한 라이브러리 입니다. 두 개의 라이브러리를 함께 사용하면, 폼 입력 관리와 검증 과정을 매우 효율적으로 처리할 수 있습니다.
