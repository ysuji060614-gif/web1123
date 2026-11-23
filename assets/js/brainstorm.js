/**
 * 3단계: 💥 생각 팡팡! 브레인스토밍 모듈 (발명 룰렛 & 포스트잇)
 */

const BrainstormModule = (() => {
    let notes = [];
    let selectedColor = "yellow";
    let selectedTech = "add";
    let isSpinning = false;
    let currentAngle = 0;

    const techKeys = ["add", "sub", "shape", "reverse", "use", "size"];

    function init() {
        initRoulette();
        setupNoteInput();
        renderNotes();
    }

    // 1. 발명 룰렛 그리기 & 회전
    function initRoulette() {
        const canvas = document.getElementById("rouletteCanvas");
        const spinBtn = document.getElementById("btnSpinRoulette");
        if (!canvas || !spinBtn) return;

        drawRoulette(canvas, 0);

        spinBtn.addEventListener("click", () => {
            if (isSpinning) return;
            spinRoulette(canvas);
        });
    }

    function drawRoulette(canvas, angle) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = cx - 8;
        const arc = (2 * Math.PI) / techKeys.length;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        techKeys.forEach((key, i) => {
            const tech = TECHNIQUES[key];
            const startAngle = i * arc;
            const endAngle = startAngle + arc;

            // 섹터 채우기
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.fillStyle = tech.color;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();

            // 텍스트 및 아이콘
            ctx.save();
            ctx.rotate(startAngle + arc / 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 15px Pretendard, sans-serif";
            ctx.textAlign = "right";
            ctx.fillText(`${tech.icon} ${tech.name}`, radius - 20, 5);
            ctx.restore();
        });

        // 중앙 코어 원
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#1E1B4B";
        ctx.stroke();

        ctx.restore();
    }

    function spinRoulette(canvas) {
        isSpinning = true;
        const spinBtn = document.getElementById("btnSpinRoulette");
        spinBtn.disabled = true;
        spinBtn.innerText = "빙글빙글 회전 중...! 🎲";

        // 무작위로 선택될 기법 (0~5)
        const targetIndex = Math.floor(Math.random() * techKeys.length);
        const arc = (2 * Math.PI) / techKeys.length;
        
        // 포인터는 상단(12시 방향, -PI/2)을 가리키므로,
        // targetIndex 섹터의 중심이 12시 방향에 오도록 각도 계산
        const fullSpins = 5 + Math.floor(Math.random() * 3); // 5~7바퀴 회전
        const targetAngleOffset = (2 * Math.PI) - (targetIndex * arc + arc / 2) - (Math.PI / 2);
        const finalAngle = currentAngle + (fullSpins * 2 * Math.PI) + (targetAngleOffset - (currentAngle % (2 * Math.PI)));

        const duration = 3800; // 3.8초
        const startTime = performance.now();
        const startAngle = currentAngle;

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentAngle = startAngle + (finalAngle - startAngle) * easeOut;

            drawRoulette(canvas, currentAngle);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isSpinning = false;
                spinBtn.disabled = false;
                spinBtn.innerText = "🎲 다시 돌리기!";
                onRouletteFinish(techKeys[targetIndex]);
            }
        }

        requestAnimationFrame(animate);
    }

    function onRouletteFinish(techKey) {
        const tech = TECHNIQUES[techKey];
        const resultBox = document.getElementById("rouletteResultBox");
        const tag = document.getElementById("rouletteResultTag");
        const prompt = document.getElementById("rouletteResultPrompt");

        // 랜덤 힌트 문장
        const randomPrompt = tech.roulettePrompts[Math.floor(Math.random() * tech.roulettePrompts.length)];

        tag.innerHTML = `${tech.icon} 당첨! [${tech.name}] 마법`;
        tag.style.color = tech.color;
        prompt.innerText = randomPrompt;
        resultBox.classList.add("show");

        // 포스트잇 입력란의 기법도 자동 변경
        selectedTech = techKey;
        const techSelect = document.getElementById("noteTechSelect");
        if (techSelect) techSelect.value = techKey;
    }

    // 2. 포스트잇 생성 및 관리
    function setupNoteInput() {
        const colorDots = document.querySelectorAll(".color-dot");
        colorDots.forEach(dot => {
            dot.addEventListener("click", () => {
                colorDots.forEach(d => d.classList.remove("active"));
                dot.classList.add("active");
                selectedColor = dot.dataset.color;
            });
        });

        const techSelect = document.getElementById("noteTechSelect");
        if (techSelect) {
            techSelect.addEventListener("change", (e) => {
                selectedTech = e.target.value;
            });
        }

        const input = document.getElementById("noteTextInput");
        const addBtn = document.getElementById("btnAddNote");

        function addNote() {
            const text = input.value.trim();
            if (!text) {
                alert("아이디어를 적어주세요! 💡");
                input.focus();
                return;
            }

            const newNote = {
                id: "note_" + Date.now(),
                text: text,
                color: selectedColor,
                techId: selectedTech,
                likes: 0
            };

            notes.push(newNote);
            input.value = "";
            renderNotes();
            App.saveState();
        }

        if (addBtn) addBtn.addEventListener("click", addNote);
        if (input) {
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addNote();
                }
            });
        }
    }

    function renderNotes() {
        const wall = document.getElementById("notesWall");
        if (!wall) return;

        if (notes.length === 0) {
            wall.innerHTML = `
                <div style="width:100%; text-align:center; padding:60px 20px; color:#94A3B8;">
                    <div style="font-size:40px; margin-bottom:10px;">📝</div>
                    <div style="font-weight:700; font-size:16px;">아직 붙인 생각이 없어요!</div>
                    <div style="font-size:13px; margin-top:4px;">왼쪽 룰렛을 돌려 힌트를 얻고, 떠오르는 생각을 자유롭게 적어보세요!</div>
                </div>
            `;
            return;
        }

        wall.innerHTML = notes.map(n => {
            const tech = TECHNIQUES[n.techId] || TECHNIQUES.add;
            return `
                <div class="sticky-note note-${n.color}" data-id="${n.id}">
                    <div class="note-header">
                        <span class="note-technique" style="color:${tech.color}; font-weight:800;">
                            ${tech.icon} ${tech.name}
                        </span>
                        <button class="note-delete" title="삭제" onclick="BrainstormModule.deleteNote('${n.id}')">✕</button>
                    </div>
                    <div class="note-text">${escapeHtml(n.text)}</div>
                    <div class="note-footer">
                        <button class="btn-like" onclick="BrainstormModule.likeNote('${n.id}')">
                            ❤️ ${n.likes}
                        </button>
                        <button class="btn-send-mindmap" onclick="BrainstormModule.sendToMindmap('${n.id}')">
                            그물로 연결 ➔
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    }

    function likeNote(id) {
        const note = notes.find(n => n.id === id);
        if (note) {
            note.likes += 1;
            renderNotes();
            App.saveState();
        }
    }

    function deleteNote(id) {
        notes = notes.filter(n => n.id !== id);
        renderNotes();
        App.saveState();
    }

    function sendToMindmap(id) {
        const note = notes.find(n => n.id === id);
        if (note) {
            MindmapModule.addIdeaNode(note.techId, note.text);
            alert(`'${note.text}' 아이디어가 4단계 [생각 그물]에 나뭇가지로 연결되었어요! 🕸️`);
            App.goToStep(4);
        }
    }

    function escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function getNotes() {
        return notes;
    }

    function setNotes(loadedNotes) {
        notes = loadedNotes || [];
        renderNotes();
    }

    return {
        init,
        likeNote,
        deleteNote,
        sendToMindmap,
        getNotes,
        setNotes
    };
})();
