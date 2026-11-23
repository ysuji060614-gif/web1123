/**
 * 발명 공작소 메인 컨트롤러 (App) - 4단계 구성
 */

const App = (() => {
    let currentStep = 1;
    let currentProblem = null;
    let favoriteTech = null;

    const STORAGE_KEY = "SPARK_INVENTION_LAB_STATE_V2";

    function init() {
        setupNav();
        
        // 각 서브 모듈 초기화
        GalleryModule.init();
        ProblemModule.init();
        BrainstormModule.init();
        MindmapModule.init();

        // 저장된 상태 복원
        loadState();

        // 기본 첫 스텝 렌더링
        goToStep(currentStep);
    }

    function setupNav() {
        const stepBtns = document.querySelectorAll(".step-btn");
        stepBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const step = parseInt(btn.dataset.step, 10);
                goToStep(step);
            });
        });
    }

    function goToStep(step) {
        currentStep = Math.min(Math.max(step, 1), 4);

        // 탭 버튼 활성화
        document.querySelectorAll(".step-btn").forEach(btn => {
            const btnStep = parseInt(btn.dataset.step, 10);
            btn.classList.toggle("active", btnStep === currentStep);
        });

        // 탭 패널 표시
        document.querySelectorAll(".tab-pane").forEach(pane => {
            const paneStep = parseInt(pane.dataset.step, 10);
            pane.classList.toggle("active", paneStep === currentStep);
        });

        // 스텝별 특정 초기화 액션
        if (currentStep === 3) {
            updateBrainstormProblemHeader();
        } else if (currentStep === 4) {
            if (currentProblem) {
                MindmapModule.updateCenterProblem(currentProblem.trouble);
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        saveState();
    }

    function setCurrentProblem(problem) {
        currentProblem = problem;
        updateBrainstormProblemHeader();
        MindmapModule.updateCenterProblem(problem.trouble);
        saveState();
    }

    function updateBrainstormProblemHeader() {
        const pill = document.getElementById("currentProblemPill");
        if (!pill) return;

        if (currentProblem) {
            pill.innerHTML = `<strong>💡 해결할 불편함:</strong> ${currentProblem.place} - ${currentProblem.trouble}`;
        } else {
            pill.innerHTML = `<strong>💡 해결할 불편함:</strong> 2단계에서 불편함을 먼저 정해보세요!`;
        }
    }

    function setFavoriteTechnique(techId) {
        favoriteTech = techId;
        const select = document.getElementById("noteTechSelect");
        if (select) select.value = techId;
    }

    function getCurrentProblem() {
        return currentProblem;
    }

    // 로컬 스토리지 자동 저장
    function saveState() {
        try {
            const state = exportAllData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            
            const statusDot = document.getElementById("saveStatusText");
            if (statusDot) {
                statusDot.innerText = "자동 저장됨 (안심!)";
            }
        } catch (e) {
            console.warn("Storage save failed:", e);
        }
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state = JSON.parse(raw);
            importAllData(state);
        } catch (e) {
            console.warn("Storage load failed:", e);
        }
    }

    function exportAllData() {
        return {
            version: "2.0",
            savedAt: new Date().toISOString(),
            currentStep,
            currentProblem,
            favoriteTech,
            notes: BrainstormModule.getNotes(),
            mindmapNodes: MindmapModule.getNodes()
        };
    }

    function importAllData(data) {
        if (!data) return;

        if (data.currentProblem) {
            currentProblem = data.currentProblem;
            if (document.getElementById("inputWhen")) document.getElementById("inputWhen").value = currentProblem.when || "";
            if (document.getElementById("inputTrouble")) document.getElementById("inputTrouble").value = currentProblem.trouble || "";
            if (document.getElementById("inputWish")) document.getElementById("inputWish").value = currentProblem.wish || "";
            updateBrainstormProblemHeader();
        }

        if (data.notes) BrainstormModule.setNotes(data.notes);
        if (data.mindmapNodes) MindmapModule.setNodes(data.mindmapNodes);

        if (data.currentStep) {
            goToStep(data.currentStep);
        }
    }

    return {
        init,
        goToStep,
        setCurrentProblem,
        getCurrentProblem,
        setFavoriteTechnique,
        saveState,
        exportAllData,
        importAllData
    };
})();

// DOM 준비 시 실행
document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
