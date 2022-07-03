# Portfolio 2

online mini game site.
Portfolio for frontend algorithns.

# 변수명

- react 내부 - 단수: 단수형 / 복수: ~list(rendering state), ~Arr, ~Map

- 데이터베이스 - 단수: 단수형, 복수: 복수형(ex ~s)

# 용어통일

1. DB

- create, read, update, delete,

2. State(context 포함)

- set, get, modify, remove

3. context 스텟 변경함수

- dispatch로 시작(dispatch 뒤에 동사로 동작을 나타내며, 바로 목적어가 올 경우 해당 객체를 set)

4. function이름

- on~ DOM 핸들러함수
- handle~ DOM이 아닌 핸들러성격의 함수

# 컴포넌트 내부 코드 순서

- 상위에서 받은 prop
- context
- reusable state(ex. custom hook)
- local state
- 상위 데이터들로 하는 연산
- 렌더링에 관여하는 연산
- local functions
- useEffect
- return JSX

# import 순서

- Components
- assets
- third party library
- utils
- lazy components
- types

# 기타 규칙

- HTML, CSS built-in을 최대한 활용할 것 - 불필요한 JS를 최대한 줄이자.
- toggle function(ex. true or false)은 가급적이면 active, inactive 두개롤 각각 만들자(가독성)
- styled-component에 전달되는 prop은 react 컴포넌트 내부에서 각각 연산하고, 최종적으로 css property만 전달한다
  (ex. isActive를 전달해서 ${props => props.isActive? "white" : "black"})으로 하지 말고
  const color = isActive? "white" : "black" 을 계산한 뒤
  styled-component에 color 전달, ${props => props.color}로 사용하도록.
  => 가독성이 좋고 styled-component의 재사용 가능성이 높아짐

# 함수를 prop으로 받는 컴포넌트에서 re-rendering 방지 고려사항

- useCallback을 통해 prop변화를 방지할 것인가 vs memorization을 통해 이전 렌더링 결과를 재사용할 것인가
