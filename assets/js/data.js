/**
 * 초등 6학년을 위한 인터랙티브 발명 공작소 - 데이터셋
 */

// 1. 6가지 핵심 발명 기법 정의
const TECHNIQUES = {
    add: {
        id: "add",
        name: "더하기",
        icon: "➕",
        color: "#FF6B4A",
        bg: "#FFF7ED",
        border: "#FED7AA",
        summary: "합쳐서 두 배로 편리하게!",
        desc: "원래 있던 물건에 다른 물건이나 편리한 기능을 하나 더 붙여요.",
        examples: "연필 + 지우개 = 지우개 달린 연필 / 쇼핑카트 + 계산기",
        roulettePrompts: [
            "내가 해결하려는 물건에 '다른 편리한 도구'를 하나 더 붙이면 어떨까?",
            "시계, 계산기, 조명, 돋보기 같은 '기능'을 합쳐볼까?",
            "동시에 자주 쓰는 두 가지 물건을 하나로 묶어볼까?"
        ]
    },
    sub: {
        id: "sub",
        name: "빼기",
        icon: "➖",
        color: "#0284C7",
        bg: "#F0F9FF",
        border: "#BAE6FD",
        summary: "불필요한 것은 쏙 빼요!",
        desc: "걸리적거리거나 불편했던 부품, 번거로운 과정을 없애요.",
        examples: "줄 없는 무선 줄넘기 / 씨 없는 수박 / 촉 가운데가 뚫린 투명 형광펜",
        roulettePrompts: [
            "이 물건에서 당연히 있어야 한다고 생각한 부품 하나를 쏙 빼보면?",
            "선(전선, 줄, 끈)이나 뚜껑을 없애면 얼마나 편해질까?",
            "복잡한 단계나 기다려야 하는 과정을 생략해버릴 수 없을까?"
        ]
    },
    shape: {
        id: "shape",
        name: "모양바꾸기",
        icon: "🔄",
        color: "#10B981",
        bg: "#ECFDF5",
        border: "#A7F3D0",
        summary: "모양을 꺾고 파내요!",
        desc: "구조나 형태를 살짝 변형해서 불편함을 싹 해결해요.",
        examples: "주름이 있어 굽어지는 빨대 / 끈 걸리는 홈 파인 의자 / 바닥에 안 닿는 뒤집개",
        roulettePrompts: [
            "똑바른 부분을 구부리거나 각도를 살짝 꺾어보면 어떨까?",
            "홈을 파거나, 구멍을 뚫거나, 돌기를 붙여보면 어떨까?",
            "네모난 것을 둥글게, 혹은 둥근 것을 각지게 바꿔보면?"
        ]
    },
    reverse: {
        id: "reverse",
        name: "반대로하기",
        icon: "🔀",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        border: "#DDD6FE",
        summary: "거꾸로 뒤집어 생각해요!",
        desc: "위아래, 안팎, 방향이나 순서를 거꾸로 바꾸어 봐요.",
        examples: "거꾸로 세워 바로 나오는 케첩통 / 등받이를 뒤집어 테이블로 변신하는 벤치",
        roulettePrompts: [
            "위아래를 거꾸로 뒤집거나, 안과 밖을 뒤바꿔보면 어떨까?",
            "사용하는 순서나 방향을 180도 반대로 해볼까?",
            "겉면만 쓰지 말고 비어있는 '속 안쪽'을 활용해볼까?"
        ]
    },
    use: {
        id: "use",
        name: "용도바꾸기",
        icon: "♻️",
        color: "#059669",
        bg: "#F0FDF4",
        border: "#BBF7D0",
        summary: "원래 용도를 다른 용도로!",
        desc: "물건의 원래 용도를 다른 용도로 바꾸어 만듭니다.",
        examples: "장화를 화분으로 쓰기 / 주전자를 물뿌리개로 쓰기 / 타이어로 그네 만들기",
        roulettePrompts: [
            "이 물건의 원래 쓰임새 대신 전혀 다른 곳에 쓸 수는 없을까?",
            "다 쓰고 버려지는 부분을 다른 목적의 유용한 도구로 바꿔볼까?",
            "사람이 쓰는 물건을 동물이나 식물을 위한 물건으로 바꿔볼까?"
        ]
    },
    size: {
        id: "size",
        name: "크기바꾸기",
        icon: "🔍",
        color: "#EC4899",
        bg: "#FDF2F8",
        border: "#FBCFE8",
        summary: "작게 줄이거나 크게 늘려요!",
        desc: "크기를 아주 작게 줄여서 들고 다니거나, 엄청 크게 키워요.",
        examples: "접어서 주머니에 넣는 휴대용 우산 / 휴지심 속에 들어가는 미니 휴지",
        roulettePrompts: [
            "크기를 손바닥만큼 아주 작게 줄여서 주머니나 필통에 쏙 넣으면?",
            "필요할 때만 쫙 펼쳐지거나 풍선처럼 부풀어 오르게 만들면?",
            "아주 커다랗게 만들어서 여러 사람이 한 번에 쓰게 하면 어떨까?"
        ]
    }
};

// 2. 16가지 천재적인 발명품 데이터 (크롭된 실제 사진 매핑)
const INVENTION_ITEMS = [
    {
        id: "01",
        title: "쇼핑카트에 계산기",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/01_쇼핑카트에_계산기.png",
        beforeProblem: "마트에서 물건을 카트에 담다 보면 총금액이 얼마인지 몰라 계산대에서 예산을 초과하기 쉬워요.",
        afterSolution: "카트 손잡이 중앙에 소형 디지털 계산기를 달아, 물건을 담을 때마다 바로바로 금액을 더할 수 있어요.",
        whyGenius: "카트와 계산기를 더해 충동구매를 막고 계획적인 소비를 도와줘요!",
        tag: "쇼핑 · 마트"
    },
    {
        id: "02",
        title: "의사표현 장바구니",
        techniqueId: "sub",
        techniqueName: "빼기",
        image: "assets/images/captures/02_직원들이_붙지_않는_장바구니.png",
        beforeProblem: "매장에서 조용히 혼자 구경하고 싶은데, 직원이 다가와 계속 말을 걸면 부담스러워요.",
        afterSolution: "검은색('혼자 볼게요')과 주황색('도움이 필요해요') 장바구니로 나누어 부담스러운 응대 과정을 뺐어요.",
        whyGenius: "불필요한 대화 부담을 빼서 손님도 편하고 직원도 맞춤 응대가 가능해요!",
        tag: "매장 · 쇼핑"
    },
    {
        id: "03",
        title: "사람·반려견 겸용 음수대",
        techniqueId: "use",
        techniqueName: "용도바꾸기",
        image: "assets/images/captures/03_주인과_개가_함께_마실수있는_음수대.png",
        beforeProblem: "공원에서 사람이 물을 마실 때 버려지는 물이 많고, 산책 나온 강아지는 목이 말라도 물을 마시기 힘들어요.",
        afterSolution: "음수대 배수구의 원래 용도를 전환하여, 아래로 흘러내린 깨끗한 잉여수를 반려견 전용 물그릇으로 모이게 만들었어요.",
        whyGenius: "사람이 쓰고 흘려보내는 물의 원래 용도를 반려견 음수대로 바꾸어 물을 아껴요!",
        tag: "공원 · 동물"
    },
    {
        id: "04",
        title: "가방이 안 흘러내리는 의자",
        techniqueId: "shape",
        techniqueName: "모양바꾸기",
        image: "assets/images/captures/04_가방이_안_흘러내리는_의자.png",
        beforeProblem: "의자 등받이에 가방이나 백팩을 걸어두면 끈이 미끄러져 바닥에 툭 떨어지고 더러워져요.",
        afterSolution: "의자 등받이 양쪽 모서리에 오목한 홈(노치) 모양을 파놓아 가방 끈이 쏙 걸리게 했어요.",
        whyGenius: "의자 모양에 작은 홈 하나만 팠을 뿐인데 가방이 떨어지는 문제를 완벽히 해결했어요!",
        tag: "교실 · 가구"
    },
    {
        id: "05",
        title: "파먹기 편리한 숟가락",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/05_파먹기_편리한_숟가락.png",
        beforeProblem: "자몽이나 오렌지처럼 질긴 과일은 보통 숟가락으로 잘 파지지 않고 과즙이 튀어요.",
        afterSolution: "숟가락 테두리에 톱니 모양 칼날을 더해서, 칼 없이도 과육을 쉽게 쓱쓱 분리할 수 있게 했어요.",
        whyGenius: "숟가락에 톱니 칼의 기능을 더해 파내기와 떠먹기를 한 번에 해결해요!",
        tag: "식사 · 주방"
    },
    {
        id: "06",
        title: "USB 충전 가능 건전지",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/06_충전_가능_건전지.png",
        beforeProblem: "일회용 건전지는 다 쓰면 쓰레기가 되고, 충전용 건전지는 전용 충전기가 따로 필요해 번거로워요.",
        afterSolution: "건전지 본체 옆면에 스마트폰 충전 케이블(USB)을 직접 꽂을 수 있는 충전 단자를 더했어요.",
        whyGenius: "건전지에 USB 포트를 더해 전용 충전기 없이 어디서나 손쉽게 재충전해요!",
        tag: "전자 · 환경"
    },
    {
        id: "07",
        title: "테이블도 되는 벤치",
        techniqueId: "reverse",
        techniqueName: "반대로하기",
        image: "assets/images/captures/07_테이블도_되는_벤치.png",
        beforeProblem: "공원 벤치에 앉아 음료수를 마시거나 책을 볼 때 마땅히 올려둘 테이블이 없어 불편해요.",
        afterSolution: "벤치 중앙의 등받이를 반대로 앞으로 들어 올려 뒤집으면 미니 테이블로 변신해요.",
        whyGenius: "등받이의 방향을 반대로 들어 올려 테이블과 의자를 동시에 쓰는 변신 가구!",
        tag: "공공시설 · 가구"
    },
    {
        id: "08",
        title: "바닥에 묻지 않는 뒤집개",
        techniqueId: "shape",
        techniqueName: "모양바꾸기",
        image: "assets/images/captures/08_바닥에_묻지_않는_뒤집개.png",
        beforeProblem: "요리하다가 뒤집개를 조리대 위에 내려놓으면 기름과 양념이 식탁에 묻어 지저분해져요.",
        afterSolution: "손잡이 아래에 작은 받침 돌기 모양을 만들어, 바닥에 내려놓아도 머리 부분이 공중에 떠요.",
        whyGenius: "손잡이 아래 모양에 작은 돌기를 더해 받침 접시 없이도 식탁이 늘 깨끗해요!",
        tag: "요리 · 주방"
    },
    {
        id: "09",
        title: "닫을 수 있는 노트북 캠",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/09_닫을_수_있는_노트북_캠.png",
        beforeProblem: "노트북 카메라 해킹으로 사생활이 유출될까 봐 스티커나 테이프를 붙여두면 끈적이고 지저분해요.",
        afterSolution: "노트북 카메라 위에 옆으로 밀어서 닫을 수 있는 물리적 슬라이드 커버를 더했어요.",
        whyGenius: "손가락으로 쓱 밀어 카메라를 덮는 덮개를 더해 해킹 걱정을 시원하게 날렸어요!",
        tag: "디지털 · 보안"
    },
    {
        id: "10",
        title: "바람 넣을 필요 없는 자전거 바퀴",
        techniqueId: "shape",
        techniqueName: "모양바꾸기",
        image: "assets/images/captures/10_바람_넣을_필요_없는_자전거_바퀴.png",
        beforeProblem: "자전거를 타다가 못을 밟으면 타이어가 펑크 나고, 바람이 자주 빠져 정기적으로 공기를 넣어야 해요.",
        afterSolution: "공기 튜브 대신 내부를 튼튼하고 탄성 있는 '벌집 모양(허니콤)' 구조로 바꿔 채웠어요.",
        whyGenius: "바퀴 내부 모양을 벌집 구조로 바꿔 못을 밟아도 절대 터지지 않는 바퀴가 되었어요!",
        tag: "이동 · 교통"
    },
    {
        id: "11",
        title: "김 서림 방지 거울",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/11_김_서림_방지_거울.png",
        beforeProblem: "따뜻한 물로 샤워하고 나면 욕실 거울에 김이 잔뜩 서려 얼굴이 안 보이고 손으로 닦으면 얼룩이 져요.",
        afterSolution: "거울 뒷면 중앙에 따뜻한 열선 패드를 더해 수증기가 물방울로 맺히지 않게 했어요.",
        whyGenius: "거울에 온열 기능을 더해 샤워 직후에도 중앙 부분은 늘 선명하고 깨끗해요!",
        tag: "욕실 · 생활"
    },
    {
        id: "12",
        title: "벤치 겸 울타리",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/12_벤치_겸_울타리.png",
        beforeProblem: "산책로가 좁은 곳에 난간도 세우고 벤치도 놓으면 지나다닐 길이 좁아져 답답해요.",
        afterSolution: "추락을 막는 안전 난간 울타리를 부드러운 곡선으로 구부려 앉을 수 있는 벤치 기능을 더했어요.",
        whyGenius: "울타리에 벤치 기능을 하나로 합쳐 길을 넓게 쓰면서 쉴 공간도 만들었어요!",
        tag: "공공디자인"
    },
    {
        id: "13",
        title: "신호등 남은 시간 표시",
        techniqueId: "add",
        techniqueName: "더하기",
        image: "assets/images/captures/13_신호등_남은_시간_표시.png",
        beforeProblem: "신호등이 언제 바뀔지 몰라 운전자가 초조해하거나 황색 불에 무리하게 출발하다 사고가 나요.",
        afterSolution: "차량 신호등 램프 안에 신호가 바뀌기까지 남은 초(카운트다운 숫자)를 더했어요.",
        whyGenius: "신호등에 초 단위 카운트다운을 더해 답답함을 없애고 교통사고를 예방해요!",
        tag: "교통 · 안전"
    },
    {
        id: "14",
        title: "투명창 형광펜",
        techniqueId: "sub",
        techniqueName: "빼기",
        image: "assets/images/captures/14_형광펜_칠할_곳_확인_가능.png",
        beforeProblem: "책에 중요한 글자에 밑줄을 그을 때 형광펜 촉에 다음 글자가 가려져 엉뚱한 곳까지 그어버려요.",
        afterSolution: "형광펜 촉 중앙의 막힌 부분을 쏙 빼내어 투명한 창(구멍)을 만들었어요.",
        whyGenius: "촉 가운데를 비워 밑줄 그을 글자가 훤히 보여 원하는 단어 끝에서 정확히 멈출 수 있어요!",
        tag: "문구 · 학용품"
    },
    {
        id: "15",
        title: "휴지 속 미니 휴지",
        techniqueId: "size",
        techniqueName: "크기바꾸기",
        image: "assets/images/captures/15_휴지_속_여분_휴지.png",
        beforeProblem: "두루마리 휴지 가운데는 텅 빈 종이심만 들어있어 공간이 낭비되고 외출할 때 휴지가 필요해요.",
        afterSolution: "휴지심 빈 공간 크기에 딱 맞춘 작고 앙증맞은 '미니 휴대용 롤 휴지'를 쏙 집어넣었어요.",
        whyGenius: "휴지 크기를 작게 줄여 빈 공간 속에 넣음으로써 외출할 때 쏙 빼서 휴대할 수 있어요!",
        tag: "생활용품 · 환경"
    },
    {
        id: "16",
        title: "손 씻은 물 재사용 변기",
        techniqueId: "use",
        techniqueName: "용도바꾸기",
        image: "assets/images/captures/16_손_씻은_물_바로_재사용.png",
        beforeProblem: "화장실에서 볼일을 보고 손을 씻을 때 깨끗한 수돗물이 그대로 하수구로 버려져 물이 아까워요.",
        afterSolution: "변기 물탱크 뚜껑의 원래 용도를 수도꼭지가 달린 손 씻는 세면대로 바꾸어, 손 씻은 물이 그대로 탱크에 모이게 했어요.",
        whyGenius: "변기 뚜껑을 세면대 용도로 전환해 버려질 물을 다음 변기 물로 알뜰하게 써요!",
        tag: "욕실 · 절약"
    }
];

// 3. 초등 6학년 일상 속 불편함 추천 예시 (장소/상황별)
const PROBLEM_EXAMPLES = [
    {
        place: "🏫 학교/교실",
        when: "비 오는 날 아침 교실에 들어올 때",
        trouble: "우산에서 빗물이 복도 바닥에 뚝뚝 떨어져 바닥이 미끄럽고 옷이 젖어요.",
        wish: "일회용 비닐을 쓰지 않고도 빗물을 싹 털거나 말려주는 장치가 있으면 좋겠어요."
    },
    {
        place: "🏫 학교/교실",
        when: "수업 시간에 필기를 하다가 지우개 가루가 생길 때",
        trouble: "지우개 가루가 책상과 바닥에 흩어져 손으로 치우기 귀찮고 옷에 묻어요.",
        wish: "지우개 가루가 한 번에 모이거나 흩날리지 않게 청소해주는 필통이나 연필이 있으면 좋겠어요."
    },
    {
        place: "🍽️ 식사/주방",
        when: "뜨거운 국이나 라면을 숟가락으로 떠먹을 때",
        trouble: "국물이 너무 뜨거워 입술을 데거나, 후후 불다가 국물이 사방으로 튀어요.",
        wish: "먹기 전에 온도를 알맞게 식혀주거나 불지 않아도 되는 숟가락이 있으면 좋겠어요."
    },
    {
        place: "🏠 우리 집/방",
        when: "스마트폰을 충전하면서 침대에서 볼 때",
        trouble: "충전 케이블이 너무 짧아 당겨지거나 끝부분이 쉽게 꺾여서 고장나요.",
        wish: "케이블이 꺾이지 않고 길이도 마음대로 늘어나는 튼튼한 충전선이 있으면 좋겠어요."
    },
    {
        place: "🚌 등하굣길",
        when: "추운 겨울이나 더운 여름 버스를 기다릴 때",
        trouble: "버스 정류장 의자가 너무 차갑거나 뜨거워서 앉을 수가 없어요.",
        wish: "계절에 맞춰 스스로 따뜻해지거나 시원해지는 신기한 벤치가 있으면 좋겠어요."
    },
    {
        place: "🌧️ 비오는 날",
        when: "우산을 쓰고 스마트폰을 보거나 짐을 들 때",
        trouble: "두 손이 부족해서 우산을 어깨에 끼우면 자꾸 미끄러져 떨어져요.",
        wish: "손으로 잡지 않아도 어깨나 가방에 안정적으로 고정되는 우산이 있으면 좋겠어요."
    }
];
