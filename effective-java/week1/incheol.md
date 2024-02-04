# 📌 인상 깊었던 내용

## **📚 플라이웨이트 패턴**

> 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다
>
> 📕 9p 11번째 (1장)
>

**🧐 : Java에도 플라이웨이트 패턴이 적용된 사례가 있다! 문자열도 상수풀에서 관리된다
(Perm → MetaSpace)**

## **📚 문자열 패턴 매칭**

> String.matches는 정규표현식으로 문자열 형태를 확인하는 가장 쉬운 방법이지만, 성능이 중요한 상황에서 반복해 사용하기엔 적합하지 않다. 이 메서드가 내부에서 만드는 정규표현식용 Patten 인스턴스는, 한 번 쓰고 버려져서 곧바로 가비지 컬렉션 대상이 된다
>
> 📕 32p 7번째 (6장)
>

**🧐 : 오! 이건 꿀팁이다… Pattern은 상수로 관리해서 메모리를 효율적으로 사용해야겠다..** 👍

## **📚 try-with-resource**

> try-with-resources 버전이 짧고 읽기 수월할 뿐 아니라 문제를 진단하기도 훨씬 좋다
>
> 📕 49p 1번째 (9장)
>

**🧐 : try-with-resource 응용버전 (출처 :** https://www.baeldung.com/java-try-with-resources)

- 다중 리소스

```jsx
// 다중 리소스를 사용할 경우, 세미콜론으로 구분지으면 된다
try (Scanner scanner = new Scanner(new File("testRead.txt"));
    PrintWriter writer = new PrintWriter(new File("testWrite.txt"))) {
    while (scanner.hasNext()) {
	writer.print(scanner.nextLine());
    }
}

// 자바 9 이상은 아래와 같이도 사용 가능하다

final Scanner scanner = new Scanner(new File("testRead.txt"));
PrintWriter writer = new PrintWriter(new File("testWrite.txt"))
try (scanner;writer) { 
    // omitted
}
```

- **AutoCloseable 구현**

```jsx
public class AutoCloseableResourcesFirst implements AutoCloseable {

    public AutoCloseableResourcesFirst() {
        System.out.println("Constructor -&gt; AutoCloseableResources_First");
    }

    public void doSomething() {
        System.out.println("Something -&gt; AutoCloseableResources_First");
    }

    @Override
    public void close() throws Exception {
        System.out.println("Closed AutoCloseableResources_First");
    }
}
```

---

# 📌 이해가 가지 않았던 내용

## **📚 의존성 주입**

> 의존 객체 주입은 생성자, 정적 팩터리, 빌더 모두에 똑같이 응용할 수 있다
>
> 📕 29p 14번째 (5장)
>

**🧐 : 의존 객체 주입을 외부에서 호출하는건 이해했는데 만약 동적으로 의존 객체를 변경해야 할 경우에는… 어떻게 변경할수 있을까? 새로운 객체를 하나더 만들어야 할까..?**

---

# 📌 논의해보고 싶었던 내용

## **📚 이름을 가지는 정적 팩터리 메서드**

> 한 클래스에 시그니처가 같은 생성자가 여러 개 필요할 것 같으면, 생성자를 정적 팩터리로 메서드로 바꾸고 각각의 차이를 잘 드러내는 이름을 지어주자
>
> 📕 9p 7번째 (1장)
>

**🧐 : 파라미터가 다를때 차이를 잘 드러내는 이름은 어떻게 지어주는게 좋을까..? 나는 보통 of, fromXX, byXX 등등으로 사용하는데 기준이 없긴 하댜..ㅜ**