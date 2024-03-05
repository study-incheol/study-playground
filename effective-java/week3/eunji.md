### 📌 인상깊었던 부분
#### 아이템 15. 클래스와 멤버의 접근 권한을 최소화하라
```
단지 코드를 테스트하려는 목적으로 클래스, 인터페이스, 멤버의 접근 범위를 넓히려 할 때가 있다.
적당한 수준까지는 넓혀도 괜찮다.
에를 들어 public 클래스의 private 멤버를 package-private까지 풀어주는 것은 허용할 수 있지만, 그 이상은 안 된다.
다행히 이렇게 해야 할 이유도 없다.
테스트코드를 테스트 대상과 같은 패키지에 두면 package-private 요소에 접근할 수 있기 때문이다.
```
- 자주 논의되는 부분이었던 것 같은데, 이 책에서는 이렇게 말해주고 있다.

```
(변경 전)
public static final Thing[] VALUES = { ... };

(변경 후)
private static final Thing[] PRIVATE_VALUES = { ... };
public static final Thing[] values() { return PRIVATE_VALUES.clone(); }
```
- public static final 필드가 참조하는 객체가 불변인지 확인하라.

#### 아이템 16. public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라
- package-private 클래스나 private 중첩 클래스에서는 종종 필드를 노출하는 편이 나을 때도 있다.


## 📌 논의해보고 싶었던 내용
- package-private 클래스를 사용하는 경우가 급궁금해졌다.

클래스를 불변으로 만들기 위해서 따르는 규칙 중 아래 규칙 잘 지키고 있나? -> 대부분 잘 지키고 있었음
- 모든 필드를 final로 선언한다.
