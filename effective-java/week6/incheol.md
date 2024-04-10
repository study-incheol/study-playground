# 📌 인상 깊었던 내용

## **📚 펙스(PECS) : producers-extends, consumer-super**

```jsx
public void pushAll(Iterable<? extends E> src) {
	for (E e : src) {
		push(e);
	}
}

public void popAll(Collection<? super E> dst) {
	while (!isEmpty()) {
		dst.add(pop());
	}
}
```

> 매개변수화 타입 T가 생산자라면 <? extends T>를 사용하고, 소비자라면 <? super T>를 사용하라. 

📕 184p 4번째 (31장)
> 

### **🧐 : 매개변수화 타입이 불공변일때 해결할수 있는 방안으로 숙지하자**

## **📚 제네릭 가변인수 메서드가 안전함을 보장하는 기준은 무엇일까?**

> @SafeVarargs 에너테이션은 메서드 작성자가 그 메서드가 타입 안전함을 보장하는 장치다. 
안전하다는건 메서드가 이 배열에 아무것도 저장하지 않고(그 매개변수들을 덮어쓰지 않고) 그 배열의 참조가 밖으로 노출되지 않는다면(신뢰할 수 없는 코드가 배열에 접근할 수 없다면) 타입 안전하다. 라고 볼수 있다

📕 192p 20번째 (32장)
> 

### **🧐 : @SafeVarargs 애너테이션을 붙일때 한번더 생각해보기로 하자**

# 📌 이해가 가지 않았던 내용

## **📚 차이가 있을까..?**

```jsx
public static <E> void swap(List<E> list, int i, int j)
public static void swap(List<?> list, int i, int j)

private static <E> void swapHelper(List<E> list, int i, int j) {
	list.set(i, list.set(j, list.get(i));
}
```

> 어떤 선언이 나을까? 더 나은 이유는 무엇일까? public API라면 간단한 두 번째가 낫다. 어떤 리스트든 이 메서드에 넘기면 명시한 인덱스의 원소들을 교환해줄 것이다. 
메서드 선언에 타입 매개변수가 한 번만 나오면 와일드카드로 대체하라. 이때 비한정적 타입 매개변수라면 비한정적 와일드카드로 바꾸고, 한정적 타입 매개변수라면 한정적 와일드카드로 바꾸면 된다. 
그리고 와일드카드 타입의 실제 타입을 알려주는 메서드를 private 도우미 메서드로 따로 작성하여 활용하면 List<?> 타입에 값도 변경할 수 있다

📕 188p 6번째 (31장)
> 

### **🧐 : helper 메서드의 구현은 결국엔 제네릭인데 public만 와일드 카드로 제한한다고 차이가 있을까..?**

# 📌 논의해보고 싶었던 내용

## **📚 enum 활용**

```jsx
enum PayrollDay {
	MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
	private static final int MINS_PER_SHIFT = 8 * 60;
	
	int pay(int minutesWorked, int payRate) {
		int basePay = minutestWorked * payRate;
		
		int overtimePay;
		switch(this) {
			case SATURDAY: case SUNDAY: // 주말
				overtimePay = basePay / 2;
				break;
			default: // 주중
				overtimePay = minutesWorked <= MINS_PER_SHIFT ? 0 : ...;
		}
		
		return basePay + overtimePay;
	}
}
```

> 주중에 오버타임이 발생하면 잔업수당이 주어지고, 주말에는 무조건 잔업수당이 주어진다. swtich 문을 이용하면 case 문을 날짜별로 두어 이 계산을 쉽게 수행할 수 있다

📕 217p 1번째 (34장)
> 

### **🧐 : enum 활용 어디까지 해봤는지 궁금하다 👀**
