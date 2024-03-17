# 5주차

# 📌 인상 깊었던 내용

## **📚 와일드 카드 사용(from. chatGPT)**

1. **컬렉션의 읽기 전용성(Read-only)**:
    - 메서드가 컬렉션을 인수로 받을 때, 해당 메서드에서는 컬렉션을 읽기만 하고 수정하지 않는 경우가 있습니다. 이때 와일드카드를 사용하여 컬렉션의 요소 타입에 제약을 두지 않고 읽기 전용으로 사용할 수 있습니다.

```java
javaCopy code
import java.util.List;

public class ReadOnlyExample {
    public static void printAnimals(List<? extends Animal> animals) {
        for (Animal animal : animals) {
            System.out.println(animal);
        }
    }

    public static void main(String[] args) {
        List<Dog> dogs = List.of(new Dog(), new Dog());
        printAnimals(dogs);
    }
}

```

1. **컬렉션의 추가 가능성(Write-only)**:
    - 메서드가 컬렉션을 인수로 받을 때, 해당 메서드에서는 컬렉션에 요소를 추가할 수 있지만, 요소를 읽거나 수정하지는 않는 경우가 있습니다. 이때 와일드카드를 사용하여 컬렉션의 요소 타입에 제약을 두지 않고 요소를 추가할 수 있습니다.

```java
javaCopy code
import java.util.List;

public class WriteOnlyExample {
    public static void addAnimal(List<? super Dog> animals) {
        animals.add(new Dog());
    }

    public static void main(String[] args) {
        List<Animal> animalList = new ArrayList<>();
        addAnimal(animalList);
    }
}

```

1. **제네릭 메서드에서 타입 안정성 보장**:
    - 제네릭 메서드가 여러 타입의 컬렉션을 다룰 때, 와일드카드를 사용하여 타입 안정성을 보장할 수 있습니다.

```java
javaCopy code
import java.util.List;

public class GenericMethodExample {
    public static <T> void printList(List<? extends T> list) {
        for (T item : list) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {
        List<String> stringList = List.of("Hello", "World");
        printList(stringList);

        List<Integer> integerList = List.of(1, 2, 3);
        printList(integerList);
    }
}

```

위 예시에서는 각각 읽기 전용, 쓰기 전용, 제네릭 메서드에서 와일드카드를 사용하여 각각의 상황에서 유연성과 안정성을 확보할 수 있습니다.

> 📕 p 번째 (장)
> 

### **🧐 : 와일드 카드를 사용해야 하는 이유, 숙지해보자**

## **📚 공변, 불공변**

```jsx
static void printArray(Object[] arr) {
	for (Object e : arr) {
		System.out.println(e);
	}
}

static void printCollection(Collection<Object> c) {
	for (Object e : c) {
		System.out.println(e);
	}
}

public static void main(String[] args) {
	Integer[] integers = new Integer[]{1, 2, 3};
	printArray(integers); // 컴파일 성공(공변)
	List<Integer> list = Arrays.asList(1, 2, 3); 
	printCollection(list); // 컴파일 오류(불공변)
}
```

> 공변 : 하위 타입 호환
불공변 : 하위 타입 불호환

📕 164p 1번째 (28장)
> 

### **🧐 : 제네릭은 불공변이다. 숙지하자!!**

## **📚 @SafeVarargs**

```jsx
public class SafeVarargsExample {
	@SafeVarargs
	public static <T> void printList(T... list) {
		for (T item : list) {
			System.out.println(item);
		}
	}

	public static void main(String[] args) {
	    printList(1, 2, 3); // 컴파일러가 경고를 발생시키지 않음
	    printList("Hello", "World"); // 컴파일러가 경고를 발생시키지 않음
	    // 만약 @SafeVarargs 어노테이션이 없었다면 컴파일러는 가변인자와 관련된 경고를 발생시켰을 것입니다.
	}
}
```

> 예컨대 제네릭 컬렉션에서는 자신의 원소 타입을 담은 배열을 반환하는 게 보통은 불가능하다. 또한 제네릭 타입과 가변인수 메서드를 함께 쓰면 해석하기 어려운 경고 메시지를 받게 된다. 이 문제는 @SafeVarargs 애너테이션으로 대처할 수 있다

📕 166p 13번째 (28장)
> 

### **🧐 : 가변인수를 제네릭으로 사용할때는 @SafeVarargs 애노테이션을 사용해보자**

# 📌 이해가 가지 않았던 내용

## **📚 로타입과 ?의 차이**

```jsx
public class RawTest {
	private Set<?> sets1;
	private Set sets2;
	public void test(Object a) {
		sets1.add(a); // 컴파일 실패
	}

	public void test2(Object a) {
		sets2.add(a);
	}
}

// 예제에서 보여준 코드(와일드 카드라 어떤 유형도 못받는다)
static int numElementsInCommon(Set<?> s1, Set<?> s2) {
	int result = 0;
	s1.add(1);
	for (Object o1 : s1) {
		if (s2.contains(o1)) {
			result++;
		}
	}
	return result;
}
	
// 예제에서 보여준 코드(로타입이라 목록에 어떤 유형이든 추가로 받을수 있다)
static int numElementsInCommon2(Set s1, Set s2) {
	int result = 0;
	s1.add(1);
	for (Object o1 : s1) {
		if (s2.contains(o1)) {
			result++;
		}
	}
	return result;
}
```

> 비한정적 와일드카드 타입인 Set<?>와 로 타입인 Set의 차이는 무엇일까? 
특징을 간단히 말하자면 와일드카드 타입은 안전하고, 로 타입은 안전하지 않다. 로 타입 컬렉션에는 아무 원소나 넣을 수 있으니 타입 불변식을 훼손하기 쉽다. 반면, Collection<?>에는 (null 외에는) 어떤 원소도 넣을 수 없다. 

📕 158p 8번째 (26장)
> 

### **🧐 : 흠.. 로타입은 런타임에 오류가 발생할수 있는 위험이 있다는걸 알겠는데.. 와일드 카드를 쓸 일이 있을까..?**

# 📌 논의해보고 싶었던 내용
