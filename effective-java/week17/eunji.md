### 아이템 86. Serializable을 구현할지는 신중히 결정하라

인스턴스를 직렬화하려면 클래스 선언에 `implements Serializable`만 덧붙이면 됨

1. 릴리즈한 뒤 수정하기 어렵다
- Serializable을 구현하면 직렬화된 바이트 스트림 인코딩도 하나의 공개 API가 된다
- 이 클래스가 널리 퍼진다면 그 직렬화 형태도 영원히 지원해야 한다는 것
- 직렬화가 클래스 개선을 방해하는 간단한 예
  - UID
    - 직렬화된 클래스는 고유 식별 번호를 부여받음 (`static final long serialVersionUID`)
    - 만약 이 번호를 명시하지 않는다면 시스템이 런타임에 클래스 이름, 인터페이스 등 클래스 멤버를 고려해 생성해 부여
    - 그래서 나중에 편의 메서드를 추가하는 식으로 이들 중 하나라도 수정한다면 직렬 버전 UID 값도 변한다
    - 즉, 자동 생성되는 값에 의존하면 쉽게 호환성이 깨져버려 `InvalidClassExcepton`이 발생할 것

2. 버그와 보안 구멍이 생길 위험이 높아진다.
- 역직렬화는 '숨은 생성자'이다.
- 전면에 드러나지 않으므로 "생성자에서 구축한 불변식을 모두 보장해야 하고, 생성 도중 공격자가 객체 내부를 들여다 볼 수 없도록 해야 한다"는 사실을 떠올리기 쉽지 않다.

3. 해당 클래스의 신버전을 릴리즈할 때 테스트할 것이 늘어난다.
- 직렬화 가능 클래스가 수정되면 신버전 인스턴스를 직렬화한 후 구버전으로 역직렬화할 수 있는지, 그 반대도 가능한지 검사해야 함
- 테스트 해야할 양이 직렬화 가능 클래스의 수와 리리리즈 횟수에 비례해 증가

====> Serializable 구현 여부는 가볍게 결정할 사안이 아니다.

### 아이템 87. 커스텀 직렬화 형태를 고려해보라

- 객체의 물리적 표현과 논리적 내용이 같다면 기본 직렬화 형태라도 무방하다
```java
public class Name implements Serializable {
    private final String lastName;
    private final String firstName;
    private final String middleName
}
```

- 적합하지 않은 클래스
```java
public final class StringList implements Serializable {
    private int size = 0;
    private Entry head = null;

    private static class Entry implements Serializable {
        String data;
        Entry next;
        Entry previous;
    }
}
```
  - 논리적으로 이 클래스는 일련의 문자열을 표현
  - 물리적으로는 문자열들을 이중 연결 리스트로 연결
  - 이 클래스에 기본 직렬화 형태를 사용하면 각 노드의 양방향 연결 정보를 포함해 모든 엔트리를 철두철미하게 기록

- 이 때 생기는 문제점 네가지
  1. 공개 API가 현재의 내부 표현 방식에 영구히 묶인다.
    - StringList.Entry가 공개 API가 되어버린다. 내부 표현 방식을 바꾸더라도 StringList 클래스는 여전히 연결 리스트로 표현된 입력도 처리할 수 있어야 한다. 즉, 연결리스트를 더는 사용하지 않더라도 관련 코드를 절대 제거할 수 없다.
  2. 너무 많은 공간을 차지할 수 있다.
  3. 시간이 너무 많이 걸릴 수 있다.
  4. 스택 오버플로를 일으킬 수 있다.

=> 어떻게 바꾸면 좋을까?
```java
// 합리적인 커스텀 직렬화 형태를 갖춘 StringList

public final class StringList implements Serializable {
    private transient int size = 0;
    private transient Entry head = null;

    // NO 직렬화
    private static class Entry {
        String data;
        Entry next;
        Entry previous;
    }

    public final void add(String s) {...}

    private void writeObject(ObjectOutputStream s) {
        s.defaultWriteObject();
        // ...   
    }

    private void readObject(ObjectOutputStream s) {
        // ...
    }
}
```
- defaultWriteObject를 호출하면 transient로 선언하지 않은 모든 인스턴스 필드가 직렬화됨
  - => transient로 선언해도 되는 인스턴스 필드에는 모두 transient 한정자를 붙여야 함
  - => 해당 객체의 논리적 상태와 무관한 필드라고 확실할 때만 transient 한정자를 생략해야 한다

- 어떤 직렬화 형태를 택하든 직렬화 가능 클래스 모두에 직렬 버전 UID를 명시적으로 부여하자
```java
private static final long serialVersionUID = <무작위로 고른 Long 값>;
```

### 아이템 88. readObject 메서드는 방어적으로 작성하라

- readObject 메서드가 실질적으로 또 다른 public 생성자이기 때문에 다른 생성자와 똑같은 수준으로 주의를 기울여야 한다.
- 인수가 유효한지 검사해야 하고 필요하다면 매개변수를 방어적으로 복사해야 한다.

```java
// 허용되지 않는 Period 인스턴스를 생성할 수 있음

private static final byte[] serializedForm = {
    (byte)0xac, (byte)0xed, 0x00, 0x05, ...
};

public static void main(String[] args) {
    Period p =  (Period) deserialize(serializedForm);
}

static Object deserialized(byte[] sf) {
    try {
        return new ObjectInputStream(new ByteArrayInputStream(sf)).readObject();
    } 
    // ...
}
```

```java
// 유효성 검사를 수행하는 readObject 메서드 - 아직 부족하다!
private void readObject(ObjectInputStream s) {
    s.defaultReadObject();

    // 불변식을 만족하는지 검사
    if (start.compareTo(end) > 0) {
        throw new InvalidObjectException();
    }
}
```

- 가변 공격이 가능
  - 공격자는 정상 Period 인스턴스에서 시작된 바이트 스트림 끝에 prviate Date 필드로의 참조를 추가하면 가변 Period 인스턴스를 만들어낼 수 있음
  - ObjectInputStream에서 Period 인스턴스를 읽은 후 스트림 끝에 추가된 이 '악의적인 객체 참조'를 읽어 Period 객체의 내부 정보를 얻을 수 있음
  - 이 참조로 얻은 Date 인스턴스를 수정할 수 있으니 더이상 불변이 아니게 되는 것

```java
// 방어적 복사 추가
private void readObject(ObjectInputStream s) {
    s.defaultReadObject();

    start = new Date(start.getTime());
    end = new Date(end.getTime());

    // 불변식을 만족하는지 검사
    if (start.compareTo(end) > 0) {
        throw new InvalidObjectException();
    }
}
```


### 아이템 89. 인스턴스 수를 통제해야 한다면 readResolve 보다는 열거 타입을 사용하라

- readResolve 기능을 사용하면 readObject 가 만들어낸 인스턴스를 다른 것으로 대체할 수 있다.
- 역직렬화한 객체의 클래스가 readResolve 메서드를 적절히 정의해뒀다면, 역직렬화  후 새로 생성된 객체를 인수로 이 메서드가 호출되고, 이 메서드가 반환한 개체 참조가 새로 생성된 객체를 대신해 반환한다.
- 이 때 새로 생성된 객체의 참조는 유지하지 않으므로 바로 가비지 컬렉션 대상이 된다.

```java
public class Elvis {
    public static final Elvis INSTANCE = new Elvis();
    private Elvis() {

    }
    
    private String[] favoriteSongs = {"here", "i", "am"};
}
```

```java
// 인스턴스 통제를 위한 readResolve - 개선의 여지가 있음
prviate Object readResolve() {
    return INSTANCE;
}
```

- 사실 ReadResolve를 인스턴스 통제 목적으로 사용한다면 객체 참조 타입 인스턴스 필드는 모두 transient로 선언해야 한다.

```java
private static final byte[] serializedForm = {
    (byte)0xac, (byte)0xed, 0x00, 0x05, ...
};

public static void main(String[] args) {
    Elvis elvis = (Elvis) deserialize(serializedForm);
    Elvis impersonator = ElvisStrealer.impersonator;

    elvis.printFavorites();
    impersonator.printFavorites();
}
```

```java
// 열거 타입 싱글턴 - 전통적인 싱글턴보다 우수하다.
public enum Elvis {
    INSTANCE;
    private String[] favoriteSongs = {"here", "i", "am"};
}
```

### 아이템 90. 직렬화된 인스턴스 대신 직렬화 프록시 사용을 검토하라
- 직렬화 프록시 패턴
  - 바깥 클래스의 논리적 상태를 정밀하게 표현하는 중첩 클래스를 설계해 private static으로 선언하라
  - 이 중첩 클래스가 바로 바깥 클래스의 직렬화 프록시다
  - 중첩 클래스의 생성자는 단 하나여야 하며, 바깥 클래스를 매개변수로 받아야 함

```java
private static class SerializationProxy implements Serializable {
    private final Date start;
    private final Date end;

    SerializationProxy(Period p) {
        this.start = p.start;
        this.end = p.end;
    }

    private Object readResolve() {
        return new Period(start, end);
    }
}
```


```java
// Period.java

private Object writeReplace() {
    return new SerializationProxy(this);
}

private void readObject(ObjectInputStream stream) {
    throw ne InvalidObjectExceptioN("proxy가 필요합니다");
}


```
