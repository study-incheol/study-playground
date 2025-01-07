## 성공적 소통 가능성이 줄어드는 안티패턴

* 아이콘

클라우드 회사의 아이콘이 거의 공식적인 표기법으로 이용

아이콘이 늘어남에 따라 레이블이나, 정보 전달의 텍스트가 줄어듦.

(별도 설명 없이) 아이콘을 너무 많이 사용할 경우, 독자들의 지식을 테스트하는 것으로 보일 수 있다.

아이콘을 추가할 때, 그 이유가 `정보전달`이어선 안된다. 보충 설명 용도로 사용하자.

아이콘을 제거해도, 의미전달이 가능하도록, `레이블`을 사용하고, `텍스트`도 작성하자. 혹은 아이콘 정의가 포함된 `범례`를 추가하자.

![img1](https://communicationpatternsbook.com/assets/figures/copa_0501.png)

* UML

UML을 사용하기 전에 다이어그램의 목적, 대상을 고려해보자.

UML은 빠르게 업데이트가 이뤄지기 어려울 수 있다. (UML 기반 지식을 알고 있어야 하므로)

`다이어그램 일관성을 유지하는 것은 독자의 인지 부하를 줄일 수 있는 중요한 포인트다.`

![img2](https://communicationpatternsbook.com/assets/figures/copa_0502.png)
![img3](https://communicationpatternsbook.com/assets/figures/copa_0503.png)

더 알아보기 쉬운 레이블로 대체

![img4](https://communicationpatternsbook.com/assets/figures/copa_0504.png)
![img5](https://communicationpatternsbook.com/assets/figures/copa_0505.png)

* 동작과 구조

SOLID의 `단일 책임 원칙`은 다이어그램에서도 적용된다.

구조 다이어그램: 시스템과 시스템간의 관계, 물리적 위치를 전달
행동 다이어그램: 데이터 흐름, 시스템 내 상태 변화 전달

혼합된 다이어그램
![img6](https://communicationpatternsbook.com/assets/figures/copa_0506.png)

분리된 다이어그램
![img7](https://communicationpatternsbook.com/assets/figures/copa_0507.png)
![img8](https://communicationpatternsbook.com/assets/figures/copa_0508.png)

* 예상범주

사람들의 기대나 통념을 거스르는것은 지양하자.

`예상을 벗어나는 요소`는 관심을 끌지만, 무분별한 사용은 정보 전달력이 떨어진다.

독자들은 다양한 멘탈모델을 발전 시켜왔다.
  - 신호등 색 조합
  - 웹사이트의 메뉴 동작 방식 (햄버거 버튼)

색상을 사용할 때, 독자들의 멘탈모델에 존재하는 색상을 이용하는 것이 좋다.(중국에서 빨강은 행운을 의미)
하지만 단순 색상에만 의지하는 커뮤니케이션은 지양.

* 색을 다르게 인식하는 사례
  * 일본에서는 녹색을 파란색의 한 색조로 간주하는 경우 존재
  * 영단어 라일락 색상은, 타언어에서 상응하는 색상이 없거나, 전혀 다른 색상을 의미할 수 있다.

문화(종교)마다 의미가 있는 도형은 주의하자.

삼각형: 행동이나 역동적인 긴장감
정사각/직사각형: 신뢰, 질서, 격식

![img9](https://communicationpatternsbook.com/assets/figures/copa_0509.png)

`기술 선택`과 `기술 사용방식`의 관습을 깨는것은 좋고, 혁신적일 수 있다.
그러나 그에 대한 정당성이 명확해야한다.(다른 사람들은 왜 관습을 따르는가?)

관습적 표기법도 독자 이해범주를 벗어나지 않는이상, 공식 표기법을 꼭 따르지 않아도 된다.

`타당한 근거가 있다면 의도적으로 틀을 깨고, 혁신적인 방법을 선택해야한다.`
