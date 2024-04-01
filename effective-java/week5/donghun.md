# 📌 인상 깊었던 내용
## 26장
* raw 타입은 하나의 별도 타입이며, 제네릭 이전 코드와 호환을 제공하기 위한 목적.
  - 제네릭타입에 raw type, 혹은 그 반대를 제공하기 위해, "제네릭 구현은 소거 방식을 사용"
* raw 타입은, 안정성을 잃게 만든다. List<Object> vs List
  - List<String>은 List의 하위타입이지만, List<Object>의 하위타입은 아니다.(불공변)
* class 리터럴에는 raw 타입을 사용해야한다.
  - 가능: List.class, String[].class, int.class
  - 불가능: List<String>.class, List<?>.class

## 28장
* 배열 vs 제네릭
 - 배열은 공변, 제네릭은 불공변
 - 배열은 "실체화"가 된다.(런타임에 원소타입 인지)
 - E, List<E>, List<String>은 "실체화 불가 타입": 런타임에 컴파일타임보다 타입정보를 적게 가지는 타입
 


# 📌 이해가 가지 않았던 내용
## 27장
* 경고를 제거할 순 없지만, 타입이 안전하다고 확신하는 케이스(SuppressWarnings)

## 29장 
* 배열의 런타임 타입이 컴파일타임 타입과 달라 힙 오염을 일으킨다.(32장)

## 30장
* 제네릭 싱글턴 팩토리ㅁ
```java
private static UnaryOperator<Object> IDENTITY_FN = (t)->t;

@SuppressWarnings("unchecked")
public static <T> UnaryOperator<T> identityFunction() {
    return (UnaryOperator<T>) IDENTITY_FN;
}
```

# 📌 논의해보고 싶었던 내용
* 런타임과 컴파일타임의 차이?: 쉽게 이해되진 않는다.
