## 📚 정적 팩터리 메서드 명명 규칙 너무 어렵지 않나?
보통 of를 쓰는데 기준이 명확치 않다. 명확한 기준이 있는게 좋지 않나 vs 명확한 규칙이 있나보다 개인이 쓰고 싶은거 쓰면 되지 않나

## 📚 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다
생성자는 자기를 생성하는 것에 그치지만 정적 팩토리메서드는 유연하게 반환타입을 가질 수 있다

## 📚 오버라이딩할때 반환타입을 해당타입에서 파생된(하위클래스 등) 타입은 변환이 가능하다

## 📚 di할때 유연성 문제에 대한 고민
@Service
public class PayService {
private PayCallService payCallService;

    public void pay() {
        if(1번 유저야?){
            new PayCallService().setHttpCall(Amodule())
            payCallService.call() // a모듈 호출
        } else {
            payCallService.setHttpCall(Bmodule())
            payCallService.call() // b모듈 호출
        }
    }
}

@Service
public class PayService {
private APayCallService aPayCallService;
private BPayCallService bPyCallService;
private CPayCallService cPayCallService;
private DPayCallService dPyCallService;

    public void pay() {
        if(1번 유저야?){
            new PayCallService(aModule).call() // a모듈 호출
        } elseIf {
            new PayCallService(bModule).call() // b모듈 호출
        } elseIf {
            cPayCallService.call() // c모듈 호출
        } else {
            dPayCallService.call() // d모듈 호출
        }
    }
}

@Service
public class PayCallService {
private List<HttpPayCall> httpPayCallList; // interface

    public call(caseNumber : Int) {
        // a,b
        httpPayCall.call();
    }
}

public interface HttpPayCall {}
public class AModule implements HttpPayCall {}
public class BModule implements HttpPayCall {}
public class CModule implements HttpPayCall {}
public class DModule implements HttpPayCall {}