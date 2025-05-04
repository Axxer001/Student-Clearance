// SIDEBAR FUNCTIONALITY
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidePanel = document.getElementById('side-panel');

// Toggle sidebar when clicking the hamburger
sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidePanel.classList.toggle('active');
});

// Prevent sidebar from closing when clicking inside it
sidePanel.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close sidebar if user clicks outside
document.addEventListener('click', () => {
    if (sidePanel.classList.contains('active')) {
        sidePanel.classList.remove('active');
    }
});

// NOTIFICATION POPUP FUNCTIONALITY
const bellIcon = document.querySelector('.notification-bell');
const popup = document.getElementById('notification-popup');

if (bellIcon && popup) {
    // Toggle popup visibility when bell icon is clicked
    bellIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });

    // Close popup if user clicks outside
    document.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Prevent popup from closing when clicking inside it
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// LOGOUT BUTTON FUNCTION
document.getElementById("logout-btn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
});

// PROGRESS BAR FUNCTION
function updateProgressBar() {
    const totalTasks = document.querySelectorAll('.task-card').length;
    const finishedTasks = document.querySelectorAll('.task-card.finished').length;

    const percentage = totalTasks === 0 ? 0 : Math.round((finishedTasks / totalTasks) * 100);

    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    const advisingStatus = document.getElementById('advising-status');

    // Fill the progress bar and change color based on percentage
    if (progressBarFill) {
        progressBarFill.style.width = `${percentage}%`;
        progressBarFill.style.background = percentage === 100
            ? "linear-gradient(to right, green, limegreen)"
            : "linear-gradient(to right, #bc1511, #e53935)";
    }

    // Update percentage text
    if (progressText) {
        progressText.textContent = `${percentage}% completed`;
    }

    // Toggle advising eligibility
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

// TASK CARD GENERATOR
const taskGrid = document.querySelector(".task-grid");

const tasks = [
    { name: "JUAN LUNA", role: "PhiCSS", due: "April 25, 2025", status: "finished" },
    { name: "HENERAL GOYO", role: "CSC", due: "April 30, 2025", status: "finished" },
    { name: "MARIA CLARA LORENZO LOBREGAT", role: "Divisoria Representative", due: "May 1, 2025", status: "finished" },
    { name: "JOSE RIZAL", role: "Cashier", due: "April 22, 2025", status: "finished" },
    { name: "NAPOLEON BONAPARTE", role: "Library", due: "April 30, 2025", status: "finished" },
    { name: "JULIUS CAESA", role: "Library", due: "April 30, 2025", status: "finished" }
];

// Create task cards and append to grid
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

// MODAL INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("task-modal");
    const closeModalBtn = modal.querySelector(".close-modal");
    const markFinishedBtn = modal.querySelector(".mark-finished");
    const statusTextElement = modal.querySelector("p:nth-child(4)");
    const proofSection = modal.querySelector(".proof-upload-section");
    const submitProofBtn = proofSection.querySelector(".submit-proof");
    const cancelProofBtn = proofSection.querySelector(".cancel-proof");
    const fileInput = proofSection.querySelector("#proof-upload");

    let activeCard = null;

    // Handle proof submission
    submitProofBtn.addEventListener("click", () => {
        if (!fileInput.files.length) {
            alert("Please upload a photo of your proof.");
            return;
        }

        // Change task status to pending
        activeCard.classList.remove("unfinished");
        activeCard.classList.add("pending");
        activeCard.dataset.requested = "true";

        if (statusTextElement) {
            statusTextElement.textContent = "Status: Pending";
        }

        // Update modal styling
        modal.classList.remove("modal-unfinished");
        modal.classList.add("modal-pending");

        // Lock the "Mark as Finished" button
        markFinishedBtn.textContent = "Request Sent";
        markFinishedBtn.classList.add("disabled-finished-btn");
        markFinishedBtn.style.pointerEvents = "none";
        markFinishedBtn.style.display = "block";

        // Hide proof upload section and reset input
        proofSection.classList.add("hidden");
        fileInput.value = "";

        // Close modal
        setTimeout(() => {
            modal.classList.remove("active");
            document.body.classList.remove("dimmed");
            activeCard = null;
        }, 600);
    });

    // Cancel proof upload
    cancelProofBtn.addEventListener("click", () => {
        proofSection.classList.add("hidden");
        markFinishedBtn.style.display = "block";
        fileInput.value = "";
    });

    // Open modal when clicking expand
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("expand-btn")) {
            activeCard = e.target.closest(".task-card");

            const name = activeCard.getAttribute("data-name") || "Unknown";
            const role = activeCard.getAttribute("data-role") || "Unknown";
            const due = activeCard.getAttribute("data-due") || "Unknown";

            // Fill modal content
            modal.querySelector("p:nth-child(2)").textContent = `Signature of: ${name}`;
            modal.querySelector("p:nth-child(3)").textContent = `From: ${role}`;
            modal.querySelector("p:nth-child(4)").textContent = `Due: ${due}`;

            modal.classList.add("active");
            document.body.classList.add("dimmed");

            // Determine card status
            const isFinished = activeCard.classList.contains("finished");
            const isPending = activeCard.classList.contains("pending");
            const isDue = activeCard.classList.contains("due");
            const isUnfinished = activeCard.classList.contains("unfinished");

            // Reset modal classes and button state
            modal.classList.remove("modal-finished", "modal-due", "modal-unfinished", "modal-pending");
            markFinishedBtn.classList.remove("disabled-finished-btn");
            markFinishedBtn.style.pointerEvents = "auto";

            // Set modal status text
            if (statusTextElement) {
                statusTextElement.textContent = `Status: ${
                    isFinished ? "Finished" :
                    isPending ? "Pending" :
                    isDue ? "Due" : "Unfinished"
                }`;
            }

            // Apply correct modal styles and button state
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
                    // Auto-convert to pending
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

    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.classList.remove("dimmed");
        activeCard = null;
    });

    // Handle "Mark as Finished" button click
    markFinishedBtn.addEventListener("click", () => {
        if (!activeCard || markFinishedBtn.classList.contains("disabled-finished-btn")) return;

        const isDue = activeCard.classList.contains("due");
        const isUnfinished = activeCard.classList.contains("unfinished");

        // Convert due task to pending directly
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

        // Only show proof section for unfinished cards
        if (isUnfinished) {
            proofSection.classList.remove("hidden");
            markFinishedBtn.style.display = "none";
        }
    });
});
