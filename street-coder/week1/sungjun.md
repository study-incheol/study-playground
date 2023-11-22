# 📌 인상 깊었던 내용

## **📚 기술 부채**

> 프로그래머는 보통 미래의 사건과 비용을 예측하는 데 능숙하지 않다. 마감일을 맞추기 위해 불리한 결정을 내렸던 과거의 순간에 발생한 혼란 때문에 다음 마감일을 맞추기가 더욱 어려워진다. 보통 이것을 기술 부채라고 부른다.
>
> 📕  87p  13번째 ( 3장)

### **🧐 : 기술 부채를 매일 남기고 있는 나... 미래에 감당할 수 있을까? 항상 경각심을 가지지만 시간이 없다는 핑계로 뒤돌아 보지 않으려고만 한다...**

---

# 📌 이해가 가지 않았던 내용

## **📚 nullable**

> \#nullable enable \
> public MoveResult MoveContents (TopicId from, TopicId to) { \
> // 실제 코드 \
> return MoverResult.Success; \
> } \
> \#nullable restore
> 
> 널 값 또는 nullable 값으로 MoveResult 함수를 호출하려고 하면 실핼 중간에 오류가 발생하는 대신 컴파일러에서 즉시 경고가 표시된다. 코드를 실행하기도 전에 오류를 확인할 수 있다. \
> 📕  68p  6번째 ( 2장)

### **🧐 : MoveContents 함수를 호출할때 파라미터 값이 null 값 또는 nullable 값으로 호출한다는 것을 컴파일러가 어떻게 알고 코드를 실행하기도 전에 오류를 확인한다는걸까**

## **📚 nullable2**

> \#nullable enable \
> internal class ConferenceRegistration \
> { \
> public string CampaignSource { get; set; } \
> public string FirstName { get; set; } \
> public string? MiddleName { get; set; } \
> public string LastName { get; set; } \
> public string Email { get; set; } \
> public DateTimeOffset CreatedOn { get; set; } \
> } \
> \#nullable restore \
> 
> 코드에서 클래스를 컴파일하려고 하면 non-nullable 선언된 모든 문자열, 즉 MiddleName과 CreatedOn을 제외한 모든 속성에 대해 컴파일러 경고가 표시된다. \
> 📕  68p  13번째 ( 2장)
>

### **🧐 : 구조체인 CreatedOn은 왜 nullable이라는 걸까**

---

# 📌 논의해보고 싶었던 내용

---