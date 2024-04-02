### 인상깊었던 내용

#### 아이템 26. Raw Type은 사용하지 말라
- 런타임에 예외가 발생할 수 있으니 사용하지 말자
```
- Set : Raw 타입
- Set<Object> : 매개변수화 타입
- Set<?> : 와일드카드 타입
```

#### 아이템 27. 비검사 경고를 제거하라
- 모든 비검사 경고는 런타임에 ClassCastException을 일으킬 수 있는 잠재적 가능성을 뜻하니 최선을 다해 제거하자
- 경고를 없앨 방법을 찾지 못하겠다면, @SuppressWarnings("unchecked") 애너테이션으로 경고를 숨기고 근거를 주석으로 남기자

#### 아이템 28. 배열보다는 리스트를 사용하라
- 배열과 제네릭의 차이
  - 배열은 공변(covariant) / 제네릭은 불공변(invariant)
  - 배열은 런타임에도 원소의 타입을 인지하고 확인 / 제네릭은 타입 정보가 런타임에는 소거된다. (원소 타입을 컴파일타임에만 검사하며 런타임에는 알 수조차 없음)
```
List<String>[] stringLists = new Lists<String>[1];
List<Integer> intList = List.of(42);
Object[] objects = stringLists;
objects[0] = intList;
String s = stringLists[0].get(0);  <-- 컴파일러는 꺼낸 원소를 자동으로 String으로 형변환하는데, 이 원소는 Integer이므로 런타임에 ClassCastionException 발생
```
- E, List<E>, List<string> : 실체화 불가 타입 -> 실체화되지 않아서 런타임에는 컴파일타임보다 타입 정보를 적게 가지는 타입

#### 아이템 29. 이왕이면 제네릭 타입으로 만들라
- 배열을 사용하는 코드를 제네릭으로 만들려 할 때 문제가 발생할 것
```
elements = new E[DEFAULT_INITIAL_CAPACITY]

(해결책1)
elements = (E[]) new Object[DEFAULT_INITIAL_CAPACITY]

(해결책2)
private Ojbect[] elements; <-- 이렇게 선언하기
E result = (E) elements[--size]; <-- E result = elements[--size]; 에서 변경하기
```

#### 아이템 30. 이왕이면 제네릭 메서드로 만들라
