### 아이템14. comparable을 구현할지 고려하라
- comparable과 comparator의 차이를 알아보자
  - comparalbe: 자기 자신과 매개변수 객체를 비교
  - comparator: 두 매개변수 객체를 비교

### 아이템12. hashCode도 재정의하라
- hashmap에서 내부적으로 key가 같은지 판단할 때 hashCode를 활용한다
- 보통 hashCode를 생성하는 방법은?
```java
	public int hashCode() {
		return HashCodeBuilder.reflectionHashCode(this);
	}
```
```java
  public int hashCode() {
		return Objects.hash(message, code, messageCode, status);
	}
```
- hashCode를 만드는 전략
  - ramdom 함수, 메모리 주소, 고정된 1, 연속된 시퀀스, 메모리 주소를 int로, XOR 쉬프트를 통한 스레드 상태를 기반으로 생성
