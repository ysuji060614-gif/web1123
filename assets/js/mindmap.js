/**
 * 4단계: 🕸️ 생각 그물 (마인드맵 캔버스 엔진)
 */

const MindmapModule = (() => {
    let nodes = [];
    let scale = 1;
    let panX = 0;
    let panY = 0;
    let isPanning = false;
    let startPanX = 0;
    let startPanY = 0;

    let draggedNode = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    function init() {
        setupCanvasEvents();
        setupToolbar();
        setupExportActions();
        // 기본 뼈대 노드 생성 (중심 노드 + 6개 기법 가지)
        resetToDefaultStructure();
    }

    function resetToDefaultStructure() {
        const problem = App.getCurrentProblem();
        const centerText = problem ? problem.trouble : "우리가 해결할 일상 속 불편함";

        const canvas = document.getElementById("canvasArea");
        const cx = canvas ? canvas.clientWidth / 2 : 500;
        const cy = canvas ? canvas.clientHeight / 2 : 300;

        // 중심 노드
        const centerNode = {
            id: "node_center",
            type: "center",
            text: centerText,
            x: cx,
            y: cy,
            color: "#1E1B4B"
        };

        // 6개 발명 기법 가지 노드 (방사형 배치)
        const branchKeys = ["add", "sub", "shape", "reverse", "use", "size"];
        const radius = 220;
        const branchNodes = branchKeys.map((key, i) => {
            const tech = TECHNIQUES[key];
            const angle = (i * (2 * Math.PI) / branchKeys.length) - (Math.PI / 2);
            return {
                id: "node_branch_" + key,
                type: "branch",
                parentId: "node_center",
                techId: key,
                text: `${tech.icon} ${tech.name}`,
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * (radius * 0.8),
                color: tech.color
            };
        });

        nodes = [centerNode, ...branchNodes];
        render();
    }

    function updateCenterProblem(text) {
        const center = nodes.find(n => n.type === "center");
        if (center) {
            center.text = text;
            render();
        }
    }

    function addIdeaNode(techId, text) {
        const branch = nodes.find(n => n.type === "branch" && n.techId === techId);
        if (!branch) return;

        const siblings = nodes.filter(n => n.parentId === branch.id);
        const offsetX = (branch.x > nodes[0].x ? 1 : -1) * (140 + Math.random() * 40);
        const offsetY = (siblings.length - 1) * 50 + (Math.random() * 20 - 10);

        const leafNode = {
            id: "node_leaf_" + Date.now() + "_" + Math.floor(Math.random() * 100),
            type: "leaf",
            parentId: branch.id,
            techId: techId,
            text: text,
            x: branch.x + offsetX,
            y: branch.y + offsetY,
            color: branch.color
        };

        nodes.push(leafNode);
        render();
        App.saveState();
    }

    function setupCanvasEvents() {
        const canvas = document.getElementById("canvasArea");
        if (!canvas) return;

        canvas.addEventListener("mousedown", (e) => {
            if (e.target.id === "canvasArea" || e.target.id === "mindmapSvg") {
                isPanning = true;
                startPanX = e.clientX - panX;
                startPanY = e.clientY - panY;
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (isPanning) {
                panX = e.clientX - startPanX;
                panY = e.clientY - startPanY;
                applyTransform();
            } else if (draggedNode) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left - panX) / scale;
                const mouseY = (e.clientY - rect.top - panY) / scale;

                draggedNode.x = mouseX - dragOffsetX;
                draggedNode.y = mouseY - dragOffsetY;

                updateNodePosition(draggedNode);
                renderLines();
            }
        });

        window.addEventListener("mouseup", () => {
            if (isPanning) isPanning = false;
            if (draggedNode) {
                draggedNode = null;
                App.saveState();
            }
        });

        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.08 : 0.08;
            zoom(delta);
        }, { passive: false });
    }

    function setupToolbar() {
        const zoomIn = document.getElementById("btnZoomIn");
        const zoomOut = document.getElementById("btnZoomOut");
        const reset = document.getElementById("btnResetMindmap");

        if (zoomIn) zoomIn.addEventListener("click", () => zoom(0.15));
        if (zoomOut) zoomOut.addEventListener("click", () => zoom(-0.15));
        if (reset) {
            reset.addEventListener("click", () => {
                if (confirm("마인드맵을 기본 모양으로 다시 정리할까요?")) {
                    scale = 1;
                    panX = 0;
                    panY = 0;
                    resetToDefaultStructure();
                    applyTransform();
                }
            });
        }
    }

    function setupExportActions() {
        const exportBtn = document.getElementById("btnExportMindmap");
        const saveJsonBtn = document.getElementById("btnSaveJson");
        const loadJsonInput = document.getElementById("jsonFileInput");

        if (exportBtn) {
            exportBtn.addEventListener("click", exportMindmapAsImage);
        }

        if (saveJsonBtn) {
            saveJsonBtn.addEventListener("click", () => {
                const state = App.exportAllData();
                const jsonStr = JSON.stringify(state, null, 2);
                const blob = new Blob([jsonStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `발명_생각그물_${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
            });
        }

        if (loadJsonInput) {
            loadJsonInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        App.importAllData(data);
                        alert("🎉 저장된 생각 그물을 성공적으로 불러왔습니다!");
                    } catch (err) {
                        alert("올바른 JSON 파일이 아닙니다.");
                    }
                };
                reader.readAsText(file);
            });
        }
    }

    function exportMindmapAsImage() {
        const canvasArea = document.getElementById("canvasArea");
        if (!canvasArea) return;

        // html2canvas 스크립트 로드 확인
        if (typeof html2canvas === "undefined") {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload = () => captureMindmap(canvasArea);
            document.head.appendChild(script);
        } else {
            captureMindmap(canvasArea);
        }
    }

    function captureMindmap(element) {
        alert("🖼️ 생각 그물을 이미지(PNG)로 저장 중입니다. 잠시만 기다려주세요!");
        html2canvas(element, {
            scale: 2,
            backgroundColor: "#FAFAFA",
            useCORS: true
        }).then(canvas => {
            const link = document.createElement("a");
            const problem = App.getCurrentProblem();
            const probTitle = problem ? problem.trouble.slice(0, 15) : "생각그물";
            link.download = `[발명_생각그물]_${probTitle}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        }).catch(err => {
            console.error("Capture error:", err);
            alert("이미지 저장 중 오류가 발생했습니다. 화면 캡처 기능을 이용해 주세요!");
        });
    }

    function zoom(delta) {
        scale = Math.min(Math.max(scale + delta, 0.5), 2.0);
        applyTransform();
    }

    function applyTransform() {
        const world = document.getElementById("mindmapWorld");
        if (world) {
            world.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
            world.style.transformOrigin = "0 0";
        }
    }

    function render() {
        renderNodes();
        renderLines();
    }

    function renderNodes() {
        const container = document.getElementById("mindmapNodesContainer");
        if (!container) return;

        container.innerHTML = nodes.map(n => {
            let className = "mindmap-node";
            let style = `left:${n.x}px; top:${n.y}px;`;

            if (n.type === "center") {
                className += " node-center";
            } else if (n.type === "branch") {
                className += " node-branch";
                style += ` background:${n.color};`;
            } else {
                className += " node-leaf";
                style += ` border-color:${n.color};`;
            }

            const isLeaf = n.type === "leaf";
            const isBranch = n.type === "branch";

            return `
                <div class="${className}" id="${n.id}" style="${style}">
                    <span class="node-text">${escapeHtml(n.text)}</span>
                    ${isBranch ? `<div class="node-add-btn" title="아이디어 가지 추가" onclick="MindmapModule.promptAddLeaf('${n.techId}')">+</div>` : ''}
                    ${isLeaf ? `<button style="margin-left:6px; border:none; background:transparent; cursor:pointer; color:#94A3B8;" title="삭제" onclick="MindmapModule.deleteNode('${n.id}')">✕</button>` : ''}
                </div>
            `;
        }).join("");

        nodes.forEach(n => {
            const el = document.getElementById(n.id);
            if (!el) return;

            el.addEventListener("mousedown", (e) => {
                if (e.target.tagName.toLowerCase() === "button" || e.target.classList.contains("node-add-btn")) return;
                draggedNode = n;
                dragOffsetX = 0;
                dragOffsetY = 0;
                e.stopPropagation();
            });

            el.addEventListener("dblclick", () => {
                const newText = prompt("내용을 수정하세요:", n.text);
                if (newText && newText.trim()) {
                    n.text = newText.trim();
                    render();
                    App.saveState();
                }
            });
        });
    }

    function updateNodePosition(node) {
        const el = document.getElementById(node.id);
        if (el) {
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
        }
    }

    function renderLines() {
        const svg = document.getElementById("mindmapSvg");
        if (!svg) return;

        const linesHtml = nodes.filter(n => n.parentId).map(child => {
            const parent = nodes.find(p => p.id === child.parentId);
            if (!parent) return "";

            const x1 = parent.x;
            const y1 = parent.y;
            const x2 = child.x;
            const y2 = child.y;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx1 = x1 + dx * 0.5;
            const cy1 = y1;
            const cx2 = x1 + dx * 0.5;
            const cy2 = y2;

            const strokeColor = child.color || "#94A3B8";
            const strokeWidth = child.type === "branch" ? 3 : 2;

            return `
                <path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}" 
                      stroke="${strokeColor}" 
                      stroke-width="${strokeWidth}" 
                      fill="none" 
                      stroke-linecap="round" 
                      opacity="0.8" />
            `;
        }).join("");

        svg.innerHTML = linesHtml;
    }

    function promptAddLeaf(techId) {
        const text = prompt("이 기법으로 떠오른 멋진 아이디어를 적어보세요! 💡");
        if (text && text.trim()) {
            addIdeaNode(techId, text.trim());
        }
    }

    function deleteNode(id) {
        nodes = nodes.filter(n => n.id !== id && n.parentId !== id);
        render();
        App.saveState();
    }

    function escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text ? text.replace(/[&<>"']/g, m => map[m]) : "";
    }

    function getNodes() {
        return nodes;
    }

    function setNodes(loadedNodes) {
        if (loadedNodes && loadedNodes.length > 0) {
            nodes = loadedNodes;
            render();
        }
    }

    return {
        init,
        updateCenterProblem,
        addIdeaNode,
        promptAddLeaf,
        deleteNode,
        getNodes,
        setNodes
    };
})();
