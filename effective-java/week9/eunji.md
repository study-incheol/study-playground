### 아이템 46. 스트림에서는 부작용 없는 함수를 사용하라

#### 각 변환 단계는 가능한 이전 단계의 결과를 받아 처리하는 순수 함수여야 한다.
- 스트림 패러다임의 핵심은 계산을 일련의 변환으로 재구성하는 부분이다
- 순수 함수란 오직 입력만이 결과에 영향을 주는 함수
- 다른 가변 상태를 참조하지 않고 함수 스스로도 다른 상태를 변경하지 않는다.
- 이렇게 하려면 스트림 연산에 건네는 함수 객체는 모두 부작용(side effect)이 없어야 한다.

```java
// 텍스트 파일에서 단어별 수를 세어 빈도표로 만드는 코드
Map<String, Long> freq = new HashMap<>();
try ( Stream<String> words = new Scanner(file).tokens() ) {
    words.foreach(word -> {
        freq.merge(word.toLowerCase(), 1L, Long::sum);
    });
}
```
- 종단 연산인 foreach에서 외부 상태(빈도표)를 수정하게 됨 <-- 문제!
- foreach 연산은 스트림 계산 결과를 보고할 때만 사용하고, 계산할 때는 쓰지 말자.

#### 수집기(collector)를 통해 스트림의 원소를 손쉽게 컬렉션으로 모을 수 있다
```java
Map<String, Long> freq = new HashMap<>();
try ( Stream<String> words = new Scanner(file).tokens() ) {
    freq = words
            .collect(groupingBy(String::toLowerCase, counting()));
}
```
- toList, toSet, toMap, groupingBy, joining 을 가장 많이 사용한다.

### 아이템 47. 반환 타입으로는 스트림보다 컬렉션이 낫다

#### 스트림은 반복(Iteration)을 지원하지 않는다.
- 스트림만 반환하도록 해놓으면 반환된 스트림을 For-each로 반복하길 원하는 사용자는 당연히 불만을 토로할 것
  - 원소 시퀀스를 반환하는 메서드를 작성할 때는, 이를 스트림으로 처리하기를 원하는 사용자와 반복으로 처리하길 원하는 사용자가 모두 있을 수 있음을 떠올리자

💡 재미난(?) 사실
Stream 인터페이스는 Iterable 인터페이스가 정의한 추상 메서드를 전부 포함할 뿐만 아니라, Iterable 인터페이스가 정의한 방식대로 동작한다.
그럼에도 for-each로 반복할 수 없는 까닭은 Stream이 Iterable을 확장하지 않았기 때문이다.

결론
- 컬렉션을 반환할 수 있으면 그렇게 하자
  - Collection 인터페이스는 Iterable의 하위 타입이고 Stream 메서드를 제공하니 반복과 스트림을 동시에 지원한다
  - **따라서 원소 시퀀스를 반환하는 공개 API의 반환 타입에는 Collection이나 하위 타입을 쓰는 게 일반적으로 최선이다.**
- 반환 전부터 이미 컬렉션에 담아 관리하고 있거나 원소 개수가 적다면 ArrayList 같은 표준 컬렉션에 담아 반환하자
- 그렇지 않다면 전용 컬렉션을 구현할지 고민하자
  - 단지 컬렉션을 반환한다는 이유로 덩치 큰 시퀀스를 메모리에 올려서는 안된다
- 컬렉션을 반환하는 게 불가능하면 스트림과 Iterable 중 더 자연스러운 것을 반환하자
```java
// Stream<E> 를 Iterable<E> 로 중개해주는 어댑터
public static <E> Iterable<E> iterableOf(Stream<E> stream) {
    return stream::iterator;
}
```
