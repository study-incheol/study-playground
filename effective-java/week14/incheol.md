# 아이템 71. 필요 없는 검사 예외 사용은 피하라

- Checked Exception은 발생한 문제를 프로그래머가 처리하여 안전성을 높이게 된다
- 스트림의 경우에는 예외를 던질 수 없기 때문에 예외에 대한 처리가 더 어려워졌다
- Checked Exception을 사용하는건 해당 메서드를 사용하는 사용자에게 부담이 될수 있으니 다음과 같은 상황에서만 전달하는게 좋다
    1. API를 제대로 사용해도 발생할 수 있는 예외
    2. 프로그래머가 의미 있는 조치를 취할 수 있을 경우
- 더 나은 방법이 없다면 unChecked Exception을 선택해라

```jsx
} catch (TheCheckedException e) {
		throw new AssertionError(); // 일어날 수 없다!
}

} catch (TheCheckedException e) {
		e.printStackTrace(); // 이런, 우리가 졌다.
		System.exit(1)l;
}
```

- 이미 Checked Exception을 던지고 있는 경우엔, 하나더 추가하는건 큰 문제는 아니다..
- 다만, 기존에 예외처리가 없다가 신규로 Checked Exception을 던지는 경우엔 사용자에게 부담이 될수 있다

## Checked Exception 대신 사용

### 리턴값을 활용하라

```jsx
catch (TheCheckedException e) {
		return Person(id = -1);
}

catch (TheCheckedException e) {
		return Optional.empty();
}
```

- Checked Exception을 회피하는 가장 쉬운 방뻐은 결과 타입을 담은 옵셔널을 반환하는 것이다
- 이 방식의 단점은 예외가 발생한 이유를 알려주는 부가 정보를 담을 수 없다는 것이다

### 메서드를 쪼개어 비검사 예외로 전환한다

```jsx
// as-is
try {
    obj.action(args);
} catch (TheCheckedException e) {
    ... // 예외 상황에 대처한다.
}

// to-be
if (obj.actionPermitted(args)) {
    obj.action(args);
} else {
    ... // 예외 상황에 대처한다.
} 

class TestObject {
    public void action(String[] args) {
        throw new TheUncheckedException();
    }

    public boolean actionPermitted(String[] args) {
		    // 상태 검사 로직을 수행한다.
		    String input = args[0];
		    if(input == "exit") {
			    return false;
		    }

        return true;
    }
}
```

- actionPermitted 예외를 던질지 boolean 값으로 반환한다
- action 메서드는 UnChecked Exception으로 변경한다

# 아이템 72. 표준 예외를 사용하라

```jsx
public void update(Long id) {
	if (id == -1) {
			throw NotExistPersonException(); // 커스텀 예외
	}
}

public void update(Long id) {
	if (id == -1) {
			throw IllegalArgumentException(); // 표준 예외
	}
}
```

## 표준 예외를 사용하면 좋은점

1. 가장 큰 장점은 다른 사람이 익히고 사용하기 쉬워진다는 것이다
2. 클래스 수가 적을수록 메모리 사용량도 줄고 클래스를 적재하는 시간도 적게 걸린다

## 추천하는 표준 예외

- IndexOutOfBoundsException : 어떤 시퀀스의 허용 범위를 넘는 값을 건넬 때로 IllegalArgumentException 보다는 IndexOutOfBoundsException을 사용하는게 좋다
- ConcurrentModificationException : 단일 스레드에서 사용하려고 설계한 객체를 여러 스레드가 동시에 수정하려 할때 사용하는게 좋다
- UnsupportedOperationException : 클라이언트가 요청한 동작을 대상 객체가 지원하지 않을 때 던지는게 좋다

## 주의사항

- Exception, RunTimeException, Throwable, Error는 직접 재사용하지 말자
- 이 클래스들은 추상 클래스라고 생각하길 바란다(여러 성격의 예외들을 포괄하는 클래스이므로 안정적으로 테스트할 수 없다ㅜ)
- 인수 값이 무엇이었든 어차피 실패했을거라면 IllegalStateException을, 그렇지 않으면 IllegalArgumentException을 던지자

# 아이템 73. 추상화 수준에 맞는 예외를 던지라

- 메서드가 저수준 예외를 처리하지 않고 바깥으로 전파하면 종종 당황할때가 있다
- 이 문제를 피하려면 상위 계층에서는 저수준 예외를 잡아 자신의 추상화 수준에 맞는 예외로 바꿔 던져야 한다

```jsx
try {
		... // 저수준 추상화를 이용한다
} catch (LowerLevelException e) {
		// 추상화 수준에 맞게 번역한다.
		throw new HigherLevelException(...);
}
```

## 예외 연쇄

- 저수준 예외가 디버깅에 도움이 된다면 예외 연쇄를 사용하는 게 좋다
- 예외 연쇄는 문제의 근본 원인(cause)인 저수준 예외를 고수준 예외에 실어 보내는 방식이다

```jsx
try {
		... // 저수준 추상화를 이용한다
} catch (LowerLevelException e) {
		// 추상화 수준에 맞게 번역한다.
		throw new HigherLevelException(e);
}
```

## 주의사항

- 무턱대고 예외를 전파하는 것보다야 예외 번역이 우수한 방법이지만, 그렇다고 남용해서는 곤란하다
- 가능하다면 저수준 메서드가 반드시 성공하도록하여 아래 계층에서는 예외가 발생하지 않도록 하는 것이 최선이다
- 아래 계층에서 예외를 치할 수 없다면, 상위 계층에서 그 예외를 조용히 처리하여 문제를 호출자에게까지 전파하지 않는 방법도 고려해 보아라

# 아이템 74. 메서드가 던지는 모든 예외를 문서화하라

- Checked Exception은 항상 선언하고, 각 예외가 발생하는 상황을 자바독의 @throws 태그을 사용하여 정확히 문서화하자
- 단, unChecked Exception은 메서드 선언의 throws 목록에 넣지 말자

```jsx
/**
 * 이 메서드는 주어진 인덱스의 요소를 반환합니다.
 * 인덱스가 배열의 범위를 벗어나는 경우 {@link ArrayIndexOutOfBoundsException}이 발생할 수 있습니다.
 *
 * @param array 검색할 배열
 * @param index 가져올 인덱스
 * @return 지정된 인덱스의 요소
 * @throws NullPointerException 배열이 null인 경우
 */
public Object getElement(Object[] array, int index) {
    // 메서드 구현
}
```

- unChecked Exception을 모두 문서화하라고는 했지만 현실적으로 불가능할 때도 있다
- 처음엔 모든 비검사 예외를 공들여 무서화했지만 추후, 새로운 외부 클래스를 사용하면서 비검사 예외를 추가하게 될 수도 있다
- 문서화를 효율적으로 하는 방법으로 한 클래스에 정의된 많은 메서드가 같은 이유로 같은 예외를 던진다면 그 예외를 (각각의 메서드가 아닌) 클래스 설명에 추가하는 방법도 있다

```jsx
/**
 * 이 클래스는 다양한 유틸리티 메서드를 제공합니다.
 * 모든 메서드는 null 인수에 대해 {@link NullPointerException}을 발생시킬 수 있습니다.
 */
public class MyUtilityClass {
    
    public void method1(Object obj) {
        // obj가 null이면 NullPointerException이 발생
    }

    public void method2(Object obj) {
        // obj가 null이면 NullPointerException이 발생
    }
}
```

# 아이템 75. 예외의 상세 메시지에 실패 관련 정보를 담으라

- 예외를 잡지 못해 프로그램이 실패하면 자바 시스템은 그 예외의 스택 추적(stack trace) 정보를 자동으로 출력한다
- 실패 순간을 포착하려면 발생한 예외에 관려된 모든 매개변수와 필드의 값을 실패 메시지에 담아야 한다
- IndexOutOfBoundsException 클래스도 아래와 같이 구체적인 실패 원인을 노출했으면 어땠을까 하는 생각이 든다(지은이 생각 🙂)

```jsx
public IndexOutOfBoundsException(String s, int index, int lowerBound, int upperBound) {
    super(s + ": Index " + index + " out of bounds for length " + (upperBound - lowerBound));
}
```
