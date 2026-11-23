/**
 * 1단계: 💡 아이디어 탐험대 모듈
 */

const GalleryModule = (() => {
    let currentFilter = "all";

    function init() {
        renderFilterBar();
        renderGallery();
        setupModal();
    }

    function renderFilterBar() {
        const filterBar = document.getElementById("galleryFilterBar");
        if (!filterBar) return;

        const filters = [
            { id: "all", label: "🌟 전체 보기" },
            { id: "add", label: "➕ 더하기" },
            { id: "sub", label: "➖ 빼기" },
            { id: "shape", label: "🔄 모양바꾸기" },
            { id: "reverse", label: "🔀 반대로하기" },
            { id: "use", label: "♻️ 용도바꾸기" },
            { id: "size", label: "🔍 크기바꾸기" }
        ];

        filterBar.innerHTML = filters.map(f => `
            <button class="filter-chip ${f.id === currentFilter ? 'active' : ''}" data-filter="${f.id}">
                ${f.label}
            </button>
        `).join("");

        filterBar.querySelectorAll(".filter-chip").forEach(btn => {
            btn.addEventListener("click", (e) => {
                filterBar.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter;
                renderGallery();
            });
        });
    }

    function renderGallery() {
        const grid = document.getElementById("galleryGrid");
        if (!grid) return;

        const filtered = currentFilter === "all" 
            ? INVENTION_ITEMS 
            : INVENTION_ITEMS.filter(it => it.techniqueId === currentFilter);

        grid.innerHTML = filtered.map(item => {
            const tech = TECHNIQUES[item.techniqueId];
            return `
                <div class="invention-card" data-id="${item.id}">
                    <div class="card-img-wrap">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <span class="card-tag-pill">${item.tag}</span>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="card-title-row">
                                <span class="card-title">${item.id}. ${item.title}</span>
                                <span class="technique-badge badge-${item.techniqueId}">
                                    ${tech.icon} ${tech.name}
                                </span>
                            </div>
                            <p class="card-desc">${item.whyGenius}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn-card-detail" data-id="${item.id}">
                                돋보기로 자세히 보기 🔍
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        // 카드 클릭 시 모달 열기
        grid.querySelectorAll(".invention-card").forEach(card => {
            card.addEventListener("click", () => {
                const id = card.dataset.id;
                openModal(id);
            });
        });
    }

    function setupModal() {
        const modal = document.getElementById("itemModal");
        const closeBtn = document.getElementById("closeModalBtn");
        if (!modal || !closeBtn) return;

        closeBtn.addEventListener("click", () => modal.classList.remove("show"));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("show");
        });
    }

    function openModal(id) {
        const item = INVENTION_ITEMS.find(it => it.id === id);
        if (!item) return;

        const tech = TECHNIQUES[item.techniqueId];
        const modal = document.getElementById("itemModal");
        if (!modal) return;

        document.getElementById("modalTitle").innerHTML = `${item.id}. ${item.title}`;
        document.getElementById("modalImg").src = item.image;
        document.getElementById("modalTechBadge").className = `technique-badge badge-${item.techniqueId}`;
        document.getElementById("modalTechBadge").innerHTML = `${tech.icon} ${tech.name} 기법 적용`;

        document.getElementById("modalBefore").innerText = item.beforeProblem;
        document.getElementById("modalAfter").innerText = item.afterSolution;
        document.getElementById("modalGenius").innerText = item.whyGenius;

        const pickBtn = document.getElementById("modalPickTechBtn");
        pickBtn.onclick = () => {
            App.setFavoriteTechnique(item.techniqueId);
            modal.classList.remove("show");
            App.goToStep(3); // 3단계(생각팡팡)로 바로 이동
        };

        modal.classList.add("show");
    }

    return {
        init
    };
})();
