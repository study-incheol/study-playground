# 아이템 81. wait와 notify보다는 동시성 유틸리티를 애용하라

- 아이템 50에서 wait와 notify를 올바르게 사용하는 방법을 안내했지만 이는 까다로우니 그냥 고수준 동시성 유틸리티를 사용하자. -> java.util.concurrent
- java.util.concurrent 는 크게 3범주로 나뉜다. 실행자 프레임워크, 동시성 컬렉션(concurrent collection), 동기화 장치(synchronizer)
- 동시성 컬렉션은 List, Queue, Map 같은 표준 컬렉션 인터페이스에 동시성을 가미해 구현한 고성능 컬렉션이다. (ex. ConcurrentHashMap, CopyOnWriteArrayList)
  - 동시성 컬렉션에서 동시성을 무력화(스레드가 동시에 접근하지 못하도록)하는 건 불가능하며, 외부에서 락을 추가로 사용하면 오히려 속도가 느려진다.
    - 동시성을 무력화 하지 못해 여러 메서드를 원자적으로 묶어 호출이 불가하여 '상태 의존적 수정' 메소드들이 추가 되었다 (ex. Map의 putIfAbsent(key, value) 같은 메소드들 유용해서 일반 컬렉션에도 추가되었다)
  - 동시성 컬렉션은 동기화한 컬렉션을 낡은 유산으로 만들었다. 예로, Collections.synchronizedMap 보다는 ConcurrentHashMap을 사용하는게 훨씬 좋다.
- 동기화 장치는 스레드가 다른 스레드를 기다릴 수 있게 하여, 서로 작업을 조율할 수 있게 해준다. (ex. CountDownLatch, Semaphore)
  - countDownLatch는 일회성 장벽으로 하나 이상의 스레드가 또 다른 하나 이상의 스레드 작업이 끝날 때까지 기다리게 한다.
    - 어떤 동작들을 동시에 시작해 모두 완료하기까지의 시간을 재는 간단 프레임워크
      ```java
      public class ConcurrentTimer {
      private ConcurrentTimer() { } // 인스턴스 생성 불가
      
          public static long time(Executor executor, int concurrency, Runnable action) throws InterruptedException {
              CountDownLatch ready = new CountDownLatch(concurrency);
              CountDownLatch start = new CountDownLatch(1);
              CountDownLatch done  = new CountDownLatch(concurrency);
      
              for (int i = 0; i < concurrency; i++) {
                  executor.execute(() -> {
                      ready.countDown(); // 타이머에게 준비를 마쳤음을 알린다.
                      try {
                          start.await(); // 모든 작업자 스레드가 준비될 때까지 기다린다.
                          action.run();
                      } catch (InterruptedException e) {
                          Thread.currentThread().interrupt();
                      } finally {
                          done.countDown();  // 타이머에게 작업을 마쳤음을 알린다.
                      }
                  });
              }
      
              ready.await();     // 모든 작업자가 준비될 때까지 기다린다.
              long startNanos = System.nanoTime();
              start.countDown(); // 작업자들을 깨운다.
              done.await();      // 모든 작업자가 일을 끝마치기를 기다린다.
              return System.nanoTime() - startNanos;
          }
      }
      ```
      
- wait, notify를 직접 사용하는것은 어셈블리 언어로 프로그래밍하는 것에 비유할 수 있다. 코드를 새로 작성한다면 java.util.concurrent는 고수준 언어에 비교할 수 있다. 레거시 코드를 유지보수하지 않는 이상 wait, notify를 쓸 이유는 전혀없다.

# 아이템 82. 스레드 안전성 수준을 문서화하라

- 스레드 안전성 수준을 정확히 문서화 해야한다. 아래는 일반적으로 스레드 안정성이 높은 순서대로 정리한 내용이다.
  - 불변: 이 클래스의 인스턴스는 마치 상수와 같아서 외부 동기화도 필요 없다. (ex. String, Long, BigInteger)
  - 무조건적 스레드 안전: 이 클래스의 인스턴스는 수정될 수 있으나, 내부에서 충실히 동기화하여 별도의 외부 동기화 없이 동시에 사용해도 안전하다. (ex. AtomicLong, ConcurrentHashMap)
  - 조건부 스레드 안전: 무조건적 스레드 안전과 같으나, 일부 메서드는 동시에 사용하려면 외부 동기화가 필요하다. (ex. Collections.synchronized 래퍼 메서드가 반환한 컬렉션들이 여기 속한다)
  - 스레드 안전하지 않음: 이클래스의 인스턴스는 수정될 수 있다. 동시에 사용하려면 각각의 메서드 호출을 클라이언트가 선택한 외부 동기화 메커니즘으로 감싸야한다. (ex. ArrayList, HashMap 같은 기본 컬렉션)
  - 스레드 적대적: 이 클래스는 모든 메서드 호출을 외부 동기화로 감싸더라도 멀티스레드 환경에서 안전하지 않다. 이 수준의 클래스는 일반적으로 정적 데이터를 아무 동기화 없이 수정한다.

# 아이템 83. 지연 초기화는 신중히 사용하라

- 지연 초기화(lazy initialization)는 필드의 초기화 시점을 그 값이 처음 필요할때까지 늦추는 기법이다. 그래서 값이 쓰이지 않으면 초기화도 결코 일어나지 않는다.
- 이 기법은 정적필드와 인스턴스 필드 모두에 사용가능하고 주로 최적화 용도로 쓰이지만, 클래스와 인스턴스 초기화 때 발생하는 위험한 순환 문제를 해결하는 효과도 있다.
- 모든 최적화와 마찬가지로 필요할때까지는 지연초기화를 하지말자. 경우에 따라 성능이 느려질 수 있다.
```java
    // 코드 83-1 인스턴스 필드를 초기화하는 일반적인 방법
    private final FieldType field1 = computeFieldValue();


    // 코드 83-2 인스턴스 필드의 지연 초기화 - synchronized 접근자 방식
    private FieldType field2;
    private synchronized FieldType getField2() {
        if (field2 == null)
            field2 = computeFieldValue();
        return field2;
    }

    
    // 코드 83-3 정적 필드용 지연 초기화 홀더 클래스 관용구
    private static class FieldHolder {
      static final FieldType field = computeFieldValue();
    }

    private static FieldType getField() { return FieldHolder.field; }

      
    // 코드 83-4 인스턴스 필드 지연 초기화용 이중검사 관용구
    private volatile FieldType field4;
    
    private FieldType getField4() { 
        FieldType result = field4;
        if (result != null)    // 첫 번째 검사 (락 사용 안 함)
          return result;

        synchronized(this) {
          if (field4 == null) // 두 번째 검사 (락 사용)
            field4 = computeFieldValue();
          return field4;
        }
    }
```

- 지연 초기화를 써야한다면 올바른 지연 초기화 기법을 사용하자. (ex. 인스턴스 필드에는 이중검사 관용구, 정적필드에는 지연 초기화 홀더 클래스 관용구)

# 아이템 84. 프로그램의 동작을 스레드 스케줄러에 기대지 말라

- 여러 스레드가 실행 중이면 운영체제의 스레드 스케줄러가 어떤 스레드를 얼마나 오래 실행할지 정한다. 잘 작성된 프로그램이라면 이 정책에 좌지우지돼서는 안된다. 정확성이나 성능이 스레드 스케줄러에 따라 달라지는 프로그램이라면 다른 플랫폼에 이식하기 어렵다.
- 견고하고 빠릿하고 이식성 좋은 프로그램을 작성하는 가장 좋은 방법은 실행 가능한 스레드의 평균적인 수를 프로세서 수보다 지나치게 많아지지 않도록 하는것이다. 그래야 스케줄러가 고민할 거리가 줄어들고 스케줄링 정책이 아주 상이한 시스템에서도 동작이 크게 달라지지 않는다.
- 실행 가능한 스레드 수를 적게 유지하는 주요 기법은 작업을 완료한 후에는 다음 작업이 생기기 전까지 대기하도록 하는것이다. 당장 처리해야할 작업이 없다면 스레드는 실행돼서는 안된다.
- 스레드는 절대 busy waiting 상태가 되면 안된다.(상태가 바뀔때까지 계속 검사)

```java
  // 코드 84-1 끔찍한 CountDownLatch 구현 - 바쁜 대기 버전!
  public class SlowCountDownLatch {
    private int count;
  
    public SlowCountDownLatch(int count) {
          if (count < 0)
              throw new IllegalArgumentException(count + " < 0");
          this.count = count;
    }
  
    public void await() {
          while (true) {
              synchronized(this) {
                  if (count == 0)
                      return;
              }
          }
    }
    public synchronized void countDown() {
          if (count != 0)
              count--;
    }
  }
```

- 직접 랜치를 구현한 안좋은 예제. 억지스러워 보일 수 있지만, 하나 이상의 스레드가 필요도 없이 실행 가능한 상태인 시스템은 흔하게 볼 수 있다.
- 특정 스레드가 cpu 시간을 충분히 얻지 못해서 간신히 돌아가는 프로그램을 보더라도 Thread.yield를 써서 문제를 고쳐보려는 유혹을 떨쳐내자. 이식성이 너무 안좋다. 특정 JVM따라 성능이 좋아질수도 안좋아질수도 있다. 스레드 우선순위 개념도 마찬가지다.


> 직렬화
> > 객체 직렬화란 자바가 객체를 바이트 스트림으로 인코딩하고(직렬화) 그 바이트 스트림으로부터 다시 객체를 재구성하는(역직렬화) 메커니즘이다. 직렬화된 객체는 다른 VM에 전송하거나 디스크에 저장한 후 나중에 역직렬화할 수 있다.

# 아이템 85. 자바 직렬화의 대안을 찾으라

- 1997년 자바에 처음으로 직렬화가 도입되었다. 이때도 위험성이 제기되었고 실제로도 우려한 만큼 취약점들이 심각하게 악용되었다.
- 직렬화의 근본적인 문제는 공격 범위가 너무 넓고 지속적으로 더 넓어져 방어하기 어렵다는 점이다. ObjectInputStream의 readObject 메서드를 호출하면서 객체 그래프가 역직렬화되기 때문이다.
- readObject 메서드는 (Serializable 인터페이스를 구현했다면) 클래스패스 안의 거의 모든 타입의 객체를 만들어 낼 수 있는, 사실상 마법 같은 생성자다. 바이트 스트림을 역직렬화하는 과정에서 이 메서드는 그 타입들 안의 모든 코드를 수행할 수 있다. 이 말은, 그 타입들의 코드 전체가 공격 범위에 들어간다는 뜻이다.
- 관련한 모든 모범 사례를 따르고 모든 직렬화 가능 클래스들을 공격에 대비하도록 작성한다 해도, 여전히 취약할 수 있다.
- 역직렬화에 시간이 오래 걸리는 짧은 스트림을 역직렬화 하는것만으로도 Dos (서비스거부)공격에 쉽게 노출 될 수 있다.

```java
    // 코드 85-1 역직렬화 폭탄 - 이 스트림의 역직렬화는 영원히 계속된다.
    public class DeserializationBomb {
        public static void main(String[] args) throws Exception {
            System.out.println(bomb().length);
            deserialize(bomb());
        }
        
        static byte[] bomb() {
            Set<Object> root = new HashSet<>();
            Set<Object> s1 = root;
            Set<Object> s2 = new HashSet<>();
            for (int i = 0; i < 100; i++) {
                Set<Object> t1 = new HashSet<>();
                Set<Object> t2 = new HashSet<>();
                t1.add("foo"); // t1을 t2와 다르게 만든다.
                s1.add(t1);
                s1.add(t2);
                s2.add(t1);
                s2.add(t2);
                s1 = t1;
                s2 = t2;
            }
            return serialize(root); // 이 메서드는 effectivejava.chapter12.Util 클래스에 정의되어 있다.
        }
    }
```

- 이 객체 그래프는 201개의 HashSet 인스턴스로 구성되며, 그 각각은 3개 이하의 객체 참조를 갖는다. 스트림의 전체 크기는 5744바이트지만, 역 직렬화는 태양이 불타 식을 떄까지도 끊나지 않는다.
- 문제는 HashSet 인스턴스를 역직렬화 하려면 HashCode 메서드를 2의 100승 넘게 호출해야한다. 이코드는 단 몇 개의 객체만 생성해도 스택 깊이 제한에 걸려버린다.
- 이 문제들을 어떻게 대처해야할까? 직렬화 위험을 회피하는 가장 좋은 방법은 아무것도 역직렬화하지 않는 것이다. 새로운 시스템에서 자바 직렬화를 써야 할 이유는 전혀 없다.
- 객체와 바이트 시퀀스를 변환해주는 다른 메커니즘이 많이 있다. 이들의 선두주자로는 JSON(텍스트 기반)과 프로토콜 버퍼(이진 표현 기반)가 있다.
- 레거시 시스템이라 자바 직렬화를 배제할 수 없다면 차선책은 신뢰할 수 없는 데이터는 절대 역직렬화하지 않는 것이다.