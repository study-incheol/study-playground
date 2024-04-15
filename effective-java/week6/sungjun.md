# 📌 인상 깊었던 내용
* 아이템31: 한정적 와일드카드를 사용해 API 유연성을 높여라
  - 메시지는 분명하다. 유연성을 극대화하려면 원소의 생산자나 소비자용 입력 매개변수에 와일드카드 타입을 사용하라. 
  - PECS : producer-extends, consumer-super
  - Get and Put Principle
  - 반환 타입에는 한정적 와일카드 타입을 사용하면 안 된다. 유연성을 높여주기는 커녕 클라이언트 코드에서도 와일드카드 타입을 써야 한다.
  - 메서드 선언에 타입 매개변수가 한 번만 나오면 와일드 카드로 대체하라.

* 아이템32: 제네릭과 가변인수를 함께 쓸 때는 신중하라
  - 제네릭이나 매개변수화 타입의 varargs 매개변수를 받는 모든 메서드에 @SafeVarargs를 달라. (안전하지 않은 varargs 메서드는 절대 작성하면 안된다, 재정의 할 수 없는 정적메서드와 final 인스턴스 메서드 그리고 private 인스턴스 메서드에만 달아야한다)
  - 다음 두 조건을 모두 만족하는 제네릭 varargs 메서드는 안전하다
    - varargs 매개변수 배열에 아무것도 저장하지 않는다
    - 그 배열(혹은 복제본)을 신뢰할 수 없는 코드에 노출하지 않는다

* 아이템33: 타입 안전 이종 컨테이너를 고려하라
  - 타입 안전 이종 컨테이너 : Class 를 키 타입 매개변수로 쓰고 값을 컨테이너로 쓰는 방법 

* 아이템34: int 상수 대신 열거 타입을 사용하라
  - 열거 타입 자체는 클래스이며, 상수 하나당 자신의 인스턴스를 하나씩 만들어 public static final 필드로 공개한다. 열거 타입 인스턴스들은 생성, 확장이 불가하므로 싱글톤이다. 

# 📌 이해가 가지 않았던 내용
* 아이템31: 한정적 와일드카드를 사용해 API 유연성을 높여라
```java
// swap 메서드의 두 가지 선언
public static <E> void swap(List<E> list, int i, int j);
public static void swap(list<?> list, int i, int j);
```
- 메서드 선언에 타입 매개변수가 한 번만 나오면 와일드 카드로 대체하라 -> okay, 근데 왜 굳이 대체한 메서드의 내부 구현이 대체 이전 내용을 그대로 포함하면 무슨 의미나 이점이 있는걸까...?
```java
public static void swap(list<?> list, int i, int j) {
    swapHelper(list, i, j);
}
public static <E> void swapHelper(List<E> list, int i, int j) {
    list.set(i, list.set(j, list.get(i)));
}
```

# 📌 논의해보고 싶었던 내용
