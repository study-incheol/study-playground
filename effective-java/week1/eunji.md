# 📌 인상 깊었던 내용
#### 아이템1. 생성자 대신 정적 팩터리 메서드를 고려하라
흔히 사용하는 명명 방식들
```
Date.from(instant)
EnumSet.of(JACK, QUEEN)
BigInteger.valueOf(Integer.MAX_VALUE)
StackWalker.getInstance(options)
Array.newInstance(classObject, arrayLen)
Files.getFileStore(path)
Files.newBufferedReader(path)
Collections.list(legacyLitany)
```
#### 아이템2. 생성자에 매개변수가 많다면 빌더를 고려하라

#### 아이템3. private 생성자나 열거 타입으로 싱글텀임을 보증하라
열거 타입 방식의 싱글턴
- 간결하고 추가 노력 없이 직렬화 할 수 있고 리플렉션 공격에서도 제2의 인스턴스가 생기는 일을 막아준다.
- 단, 만들려는 싱글턴이 Enum 외의 클래스를 상속해야 한다면 사용할 수 없다. (다른 인터페이스를 구현하도록 선언할 수는 있다.)
```java
public enum Elvis {
    INSTANCE;

    public void leaveTheBuilding() { ... {
} 
```

#### 아이템4. 인스턴스화를 막으려거든 private 생성자를 사용하라
```java
public class UtilityClass {
    // 기본 생성자가 만들어지는 것을 막는다 (인스턴스화 방지용)
    private UtilityClass() {
        throw new AssertionError();
    }
}
```

#### 아이템5. 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라
- 클래스가 내부적으로 하나 이상의 자원에 의존하고, 그 자원이 클래스 동작에 영향을 준다면 싱글턴과 정적 유틸리티 클래스는 사용하지 않는 것이 좋다.
- 필요한 자원을 생성자에 (혹은 정적 패터리나 빌더에) 넘겨주자
```java
public class SpellChecker {
    private final Lexicon dictionary;

    public SpellChecker(Liicon disctionary) {
        this.dictionary = Objects.requireNonNull(dictionary);
    }
}
```
```java
Mosaic create(Supplier<? extends Tile> tileFactory) { ... }
```
- 의존성이 수천개나 되는 큰 프로젝트에서는 코드를 어지럽게 만들기도 한다. 스프링 같은 의존 객체 주입 프레임워크를 사용하면 이런 어지러짐을 해소할 수 있다.

#### 아이템6. 불필요한 객체 생성을 피하라

#### 아이템 9. try-finally 보다는 try-with-resources를 사용하라

# 📌 이해가 가지 않았던 내용
#### 아이템7. 다 쓴 객체 참조를 해제하라
- 자기 메모리를 직접 관리하는 클래스라면 프로그래머는 항시 메모리 누수에 주의해야 한다.


# 📌 논의해보고 싶었던 내용
#### 아이템 8. finalizer와 cleaner 사용을 피하라
- 보통 언제 사용하는지..? 사용해본 적이 없다.
