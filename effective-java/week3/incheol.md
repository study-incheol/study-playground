# 📌 인상 깊었던 내용

## **📚 정보 은닉의 장점을 구체적으로 알아보자**

> - 시스템 개발 속도를 높인다. 여러 컴포넌트를 병렬로 개발할 수 있기 때문이다. 
> - 시스템 관리 비용을 낮춘다. 각 컴포넌트를 더 빨리 파악하여 디버깅할 수 있고, 다른 컴포넌트로 교체하는 부담도 적기 때문이다. 
> - 정보 은닉 자체가 성능을 높여 주지는 않지만, 성능 최적화에 도움을 준다. 
> - 소프트웨어 재사용성을 높인다. 외부에 거의 의존하지 않고 독자적으로 동작할 수 있는 컴포넌트라면 그 컴포넌트와 함께 개발되지 않은 낯선 환경에서도 유용하게 쓰일 가능성이 크기 때문이다. 
> - 큰 시스템을 제작하는 난이도를 낮춰준다. 
> 
> 📕 96p 11번째 (15장)
> 

### **🧐 : 캡슐화에 대해서 많이 이야기하지만 장점을 이렇게 다양한 관점에서 생각해본적은 없는것 같다**

## **📚 클래스를 불변으로 만드는 다섯가지 규칙**

> - 객체의 상태를 변경하는 메서드(변경자)를 제공하지 않는다
> - 클래스를 확장할 수 없도록 한다
> - 모든 필드를 final로 선언한다
> - 모든 필드를 private으로 선언한다
> - 자신 이외에 내부의 가변 컴포넌트에 접근할 수 없도록 한다
> 
> 📕 105p 8번째 (17장)
> 

### **🧐 : 불변을 만드는 조건 5가지 숙지하고 있자**

---

# 📌 이해가 가지 않았던 내용

## **📚 상속 제어**

> 전통적으로 이런 클래스는 final도 아니고 상속용으로 설계되거나 문서화되지도 않는다. 이 문제를 해결하는 가장 좋은 방법은 상속용으로 설계하지 않은 클래스는 상속을 금지하는 것이다. 
> 상속을 금지하는 방법은 두 가지다. 둘 중 더 쉬운 쪽은 클래스를 final로 선언하는 방법이다. 두 번째 선택지는 모든 생성자를 private이나 package-private으로 선언하고 public 정적 팩터리를 만들어주는 방법이다. 
> 
> 📕 127p 24번째 (19장)
> 

### **🧐 : 처음부터 상속용 클래스로 설계할순 있겠지만, 추가 개발하다가 상속을 하게 되는 경우도 있는데.. 상속을 고려하지 않았다면 상속을 못하게 하는게.. 실무에서도 가능할까..?**

---

# 📌 논의해보고 싶었던 내용

