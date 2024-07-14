# 아이템 51. 메서드 시그니처를 신중히 설계하라

- API 설계에 있어 중요한 포인트를 정리해보자

## 메서드 이름을 신중히 짓자

- 같은 패키지에 속한 다른 이름들과 일관되게 짓는 게 최우선 목표다
    
    ```jsx
    // 경험상 일관되지 않는 명명들
    // 1. 복수형태
    getItems()
    getItemList()
    
    // 2. 조회
    getItem()
    findItem()
    
    // 3. 업데이트 리턴결과
    void update()
    boolean update()
    Entity update()
    
    // 4. 도메인 이름을 메서드에 포함시킬지?
    class AddressService {
    	Item getAddress()
    	Item get()
    }
    ```
    
- 긴 이름은 피하자? → 이건 동의 못함!😤😤
    
    ```jsx
    // 조회조건을 명확하게 명시하는게 좋지 않을까?
    findPerson(String Address)
    findPersonByAddress(String Address)
    
    // 이건 조금 호불호가 있을지도?
    updateDoc(String content)
    updateDocument(String content)
    
    // 이건 조금 호불호가 있을지도? 222
    updateInfo()
    updateInformation()
    ```
    
- 자바 라이브러리의 API 참조하자
    
    ```jsx
    // String 클래스
    public boolean equalsIgnoreCase(String anotherString)
    public int compareTo(String anotherString)
    public boolean startsWith(String prefix, int toffset)
    ```
    

## 편의 메서드를 너무 많이 만들지 말자

- 메서드가 너무 많으면 이를 구현하는 사람과 사용하는 사람 모두를 고통스럽게 한다
- 클래스나 인터페이스는 자신의 각 기능을 완벽히 수행하는 메서드로 제공해야 한다

## 매개변수 목록은 짧게 유지하자

- 4개 이하가 좋다
- 매개변수 목록을 줄여주는 세 가지 방법
    1. 메서드를 쪼갠다
    2. 매개변수 목록을 묶어주는 도우미 클래스를 만든다
    3. 1,2번을 합친 것으로 도우미 클래스를 만들고 메서드 내부에서 세부 메서드로 쪼개고 필요한 데이터만 사용하도록 한다

## 매개변수의 타입으로는 클래스보다는 인터페이스가 더 낫다

- 확장성을 고려할때 더 유용하다

## boolean보다는 원소 2개까지 열거 타입이 낫다

- 열거 타입을 사용하면 코드를 읽고 쓰기가 더 쉬워진다

# 아이템 52. 다중정의는 신중히 사용하라

- 다음 코드의 출력은 어떻게 될까?

```jsx
public class CollectionClassifier {
	public static String classify(Set<?> s) {
		return "집합";
	}

	public static String classify(List<?> s) {
		return "리스트";
	}

	public static String classify(Collection<?> s) {
		return "그 외";
	}

	public static void main(String[] args) {
		Collection<?>[] collections = {
			new HashSet<String>(),
			new ArrayList<String>(),
			new HashMap<String, String>().values(),
		};

		for (Collection<?> c : collections) {
			System.out.println(classify(c));
		}
	}
}

```

- 의도한 대로 되지 않는 이유는 재정의한 메서드는 동적으로 선택되고, 다중정의한 메서드는 정적으로 선택되기 때문이다
- 이는 아래처럼 해결할수 있긴 하다

```jsx
public static String classify(Collection<?> c) {
	return c instanceOf Set ? "집합" :
					c instanceOf List ? "리스트" : "그 외";
}
```

- 그러나 다중정의가 혼동을 일으키는 상황을 피해야한다
- 또 다른 오해를 불러일으킬 수 있는 상황을 알아보자

```jsx
public class SetList {
	public static void main(String[] args) {
		Set<Integer> set = new TreeSet<>();
		List<Integer> list = new ArrayList<>();
		
		for (int i = -3; i < 3; i++) {
			set.add(i);
			list.add(i);
		}
		
		for (int i=0; i < 3; i++) {
			set.remove(i);
			list.remove(i);
		}
		
		System.out.println(set + " " + list);
	}
}
```

- 그 이유는 List.remove 메서드가 remove(int index)를 사용하기 때문이다.
- 이는 명시적으로 파라미터가 값으로 인지할 수 있도록 타입 캐스팅을 해야 한다

```jsx
list.remove((Integer)i);
```

- 프로그래밍 언어가 다중정의를 허용한다고 해서 다중정의를 꼭 활용하란 뜻은 아니다. 일반적으로 매개변수 수가 같을 때는 다중정의를 피하는게 좋다.

# 아이템 53. 가변인수는 신중히 사용하라

- 가변인수 메서드는 명시한 타입의 인수를 0개 이상 받을 수 있다
- 가변인수 메서드를 호출하면, 가장 먼저 인수의 개수와 길이가 같은 배열을 만들고 인수들을 이 배열에 저장하여 가변인수 메서드에 건네준다

```jsx
static int sum(int... args) {
	int sum = 0;
	for (int arg : args) {
		sum += arg;
	}

	return sum;
}
```

- 가변인수는 몇 가지 단점이 있다
    1. 갯수가 0개도 허용하기 때문에 0개일 경우, 예외처리하려면 예외적용 코드가 필요하다
        
        ```jsx
        // 1. 사이즈 예외 처리한다
        static int sum2(int... args) {
        	if(args.length == 0){
        		throw new IllegalArgumentException("인수가 1개 이상 필요합니다");
        	}
        
        	int sum = 0;
        	for (int arg : args) {
        		sum += arg;
        	}
        
        	return sum;
        }
        
        // 2. 가변인수를 두번째 인수부터 시작하게 한다
        static int sum3(int first, int... args) {
        	int sum = 0;
        	for (int arg : args) {
        		sum += arg;
        	}
        
        	return sum;
        }
        ```
        
    2. 성능에 민감한 상황이라면 가변인수가 걸림돌이 될수 있다
        
        ```jsx
        public void foo() { }
        public void foo(int a1) { }
        public void foo(int a1, int a2) { }
        public void foo(int a1, int a2, int a3) { }
        public void foo(int a1, int a2, int a3, int... rest) { }
        ```
        
    - 인수 개수가 일정하지 않은 메서드를 정의해야 한다면 가변인수가 반드시 필요하다
    - 매서드를 정의할 때 필수 매개변수는 가변인수 앞에 두고, 가변인수를 사용할 때는 성능 문제까지 고려하자
    
# 아이템 54. null이 아닌, 빈 컬렉션이나 배열을 반환하라
    
```jsx
public List<Cheese> getCheese() {
return cheesesInStock.isEmpty() ? null
	: new ArrayList<>(cheeseInStock);
}
```
    
- 이는 많이 볼수 있는 코드다
- 하지만 이는 해당 메서드를 사용하는 쪽에서 null에 대한 방어 코드를 만들어두어야 하고, 그렇지 않으면 오류가 발생한다

```jsx
List<Cheese> cheeses = shop.getCheese();
if (cheeses != null && cheeses.contains(Cheese.STILTON))
	System.out.println("좋았어, 바로 그거야?");
```

- 그러므로 빈 리스트를 리턴하는게 더 효율적이다

```jsx
public List<Cheese> getCheeses() {
	return new ArrayList<>(cheesesInStock);
}

public List<Cheese> getCheeses2() {
	return cheesesInStock.isEmpty() ? Collections.emptyList()
		: new ArrayList<>(cheeseInStock);
}
```

- 배열도 마찬가지다. null 보다는 0짜리 배열을 리턴하는게 더 오류가능성이 적다

```jsx
public Cheese[] getCheeses() {
	retrun cheesesInStock.toArray(new Cheese[0]);
}
```

# 아이템 55. 옵셔널 반환은 신중히 하라

- 우리는 보통 null 보다는 옵셔널을 사용하는걸 권장한다

## 옵셔널을 사용하면 어떤게 좋을까?

- 기본값을 정해둘 수 있다

```jsx
String lastWordInLexicon = max(words).orElse("단어 없음...")
```

- 원하는 예외를 던질 수 있다

```jsx
Toy myToy = max(toys).orElseThrow(TemperTantrumException::new)
```

- 항상 값이 채워져 있다고 가정한다

```jsx
Element lastNobleGas = max(Elements.NOBLE_GASES).get()
```

- 여전히 적합한 메서드를 찾지 못했다면 isPresent 메서드를 사용해라

```jsx
Optional<ProcessHandle> parentProcess = ph.parent();
System.out.println("부모 PID: " + (parentProcess.isPresent() ?
	String.valueOf(parentProcess.get().pid()) : "N/A"));
```

## 반환값으로 옵셔널을 사용한다고 해서 무조건 득이 되는 건 아니다

- 컬렉션, 스트림, 배열, 옵셔널 같은 컨테이너 타입은 옵셔널로 감싸면 안 된다
- 결과가 없을 수 있으며, 클라이언트가 이 상황을 특별하게 처리해야 한다면 Optional<T>를 반환한다
- 박싱된 기본 타입을 담는 옵셔널은 기본 타입 자체보다 무거울 수밖에 없다
- 이때는 자바에서 기본으로 제공해주는 OptionalInt, OptionalLong, OptionalDouble을 사용하자
