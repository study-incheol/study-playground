# 📌 인상 깊었던 내용

## **📚 주객전도**

> 코드를 한 줄이라도 쓰기 전에 테스트에 집중하면 원래 문제의 영역을 넘어 테스트에 대해 더 많이 생각하게 된다. 테스트 작성과 테스트 프레임워크의 구문 요소, 테스트 구성에 시간을 더 많이 할애할 것이다. 이것은 테스트의 목적이 아니다. 테스트 때문에 고민해서는 안 된다. 테스트는 작성하기 가장 쉬운 코드여야 한다. 만약 그렇지 않다면 뭔가를 잘못하고 있는 것이다
>
> 📕 143p  16번째 ( 4장)
>

### **🧐 : 간혹 TDD를 하다보면 구현보다는 테스트 코드를 작성하는데 더 많은 시간이 소비하게 되고 점차 구현 로직과는 다르게 테스트 코드를 위한 구현로직을 작성하게 되는 경우가 있었다.. 이는 많이 공감하게 된다…**

## **📚 자신의 이득을 위해 테스트를 작성하라**

> 동료가 여러분의 코드를 깨뜨리는 것이 싫은가? 테스트가 도움될 것이다. 테스트는 개발자가 깰수 없는 코드와 명세 사이의 계약을 강요한다.
> 테스트를 통해 버그가 수정되어 다시 나타나지 않는다는 것을 확인할 수 있다
>
> 📕 145p 7번째 (4장)

### **🧐 : 내가 작성한 코드를 지키고 싶으면 테스트 코드를 작성하면 어느정도 보장할 수 있다.
이는 좋은 꿀팁!** 👍

## **📚 우리는 왜 리팩터링을 하는가?**

> - 반복을 줄이고 코드 재사용을 증가시킨다
> - 여러분의 정신 모델과 코드를 더 가깝게 한다 : 이름을 변경하여 가독성을 높인다
> - 코드를 더 이해하기 쉽고 유지관리하기 쉽도록 만든다 : 함수를 쪼개서 코드의 복잡성을 줄일 수 있다
> - 특정 클래스에 버그가 발생하지 않도록 한다
> - 중요한 아키텍처 변화를 준비할 수 있다 : 변화를 위한 코드를 미리 준비한다면 코드가 크게 변경되더라도 더 빨리 일을 실행할 수 있다
> - 코드의 경직된 부분을 없앨 수 있다 : 종속성을 제거하고 느슨하게 결합된 설계를 얻을 수 있다
>
> 📕 167p  번째 ( 장)
>

### **🧐 : 우리가 리팩토링을 할때 생각해볼만한 좋은 주제이다**

## **📚 리팩터링을 하지 않는 경우**

> 리팩토링의 단점은 여기에 너무 중독되어 변경을 위한 변경을 할 뿐, 그것을 통해 얻는 이득에 대해서는 고혀하지 않는다. 이것은 여러분의 시간을 낭비할 뿐만 아니라 여러분이 가져온 모든 변화에 적응해야 하는 팀원의 시간까지도 낭비하는 것이다
>
> **📕 184p  1번째 ( 5장)**
>

### **🧐 :  간혹 리팩토링 된 PR이 올라오는데 이를 왜 했냐고 물어보면 그냥 했다고 하는 답변이 간혹 들릴때가 있다. 어떤 경우에는 리팩토링이 아무 이유없는 자연스러운 플로우처럼 흘러가는 경우가 있기 때문에 왜 리팩토링이 필요한지 어떤 효과를 얻을 수 있는지 이유를 명확하게 알고가는게 중요하다고 생각한다**

---

# 📌 이해가 가지 않았던 내용

---

# 📌 논의해보고 싶었던 내용

## **📚 모든 테스트를 작성하려고 하지 마라**

> 파레토 법칙은 결과의 80%가 20%의 원인에서 나온다고 말한다. 일반적으로 이것을 80:20 법칙이라고 부른다. 이를 테스트에도 적용할 수 있다. 테스트를 현명하게 선택하면 20%의 테스트 커버리지로 80%의 신뢰성을 얻을 수 있다.
>
> 버는 균일하게 발생하지 않는다. 모든 코드 라인이 버그가 발생할 확률을 동일하게 가지는 것은 아니다. 보통 더 자주 사용되거나 변경되는 코드에서 버그를 발견할 가능성이 더 높다. 이처럼 문제가 발생할 가능성이 높은 코드 영역을 핫 패스(hot path)라고 부른다
>
> 📕 152p 6번째 ( 4장)
>

### **🧐 : 커버리지가 높으면 잘 짜여진 테스트코드라고 생각했는데, 커버리지에 대해서 다시금 생각해보게 되는 내용인것 같다. 다른 분들은 테스트 커버리지에 대해서 어떻게 생각하는지 궁금하다**