### 인상깊었던 부분
#### 아이템 37. ordinal 인덱싱 대신 EnumMap을 사용하라
- 상태전이 예제코드
```
public enum Phase {
    SOLID, LIQUID, GAS;
    public enum Transition {
        MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID)
    }
    private static final Map<Phase, Map<Phase, Transition>> m = Stream.of ~~~~~ (생략) ~~~
    public static Transition from(Phase from, Phase to) {
        return m.get(from).get(to);
    }
}
```
