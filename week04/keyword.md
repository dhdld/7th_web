- `useEffect` 🍠
  React의 함수형 컴포넌트에서 부작용(side effects)을 처리하는 훅(Hook)입니다. 렌더링 이후에 실행되는 코드(예: 데이터 가져오기, 구독, DOM 조작)를 넣을 수 있습니다. 두 번째 인자로 전달되는 의존성 배열에 따라 특정 상태나 props가 변경될 때만 실행됩니다. 의존성 배열이 비어 있으면 컴포넌트가 처음 렌더링될 때만 실행됩니다. `useEffect` 내부에서 반환한 함수는 컴포넌트가 언마운트될 때나 의존성이 변경될 때 정리(clean-up) 작업을 처리합니다.
- `try, catch, finally` 구문 🍠
  자바스크립트에서 예외 처리를 위해 사용하는 구문입니다.
  - **`try` 블록**은 예외가 발생할 가능성이 있는 코드를 실행합니다. 여기서 오류가 발생하면 해당 오류는 `catch` 블록으로 전달됩니다.
  - **`catch` 블록**은 `try` 블록에서 발생한 오류를 처리하는 구간입니다. 오류의 세부 정보를 가져와 적절한 대처를 할 수 있습니다.
  - **`finally` 블록**은 `try`와 `catch`의 실행 여부와 관계없이 반드시 실행되는 부분으로, 주로 자원 해제와 같은 마무리 작업에 사용됩니다.
  ```jsx
  try {
    // 오류가 발생할 가능성이 있는 코드
  } catch (error) {
    // 오류가 발생했을 때 실행되는 코드
  } finally {
    // 항상 실행되는 코드 (선택 사항)
  }
  ```
- `axios` 🍠
  Axios는 브라우저와 Node.js 환경에서 사용할 수 있는 **HTTP 클라이언트 라이브러리**입니다. 주로 **비동기 요청**을 쉽게 처리할 수 있게 도와줍니다. `Promise` 기반으로 동작하며, `GET`, `POST`, `PUT`, `DELETE` 등 다양한 HTTP 요청 메서드를 지원합니다. 자동으로 JSON 데이터를 변환해주고, **인터셉터** 기능을 통해 요청 또는 응답을 가로채고 조작할 수 있습니다. 또한, **타임아웃 설정**, **헤더 설정**, **병렬 요청 처리** 등의 옵션을 제공합니다.
- `fetch` 🍠
  자바스크립트의 내장 함수로, **비동기적으로 HTTP 요청을 처리**하는 데 사용됩니다. Promise 기반이며, `GET`, `POST`, `PUT`, `DELETE` 등의 HTTP 메서드를 사용하여 API 호출을 할 수 있습니다. `fetch`는 기본적으로 **JSON 데이터를 자동으로 변환하지 않기** 때문에 응답을 수동으로 처리해야 합니다. 주로 `.then()` 또는 `async/await` 구문을 사용하여 비동기 처리를 관리하며, 네트워크 요청에 대한 세부 정보를 설정하기 위해 **헤더**, **타임아웃** 등의 옵션을 사용할 수 있습니다.
- `axios` vs `fetch` (차이점) 🍠
  1. **응답 처리:**
     - **Axios:** 응답 데이터가 자동으로 JSON으로 변환됩니다. 따라서 추가 변환 작업이 필요하지 않습니다.
     - **fetch:** 기본적으로 `response.json()`을 호출하여 수동으로 JSON 데이터를 변환해야 합니다.
  2. **에러 처리:**
     - **Axios:** 상태 코드가 200이 아닌 경우도 자동으로 에러로 처리됩니다.
     - **fetch:** 네트워크 에러만 `catch`로 잡히며, 상태 코드가 400이나 500대여도 에러로 인식하지 않습니다. 상태 코드 검사를 수동으로 해야 합니다.
  3. **기능 지원:**
     - **Axios:** 요청 및 응답 **인터셉터**, **타임아웃 설정**, **취소 요청** 등 다양한 기능을 기본으로 제공합니다.
     - **fetch:** 인터셉터나 타임아웃 같은 기능은 내장되어 있지 않으며, 타임아웃은 별도의 구현이 필요합니다.
  4. **전송 데이터 형식:**
     - **Axios:** 객체 형식의 데이터를 자동으로 URL 인코딩하거나 JSON 문자열로 변환하여 보냅니다.
     - **fetch:** 데이터를 수동으로 `JSON.stringify()`하거나 적절한 `Content-Type` 헤더를 설정해주어야 합니다.
- `.env` 파일에는 어떤 내용들을 관리할까요? 🍠
  프로젝트에서 **환경 변수**를 관리하기 위해 사용됩니다. 주로 개발, 테스트, 운영 환경에서 각기 다른 설정을 손쉽게 관리할 수 있도록 도와줍니다. 여기에는 중요한 정보나 변경될 가능성이 있는 설정값들이 포함됩니다. 주로 API 키 및 비밀 정보(API_KEY=your-api-key), 데이터베이스 연결 정보, 서버 설정 등이 포함됩니다.
- **`custom hook ?`**
  **React**에서 재사용 가능한 로직을 만들기 위해 사용하는 함수입니다. React의 기본 Hooks (`useState`, `useEffect` 등)을 결합하여, 반복되는 상태 관리 로직이나 부작용 처리 로직을 캡슐화하고, 이를 여러 컴포넌트에서 쉽게 재사용할 수 있도록 합니다. Custom Hook은 기본적으로 **함수**로 작성되며, 이름이 반드시 `use`로 시작해야 React 규칙을 준수할 수 있습니다.
