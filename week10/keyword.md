### 타입 스크립트에만 존재하는 타입 🍠

- any 🍠
  `any`는 모든 타입을 허용하는 타입으로, 타입 검사를 무시합니다. 타입스크립트를 사용할 때 타입을 확실히 알 수 없거나 임시적으로 타입 검사를 비활성화하고 싶을 때 사용됩니다. 어떤 값도 할당할 수 있고, 어떤 연산도 수행할 수 있습니다. 타입 안전성이 없어 런타임 오류를 유발할 가능성이 높습니다.
  ```jsx
  let value: any;
  value = 5; // number
  value = "hello"; // string
  value = true; // boolean

  // 아무 연산도 가능
  value.toFixed(); // 런타임에서만 오류 발생 가능
  ```
- unknown 🍠
  `unknown`은 `any`와 유사하게 모든 타입의 값을 가질 수 있지만, **타입이 명확히 확인되지 않으면 조작할 수 없는** 더 안전한 타입입니다. `any`보다 타입 안정성을 높이고 싶을 때 사용됩니다. 타입 확인 후 안전하게 값을 조작할 수 있습니다. `unknown`은 모든 타입의 **최상위 타입**입니다.
  ```jsx
  let value: unknown;

  value = 5; // number
  value = "hello"; // string

  // 타입 확인 없이는 사용 불가
  // console.log(value.toUpperCase()); // 에러 발생

  if (typeof value === "string") {
    console.log(value.toUpperCase()); // "HELLO"
  }
  ```
- void 🍠
  `void`는 값을 반환하지 않는 함수의 반환 타입을 나타냅니다. 반환값이 없는 함수에 적합하며, 주로 `return` 문이 없는 함수에 사용됩니다. 또는 반환값이 `undefined`일 때 사용합니다.
  ```jsx
  // 반환값이 없는 함수
  function logMessage(message: string): void {
    console.log(message);
  }

  // void 타입 변수 (잘 사용되지 않음)
  let unusable: void = undefined; // `undefined`만 할당 가능
  ```
- never 🍠

  `never`는 **절대 반환되지 않는 값**을 나타내는 타입입니다. 함수가 예외를 던지거나, 끝나지 않는(무한 루프) 경우에 사용됩니다. 모든 타입의 **서브 타입**이며, 어떤 값도 `never` 타입으로 할당할 수 없습니다. 반환 타입이 없음을 나타내기 위해 사용됩니다.

  ```jsx
  // 예외를 던지는 함수
  function throwError(message: string): never {
    throw new Error(message);
  }

  // 무한 루프 함수
  function infiniteLoop(): never {
    while (true) {
      console.log("Running...");
    }
  }

  // 조건 검사에서 발생하는 `never`
  function checkType(value: string | number): string {
    if (typeof value === "string") {
      return "string";
    } else if (typeof value === "number") {
      return "number";
    }
    // 여기서 value는 `never` 타입
    throw new Error("Unexpected type");
  }
  ```
