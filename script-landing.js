// =========================
// Sidebar Toggle Functionality
// =========================
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidePanel = document.getElementById('side-panel');

sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidePanel.classList.toggle('active');
});

sidePanel.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('click', () => {
    if (sidePanel.classList.contains('active')) {
        sidePanel.classList.remove('active');
    }
});

// =========================
// Notification Popup Toggle
// =========================
const bellIcon = document.querySelector('.notification-bell');
const popup = document.getElementById('notification-popup');

if (bellIcon && popup) {
    bellIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// =========================
// Logout Functionality
// =========================
document.getElementById("logout-btn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
});

// =========================
// Progress Bar Functionality
// =========================
function updateProgressBar() {
    const totalTasks = document.querySelectorAll('.task-card').length;
    const finishedTasks = document.querySelectorAll('.task-card.finished').length;

    const percentage = totalTasks === 0 ? 0 : Math.round((finishedTasks / totalTasks) * 100);

    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const advisingStatus = document.getElementById('advising-status');

    if (progressBarFill) {
        progressBarFill.style.width = `${percentage}%`;
        progressBarFill.style.background = percentage === 100
            ? "linear-gradient(to right, green, limegreen)"
            : "linear-gradient(to right, #bc1511, #e53935)";
    }

    if (progressText) {
        progressText.textContent = `${percentage}% completed`;
    }

    if (advisingStatus) {
        if (percentage === 100) {
            advisingStatus.textContent = "You are now able to proceed for Advising";
            advisingStatus.classList.remove("status-disabled");
            advisingStatus.classList.add("status-enabled");
        } else {
            advisingStatus.textContent = "Unable to proceed for Advising";
            advisingStatus.classList.remove("status-enabled");
            advisingStatus.classList.add("status-disabled");
        }
    }
}

// =========================
// Dynamic Task Card Rendering
// =========================
const taskGrid = document.querySelector(".task-grid");

const tasks = [
    { name: "LANDREI RAFANAN ZERNA", role: "PhiCSS", due: "April 25, 2025", status: "unfinished" },
    { name: "JUAN DELA CRUZ", role: "Library", due: "April 30, 2025", status: "unfinished" },
    { name: "MARIA CLARA", role: "Guidance Office", due: "May 1, 2025", status: "unfinished" },
    { name: "JOSE RIZAL", role: "Cashier", due: "April 22, 2025", status: "finished" },
    { name: "JUAN DELA CRUZ", role: "Library", due: "April 30, 2025", status: "unfinished" },
    { name: "JUAN DELA CRUZ", role: "Library", due: "April 30, 2025", status: "unfinished" }
];

tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task-card", task.status);
    if (task.status === "pending") card.dataset.requested = "true";

    card.setAttribute("data-name", task.name);
    card.setAttribute("data-role", task.role);
    card.setAttribute("data-due", task.due);

    card.innerHTML = `
        <div class="task-header">
            <span class="task-title">${task.name}</span>
            <button class="expand-btn" aria-label="Expand task">↗</button>
        </div>
        <div class="task-role">${task.role}</div>
        <div class="task-status-bar"></div>
    `;

    taskGrid.appendChild(card);
});

updateProgressBar();

// =========================
// Modal Functionality
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("task-modal");
    const closeModalBtn = modal.querySelector(".close-modal");
    const markFinishedBtn = modal.querySelector(".mark-finished");
    const statusTextElement = modal.querySelector("p:nth-child(4)");

    let activeCard = null;

    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("expand-btn")) {
            activeCard = e.target.closest(".task-card");

            const name = activeCard.getAttribute("data-name") || "Unknown";
            const role = activeCard.getAttribute("data-role") || "Unknown";
            const due = activeCard.getAttribute("data-due") || "Unknown";

            modal.querySelector("p:nth-child(2)").textContent = `Signature of: ${name}`;
            modal.querySelector("p:nth-child(3)").textContent = `From: ${role}`;
            modal.querySelector("p:nth-child(4)").textContent = `Due: ${due}`;

            modal.classList.add("active");
            document.body.classList.add("dimmed");

            const isFinished = activeCard.classList.contains("finished");
            const isPending = activeCard.classList.contains("pending");
            const isDue = activeCard.classList.contains("due");
            const isUnfinished = activeCard.classList.contains("unfinished");

            modal.classList.remove("modal-finished", "modal-due", "modal-unfinished", "modal-pending");
            markFinishedBtn.classList.remove("disabled-finished-btn");
            markFinishedBtn.style.pointerEvents = "auto";

            if (statusTextElement) {
                statusTextElement.textContent = `Status: ${
                    isFinished ? "Finished" :
                    isPending ? "Pending" :
                    isDue ? "Due" : "Unfinished"
                }`;
            }

            if (isFinished) {
                modal.classList.add("modal-finished");
                markFinishedBtn.textContent = "Task Finished";
                markFinishedBtn.classList.add("disabled-finished-btn");
                markFinishedBtn.style.pointerEvents = "none";
            } else if (isPending) {
                modal.classList.add("modal-pending");
                markFinishedBtn.textContent = "Request Sent";
                markFinishedBtn.classList.add("disabled-finished-btn");
                markFinishedBtn.style.pointerEvents = "none";
            } else if (isDue) {
                modal.classList.add("modal-due");

                if (activeCard.dataset.requested === "true") {
                    activeCard.classList.remove("due");
                    activeCard.classList.add("pending");
                    modal.classList.remove("modal-due");
                    modal.classList.add("modal-pending");
                    markFinishedBtn.textContent = "Request Sent";
                    markFinishedBtn.classList.add("disabled-finished-btn");
                    markFinishedBtn.style.pointerEvents = "none";
                    statusTextElement.textContent = "Status: Pending";
                } else {
                    markFinishedBtn.textContent = "Request Alternate Task";
                }
            } else {
                modal.classList.add("modal-unfinished");
                markFinishedBtn.textContent = "Mark as Finished";
            }
        }
    });

    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.classList.remove("dimmed");
        activeCard = null;
    });

    markFinishedBtn.addEventListener("click", () => {
        if (!activeCard || markFinishedBtn.classList.contains("disabled-finished-btn")) return;

        const isDue = activeCard.classList.contains("due");
        const isUnfinished = activeCard.classList.contains("unfinished");

        if (isDue) {
            activeCard.classList.remove("due");
            activeCard.classList.add("pending");
            activeCard.dataset.requested = "true";

            markFinishedBtn.textContent = "Request Sent";
            markFinishedBtn.classList.add("disabled-finished-btn");
            markFinishedBtn.style.pointerEvents = "none";

            modal.classList.remove("modal-due");
            modal.classList.add("modal-pending");

            if (statusTextElement) {
                statusTextElement.textContent = "Status: Pending";
            }

            setTimeout(() => {
                modal.classList.remove("active");
                document.body.classList.remove("dimmed");
                activeCard = null;
            }, 600);
            return;
        }

        if (isUnfinished) {
            activeCard.classList.remove("unfinished", "due", "pending");
            activeCard.classList.add("finished");

            if (statusTextElement) {
                statusTextElement.textContent = "Status: Finished";
            }

            markFinishedBtn.textContent = "Task Finished";
            markFinishedBtn.classList.add("disabled-finished-btn");
            markFinishedBtn.style.pointerEvents = "none";

            modal.classList.remove("modal-due", "modal-unfinished", "modal-pending");
            modal.classList.add("modal-finished");

            updateProgressBar();

            setTimeout(() => {
                modal.classList.remove("active");
                document.body.classList.remove("dimmed");
                activeCard = null;
            }, 600);
        }
    });
});
