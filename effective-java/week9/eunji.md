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

### 아이템 48. 스트림 병렬화는 주의해서 적용하라
- 데이터 소스가 Stream.iterate 거나 중간 연산으로 Limit을 쓰면 파이프라인 병렬화로는 성능 개선을 기대할 수 없다
- 대체로 데이터 소스가 ArrayList, HashMap, HashSet, ConcurrentHashMap의 인스턴스거나 배열, Int 범위, Long 범위일 때 병렬화의 효과가 가장 좋다
  - **데이터를 원하는 크기로 정확하고 손쉽게 나눌 수 있어서 다수의 스레드에 분배하기에 좋은 자료구조**
    - 나누는 작업은 Spliterator가 담당하며, Spliterator 객체는 Stream이나 Iterable의 spliterator 메서드로 얻어올 수 있음
  - **원소들을 순차적으로 실행할 때 참조 지역성(locality of referene)이 뛰어나다**
    - 이웃한 원소의 참조들이 메모리에 연속해서 저장되어 있음
    - 참조 지역성이 낮으면 스레드는 데이터가 주 메모리에서 캐시 메모리로 전송되어 오기를 기다리며 대부분 시간을 멍하니 보내게 됨
    - 참조 지역성은 다량의 데이터를 처리하는 벌크 연산을 병렬화할 때 아주 중요한 요소 -> 기본 타입의 배열이 참조 지역성이 가장 뛰어남 (데이터 자체가 메모리에 연속해서 저장되기 때문)
- 종단연산도 병렬 수행 효율에 영향을 준다
  - 가장 적합한 것은 축소(Reduction) -> reduce 메소드 중 하나, 혹은 min, max, count, sum 혹은 anyMatch, allMatch, noneMatch
  - 가변 축소(mutable reduction)를 수행하는 collect 메서드는 적합하지 않다
- 직접 구현한 Stream, Iterable, Collection이 병렬화의 이점을 제대로 누리게 하려면 spliterator 메서드를 반드시 재정의하고 병렬화 성능을 강도 높게 테스트 해야한다. (상당한 난이도가 있는 일이다)

💡 계산도 올바로 수행하고 성능도 빨라질 거라는 확신 없이는 병렬화는 시도조차 하지 말라. 성능 지표를 융심히 관찰해야하고, 계산도 정확하고 성능도 좋아졌음이 확실해졌을 때 운영 코드에 반영해라.

### 아이템 49. 매개변수가 유효한지 검사하라

💡 메서드나 생성자를 작성할 때면 그 매개변수들에 어떤 제약이 있을지 생각해야 한다. 그 제약들을 문서화하고 메서드 코드 시작 부분에서 명시적으로 검사해야 한다.

#### public, protected 메서드는 매개변수 값이 잘못됐을 때 던지는 예외를 문서화해야 한다
```java
* 항상 음이 아닌 BigInteger를 반환하다는 점에서 remainder 메서드와 다르다.
*
* @param m 계수(양수여야 한다.)
* @return 현재 갑시 Mod m
* @returm ArithmeticException m이 0보다 작거나 같으면 발생한다.
*/
public BigInteger mod(BigInteger m) {
if (m.signum() <= 0)
    throw new ARithmeticExcption("계수(m)는 양수여야 합니다. " + m);
...
```

#### 자바의 null 검사 이용하는 방법
```java
this.strategy = Objects.requireNonNull(starategy, "전략");
```

#### public이 아닌 메서드라면 단언문(assert)을 사용해 매개변수 유효성을 검사할 수 있다
```java
private static void sort(long a[], int offset, int length) {
    assert a != null;
    assert offset >=0 && offset <= a.length;
    assert length >=0 && length <= a.length - offset;
```

#### 메서드가 직접 사용하지는 않으나 나중에 쓰기 위해 저장하는 매개변수는 특히 더 신경 써서 검사해야 한다

#### 메서드는 최대한 범용적으로 설계해야 한다.
- 메서드가 건네받은 값으로 무언가 제대로 된 일을 할 수 있다면 매개변수 제약은 적을수록 좋다.

### 아이템 50. 적시에 방어적 복사본을 만들라
#### 클라이언트가 불변식을 깨뜨리려 혈안이 되어 있다고 가정하고 방어적으로 프로그래밍해야 한다.
- 어떤 객체든 그 객체의 허락 없이는 외부에서 내부를 수정하는 일은 불가능하지만 자기도 모르게 내부를 수정하도록 허락하는 경우가 생긴다.
```java
public final class Period {
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        if (this.start.compareTo(this.end) > 0)
            throw new IllegalArgumentExepction("start 가 end 보다 늦다.");
        this.start = start;
        this.end = end;
    }

    public end() {
        return this.end;
    }
...
```

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
end.setYear(78); // p의 내부를 수정했다!!
```

- 위 예시에서 Date 대신 불변 객체인 Instant를 사용하면 된다. (**Date는 낡은 API이니 새로운 코드를 작성할 때는 더 이상 사용하면 안된다.**)
- Period 내부를 보호하려면 **생성자에서 받은 가변 매개변수 각각을 방어적으로 복사(defensive copy) 해야 한다**.
```java
public Period(Date start, Date end) {
    this.start = new Date(start.getTime());
    this.end = new Date(end.getTime());
    if (this.start.compareTo(this.end) > 0)
        throw new IllegalArgumentExepction("start 가 end 보다 늦다.");
}
```
- **방어적 복사본을 만들고, 이 복사본으로 유효성을 검사한 점에 주목하자**
  - 유효성을 검사한 후 복사본을 만드는 그 찰나의 취약한 순간에 다른 스레드가 원본 객체를 수정할 위험이 있기 때문이다.
  - TOCTOU 공격 (검사시점/사용시점 time-of-check/time-of-use 공격)
- **방어적 복사에 clone을 사용한 점에도 주목하자**
  - Date는 final이 아니므로 clone이 Date가 정의한 게 아닐 수 있다.
  - 즉, clone이 악의를 가진 하위 클래스의 인스턴스를 반환할 수도 있다.
  - 매개변수가 제3자에 의해 확장될 수 있는 타입이라면 방어적 복사본을 만들 때 clonse을 사용해서는 안된다.

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
p.end().setYear(78); // p의 내부를 또 수정했다!!
```

- 접근자가 가변 필드의 방어적 복사본을 반환하면 된다.
```java
public Date end() {
    return new Date(end.getTime());
}
```

💡 클래스가 클라이언트로부터 받는 혹은 반환하는 요소가 가변이라면 반드시 방어적으로 복사해야 한다. 복사 비용이 너무 크거나 그 요소를 잘못 수정할 일이 없음을 신뢰한다면 방어적 복사를 수행하는 대신 수정했을 때의 책임이 클라이언트에 있음을 문서에 명시하자
