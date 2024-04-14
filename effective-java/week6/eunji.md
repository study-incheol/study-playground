### 인상깊었던 내용
#### 아이템 31. 한정적 와일드카드를 사용해 API 유연성을 높여라
```
펙스(PECS): producer-extends, consumer-super
```

#### 아이템 32. 제네릭과 가변인수를 함께 쓸 때는 신중하라
다음 두 조건을 모두 만족하는 제네릭 varargs 메서드는 안전하다. 둘 중 하나라도 어겼다면 수정하라!
- varargs 매개변수 배열에 아무것도 저장하지 않는다.
- 그 배열을 신뢰할 수 없는 코드에 노출하지 않는다.

#### 아이템 33. 타입 안전 이종 컨테이너를 고려하라

#### 아이템 34. int 상수 대신 열거 타입을 사용하라
상수별 메서드 구현(constant-specific method implementation)
```java
public enum Operation {
    PLUS {public double apply(double x, double y){return x+y;}},
    MINUS {public double apply(double x, double y){return x-y;}};
    public abstract double apply(double x, double y);
}
```

열거 타입을 언제 쓰란 것인가?
- 필요한 원소를 컴파일타임에 다 알 수 있는 상수 집합이라면 항상 열거 타입을 사용하자.
- 열거 타입에 정의된 상수 개수가 영원히 고정불변일 필요는 없다.

#### 아이템 35. ordinal 메서드 대신 인스턴스 필드를 사용하라
- 열거 타입 상수에 연결된 값은 ordinal 메서드로 얻지말고, 인스턴스 필드에 저장하자
