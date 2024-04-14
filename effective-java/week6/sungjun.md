# 📌 인상 깊었던 내용
* 아이템31: 한정적 와일드카드를 사용해 API 유연성을 높여라
  - 메시지는 분명하다. 유연성을 극대화하려면 원소의 생산자나 소비자용 입력 매개변수에 와일드카드 타입을 사용하라. 
  - PECS : producer-extends, consumer-super
  - Get and Put Principle
  - 반환 타입에는 한정적 와일카드 타입을 사용하면 안 된다. 유연성을 높여주기는 커녕 클라이언트 코드에서도 와일드카드 타입을 써야 한다.
  - 메서드 선언에 타입 매개변수가 한 번만 나오면 와일드 카드로 대체하라.
  
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
