/**
 * 2단계: 🔍 불편함 돋보기 모듈
 */

const ProblemModule = (() => {
    let selectedPlace = "🏫 학교/교실";

    function init() {
        renderPlaceChips();
        setupForm();
    }

    function renderPlaceChips() {
        const container = document.getElementById("placeChips");
        if (!container) return;

        const places = [
            "🏫 학교/교실", "🏠 우리 집/내 방", "🍽️ 식사/주방", 
            "🚽 화장실", "🚌 등하굣길/버스", "🌧️ 비오는 날", "🎒 가방/소지품"
        ];

        container.innerHTML = places.map(p => `
            <button class="place-chip ${p === selectedPlace ? 'active' : ''}" data-place="${p}">
                ${p}
            </button>
        `).join("");

        container.querySelectorAll(".place-chip").forEach(btn => {
            btn.addEventListener("click", () => {
                container.querySelectorAll(".place-chip").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedPlace = btn.dataset.place;
            });
        });
    }

    function setupForm() {
        const submitBtn = document.getElementById("btnSaveProblem");
        if (!submitBtn) return;

        submitBtn.addEventListener("click", () => {
            const when = document.getElementById("inputWhen").value.trim();
            const trouble = document.getElementById("inputTrouble").value.trim();
            const wish = document.getElementById("inputWish").value.trim();

            if (!trouble) {
                alert("불편했던 점을 한 줄 이상 적어주세요! 😊");
                document.getElementById("inputTrouble").focus();
                return;
            }

            const problemData = {
                place: selectedPlace,
                when: when || "일상 속에서",
                trouble: trouble,
                wish: wish || "더 편리하게 해결하고 싶어요!",
                summaryText: `[${selectedPlace}] ${trouble}`
            };

            App.setCurrentProblem(problemData);
            App.goToStep(3); // 3단계(생각팡팡 브레인스토밍)으로 이동
        });
    }

    return {
        init
    };
})();
