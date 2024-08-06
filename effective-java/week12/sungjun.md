# 아이템 61. 박싱된 기본 타입보다는 기본 타입을 사용하라

- 기본 타입 : int, double, boolean ...
- 참조 타입( =: 박싱된 기본 타입, 기본 타입에 대응하는 참조 타입이 하나씩 있다) : Integer, Double, Boolean ...

- 기본 타입과 박싱된 기본 타입의 주된 차이는 크게 3가지
  - 기본 타입은 값만 가지고 있으나, 박싱된 기본 타입은 값에 더해 식별성(identity)이란 속성을 갖는다. 값이 같아도 다르다고 식별 될 수 있다.
  - 기본 타입의 값은 언제나 유효하나, 박싱된 기본 타입은 유효하지 않은 값, 즉 null을 가질 수 있다.
  - 기본 타입이 박싱된 기본 타입보다 시간과 메모리 사용면에서 더 효율적이다

```java
Comparator<Integer> naturalOrder =
        (i, j) -> (i < j) ? -1 : (i == j ? 0 : 1);
```

- 위 구현의 결함을 찾아보자
  - naturalOrder.compare(new Integer(42), new Integer(42)) 
  - 결과값은 0을 기대하지만 실제로는 1을 출력한다. i == j 검사에서는 두 객체 참조의 식별성을 검사하게 되기 때문이다.
  - 박싱된 기본 타입에 == 연산자를 사용하면 오류가 일어난다.
  - 기본 타입을 다루는 비교자가 필요하다면 Compartor.naturalOrder()를 이용하거나 아래와 같이 지역변수를 두어 비교를 기본 타입 변수로 수행해야 한다.

```java
Comparator<Integer> naturalOrder = (iBoxed, jBoxed) -> {
        int i = iBoxed, j = jBoxed; 
        return i < j ? -1 : (i == j ? 0 : 1);
};
```

```java
public class Unbelievable {
    static Integer i;
    
    public static void main(String[] args) {
        if (i == 42) 
            System.out.println("믿을 수 없군!");
    }
}
```

- 위 구현의 결과
  - NullPointerException이 발생한다

```java
public static void main(String[] args) {
    Long sum = 0L;
    for (long i = 0; i <= Integer.MAX_VALUE; i++) {
        sum += i;
    }
    System.out.println(sum);
}
```

- 위 구현의 결과
  - 박싱과 언박싱이 반복해서 일어나 체감될 정도로 성능이 느려진다.
  
- 박싱된 기본 타입은 컬렉션의 원소, 키, 값으로 쓰거나 타입 매개변수로 쓰고 평소에는 기본 타입을 사용하라.
  - 그냥 다 박싱된 기본 타입으로 쓰면 안되나...?

# 아이템 62. 다른 타입이 적절하다면 문자열 사용을 피하라

- 문자열 타입 String 을 남발하지 말아라. 남발하는 경우가 너무 많다.
  - 문자열은 열거 타입을 대신하기에 적합하지 않다. 
  - 문자열은 혼합 타입을 대신하기에 적합하지 않다.
    - ex. String compoundKey = className + "#" + i.next();
  - 문자열은 권한을 표현하기에 적합하지 않다.

# 아이템 63. 문자열 연결은 느리니 주의하라

- 문자열 연결 연산자(+)는 여러 문자열을 하나로 합쳐주는 편리한 수단이다.
  - 단, 본격적으로 사용하기 시작한다면 성능 저하를 감내하기 어렵다.
  - 문자열 연결 연산자로 문자열 n 개를 잇는 시간은 n 제곱에 비례한다.
  - 문자열은 불변이라서 두 문자열을 연결할 경우 양쪽의 내용을 모두 복사해야하므로 성능 저하는 피할 수 없는 결과다

```java
public String statement() {
    String result = "";
    for (int i = 0; i < numItems(); i++)
        result += lineForItem(i);
    return result;
}
```

- 위 코드는 품목이 많을 경우 심각하게 느려질 수 있으므로 성능을 포기하고 싶지 않다면 StringBuilder를 사용하자.

```java
public String statement2() {
    StringBuilder b = new StringBuilder(numItems() * LINE_WIDTH);
    for (int i = 0; i < numItems(); i++)
        b.append(lineForItem(i));
    return b.toString();
}
```

# 아이템 64. 객체는 인터페이스를 사용해 참조하라

- 적합한 인터페이스만 있다면 매개변수뿐 아니라 반환값, 변수, 필드를 전부 인터페이스 타입으로 선언하라. 객체의 실제 클래스를 사용해야 할 상황은 오직 생성자로 생성할 때뿐이다.
- Set 인터페이스를 구현한 LinkedHashSet 변수를 선언하는 올바른 모습
  ```java
  Set<Son> sonSet = new LinkedHashSet<>();
  ```
- 클래스를 타입으로 사용한 불량한 모습 
  ```java
  LinkedHashSet<Son> sonSet = new LinkedHashSet<>();
  ```
- 인터페이스를 타입으로 사용하는 습관을 기르면 프로그램이 훨씬 유연해질 것이다
  ```java
  Set<Son> sonSet = new HashSet<>();
  ```

- 주의할점은 원래의 클래스가 인터페이스의 규약 이외의 특별한 기능을 제공하며, 주변 코드가 이기능에 기대어 동작한다면 새로운 클래스도 반드시 같은 기능을 제공해야한다.
- 구현 타입을 바꾸려하는 동기는 뭘까? 원래 것보다 성능이 좋거나 멋진 신기능을 제공하기 때문일 수 있다. HashMap 대신 LinkedHashMap을 써 순회 순서를 예측할 수 있다.
- 선언 타입과 구현 타입을 동시에 바꿀 수 있으니까 변수를 구현 타입으로 선언해도 괜찮다고 생각할 수 있다
  - 클라이언트에서 기존 타입에서만 제공하는 메서드를 사용했거나, 기존 타입을 사용해야하는 다른 메서드에 그 인스턴스를 넘기면 새로운 코드에서는 컴파일 되지 않는다.
  
- 적합한 인터페이스가 없다면 당연히 클래스로 참조해야한다.
  - String, BigInteger 같은 값 클래스들은 여러가지로 구현될 수 있다고 생각하고 설계하는 일은 거의 없다. 이런 값 클래스는 매개변수, 변수, 필드, 반환 타입으로 사용해도 무방하다.
  - OutputStream 같이 클래스 기반으로 작성된 프레임워크가 제공하는 객체들도 적합한 인터페이스가 없다.
  - priorityQueue 클래스와 같이 Queue 인터페이스에는 없는 특별한 메서드를 제공하는 클래스도 적합한 인터페이스가 없다. comparator 메서드를 제공. comparator 메서드를 쓸때만 클래스 타입을 직접 사용하는것으로 이외에는 남발하지 말자.
  
- 적합한 인터페이스가 없다면 클래스의 계층구조 중 필요한 기능을 만족하는 가장 덜 구체적인(상위의) 클래스를 타입으로 사용하자.

# 아이템 65. 리플렉션보다는 인터페이스를 사용하라

- 리플렉션 기능(java.lang.reflect)을 이용하면 프로그램에서 임의의 클래스에 접근할 수 있다. 
  - Class 객체가 주어지면 그 클래스의 생성자, 메서드, 필드에 해당하는 Constructor, Method, Field 인스턴스를 가져올 수 있고, 이어서 이 인스턴스들로는 그 클래스의 멤버 이름, 필드 타입, 메서드 시그니처 등을 가져오거나 조작할 수 있다.
    
- 단점
  - 컴파일타임 타입 검사가 주는 이점을 하나도 누릴 수 없다. 예외 검사도 마찬가지. 리플렉션 기능을 써서 존재하지 않는 혹은 접근 불가한 메서드를 호출하려 시도하면 런타임 오류가 발생한다
  - 리플렉션을 이용하면 코드가 지저분하고 장황해진다. 
  - 성능이 떨어진다. 리플렉션을 통한 메서드 호출은 일반 메서드 호출보다 훨 느리다.
  
- 코드 분석 도구나 의존관계 주입 프레임워크처럼 리플렉션을 써야 하는 복잡한 애플리케이션이 일부 있으나 이런 도구들마저 리플렉션 사용을 줄이는 추세다.

- 리플렉션은 아주 제한된 형태로만 사용해야 그 단점을 피하고 이점만 취할 수 있다.

  ```java
  public static void main(String[] args) {
    // 클래스 이름을 Class 객체로 변환
    Class<? extends Set<String>> cl = null;
    try {
        cl = (Class<? extends Set<String>>) // 비검사 형변환
            Class.forName(args[0]);  
    } catch (ClassNotFoundException e) {
        fatalError("클래스를 찾을 수 없습니다.");
    }
  
    // 생성자를 얻는다.
    Constructor<? extends Set<String>> cons = null;
    try {
        cons = cl.getDeclaredConstructor();
    } catch (NoSuchMethodException e) {
        fatalError("매개변수 없는 생성자를 찾을 수 없습니다.");
    }
  
    // 집합의 인스턴스를 만든다.
    Set<String> s = null;
    try {
        s = cons.newInstance();
    } catch (IllegalAccessException e) {
        fatalError("생성자에 접근할 수 없습니다.");
    } catch (InstantiationException e) {
        fatalError("클래스를 인스턴스화할 수 없습니다.");
    } catch (InvocationTargetException e) {
        fatalError("생성자가 예외를 던졌습니다.");
    } catch (ClassCastException e) {
        fatalError("Set을 구현하지 않은 클래스입니다.");
    }
    
    // 생성한 집합을 사용한다.
    s.addAll(Arrays.asList(args).subList(1, args.length));
    System.out.println(s);
  }
  
  private static void fatalError(String msg) {
    System.err.println(msg);
    System.exit(1);
  }
  ```
  
- 위 프로그램은 Set<String> 인터페이스의 인스턴스를 생성하는데, 그 클래스는 명령줄의 첫 번째 인수로 확정한다. 그리고 생성한 집합(Set)에 두 번째 이후의 인수들을 추가한 다음 화면에 출력한다. 이 인수들이 출력되는 순서는 첫 번쨰 인수로 지정한 클래스가 HashSet 이면 무작위 순서가 될것이고, TreeSet을 지정하면 알파벳 순서로 출력될 것이다.
  - 간단한 프로그램이지만 위 기법은 상당히 강력하다. 손쉽게 제네릭 집합 테스터로 변신할 수 있다. Set 구현체를 공격적으로 조작해보며 Set 규약을 잘 지키는지 검사해볼 수 있다. 사실 이 기법은 완벽한 서비스 제공자 프레임워크를 구현할 수 있을 만큼 강력하다. 대부분의 경우 리플렉션 기능은 이정도만 사용해도 충분하다.
  - 이 예는 단점 두가지가 있다.
    - 런타임에 총 여섯 가지나 되는 예외를 던질 수 있다. 인스턴스를 리플렉션 없이 생성했다면 컴파일타임에 잡아낼 수 있었을 예외다.
    - 클래스 이름만으로 인스턴스를 생성해내기 위해 25줄이나 되는 코드를 작성했다. 원래는 생성자 호출 한 줄로 끝났을 일이다.
  
- 드물긴 하지만, 리플렉션은 런타임에 존재하지 않을 수도 있는 다른 클래스, 매서드, 필드와의 의존성을 관리할 때 적합하더. 이 기법은 버전이 여러 개 존재하는 외부 패키지를 다룰 때 유용하다. 가장 오래된 버전만을 지원하도록 컴파일한 후, 이후 버전의 클래스와 메서드 등은 리플렉션으로 접근하는 방식이다. 이렇게 하려면 접근하려는 새로운 클래스나 메서드가 런타임에 존재하지 않을 수 있다는 사실을 감안해야 한다. 즉, 같은 목적을 이룰 수 있는 대체 수단을 이용하거나 기능을 줄여 동작하는 등의 적절한 조치를 취해야한다.

- 리플렉션은 복잡한 특수 시스템을 개발할 때 필요한 강력한 기능이지만, 단점도 많다. 컴파일 타임에는 알 수 없는 클래스를 사용하는 프로그램을 작성한다면 리플렉션을 사용해야 할 것이다. 