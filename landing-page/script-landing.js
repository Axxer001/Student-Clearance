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
    { name: "JUAN LUNA", role: "PhiCSS", due: "April 25, 2025", status: "finished", alternate: "n/a", extend: "n/a" },
    { name: "HENERAL GOYO", role: "CSC", due: "(already past due)", status: "finished", alternate: "Clean CSS Bathrooms.", extend: "May 10, 2025" },
    { name: "MARIA CLARA LORENZO LOBREGAT", role: "Divisoria Representative", due: "May 1, 2025", status: "unfinished", alternate: "n/a", extend: "n/a" },
    { name: "JOSE RIZAL", role: "Cashier", due: "(already past due)", status: "unfinished", alternate: "Buy atleast 5 cleaning materials.", extend: "April 30, 2025" },
    { name: "NAPOLEON BONAPARTE", role: "Library", due: "April 30, 2025", status: "due", alternate: "n/a", extend: "n/a" },
    { name: "JULIUS CAESA", role: "Library", due: "April 30, 2025", status: "due", alternate: "n/a", extend: "n/a" }
];

// Create task cards and append to grid
tasks.forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task-card", task.status);
    if (task.status === "pending") card.dataset.requested = "true";

    card.setAttribute("data-name", task.name);
    card.setAttribute("data-role", task.role);
    card.setAttribute("data-due", task.due);
    card.setAttribute("data-alternate", task.alternate);
    card.setAttribute("data-extend", task.extend);

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
            const alternate = activeCard.getAttribute("data-alternate") || "Unknown";
            const extend = activeCard.getAttribute("data-extend") || "Unknown";
            

            // Fill modal content
            modal.querySelector("p:nth-child(2)").textContent = `Signature of: ${name}`;
            modal.querySelector("p:nth-child(3)").textContent = `From: ${role}`;
            modal.querySelector("p:nth-child(5)").textContent = `Due: ${due}`;
            modal.querySelector("p:nth-child(6)").textContent = `Alternate Task: ${alternate}`;
            modal.querySelector("p:nth-child(7)").textContent = `Extended Until: ${extend}`;


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

document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('click', function () {
        const modal = document.querySelector('.task-modal');
        
        // Check the card's class to determine status
        if (card.classList.contains('finished')) {
            modal.classList.add('modal-finished');
            modal.classList.remove('modal-unfinished');
        } else if (card.classList.contains('unfinished')) {
            modal.classList.add('modal-unfinished');
            modal.classList.remove('modal-finished');
        } else {
            modal.classList.remove('modal-finished', 'modal-unfinished');
        }

        // Show the modal
        modal.classList.add('active');
        document.body.classList.add('dimmed');
    });
});

// Close button handler
document.querySelector('.close-modal').addEventListener('click', function () {
    const modal = document.querySelector('.task-modal');
    modal.classList.remove('active', 'modal-finished', 'modal-unfinished');
    document.body.classList.remove('dimmed');
});

document.addEventListener('DOMContentLoaded', function () {
    // Sample data with semester and schoolYear
    const clearanceHistoryData = [
      {
        section: 'Computer Science 101',
        facilitator: 'Prof. Juan Dela Cruz',
        status: 'Finished',
        due: 'April 25, 2025',
        semester: '2nd',
        schoolYear: '2023-2024'
      },
      {
        section: 'Math 201',
        facilitator: 'Dr. Maria Santos',
        status: 'Pending',
        due: 'May 5, 2025',
        semester: '2nd',
        schoolYear: '2024-2025'
      },
      {
        section: 'English 102',
        facilitator: 'Ms. Ana Garcia',
        status: 'In Progress',
        due: 'May 10, 2025',
        semester: '1st',
        schoolYear: '2023-2024'
      },
      {
        section: 'Physics 103',
        facilitator: 'Prof. Ramon Lopez',
        status: 'Finished',
        due: 'April 30, 2025',
        semester: '2nd',
        schoolYear: '2025-2026'
      },
      {
        section: 'Computer Science 101',
        facilitator: 'Prof. Juan Dela Cruz',
        status: 'Finished',
        due: 'April 25, 2025',
        semester: '2nd',
        schoolYear: '2023-2024'
      },
      {
        section: 'Computer Science 101',
        facilitator: 'Prof. Juan Dela Cruz',
        status: 'In Progress',
        due: 'May 5, 2025',
        semester: '2nd',
        schoolYear: '2023-2024'
      },
      {
        section: 'Computer Science 101',
        facilitator: 'Prof. Juan Dela Cruz',
        status: 'Pending',
        due: 'May 10, 2025',
        semester: '2nd',
        schoolYear: '2023-2024'
      },
      {
        section: 'Math 201',
        facilitator: 'Dr. Maria Santos',
        status: 'Pending',
        due: 'May 5, 2025',
        semester: '2nd',
        schoolYear: '2024-2025'
      },
      {
        section: 'Math 201',
        facilitator: 'Dr. Maria Santos',
        status: 'Finished',
        due: 'April 20, 2025',
        semester: '2nd',
        schoolYear: '2023-2024'
      },
      {
        section: 'Math 201',
        facilitator: 'Dr. Maria Santos',
        status: 'In Progress',
        due: 'May 15, 2025',
        semester: '2nd',
        schoolYear: '2025-2026'
      },
      {
        section: 'English 102',
        facilitator: 'Ms. Ana Garcia',
        status: 'In Progress',
        due: 'May 10, 2025',
        semester: '1st',
        schoolYear: '2023-2024'
      },
      {
        section: 'English 102',
        facilitator: 'Ms. Ana Garcia',
        status: 'Finished',
        due: 'April 30, 2025',
        semester: '2nd',
        schoolYear: '2024-2025'
      },
      {
        section: 'English 102',
        facilitator: 'Ms. Ana Garcia',
        status: 'Pending',
        due: 'May 12, 2025',
        semester: '2nd',
        schoolYear: '2025-2026'
      },
      {
        section: 'Physics 103',
        facilitator: 'Prof. Ramon Lopez',
        status: 'Finished',
        due: 'April 30, 2025',
        semester: '2nd',
        schoolYear: '2025-2026'
      },
      {
        section: 'Physics 103',
        facilitator: 'Prof. Ramon Lopez',
        status: 'In Progress',
        due: 'May 1, 2025',
        semester: '1st',
        schoolYear: '2023-2024'
      },
      {
        section: 'Physics 103',
        facilitator: 'Prof. Ramon Lopez',
        status: 'Pending',
        due: 'May 20, 2025',
        semester: '2nd',
        schoolYear: '2024-2025'
      } ,
        // 2023-2024 Data
        { section: 'Computer Science 101', facilitator: 'Prof. Juan Dela Cruz', status: 'Finished', due: 'April 25, 2025', semester: '1st', schoolYear: '2023-2024' },
        { section: 'Math 201', facilitator: 'Dr. Maria Santos', status: 'In Progress', due: 'May 15, 2025', semester: '1st', schoolYear: '2023-2024' },
        { section: 'English 102', facilitator: 'Ms. Ana Garcia', status: 'Pending', due: 'May 10, 2025', semester: '1st', schoolYear: '2023-2024' },
      
        // 2024-2025 Data
        { section: 'Computer Science 101', facilitator: 'Prof. Juan Dela Cruz', status: 'Pending', due: 'May 10, 2025', semester: '2nd', schoolYear: '2024-2025' },
        { section: 'Math 201', facilitator: 'Dr. Maria Santos', status: 'Pending', due: 'May 5, 2025', semester: '2nd', schoolYear: '2024-2025' },
        { section: 'English 102', facilitator: 'Ms. Ana Garcia', status: 'Finished', due: 'April 30, 2025', semester: '2nd', schoolYear: '2024-2025' },
        { section: 'Physics 103', facilitator: 'Prof. Ramon Lopez', status: 'Pending', due: 'May 20, 2025', semester: '2nd', schoolYear: '2024-2025' },
        { section: 'Computer Science 101', facilitator: 'Prof. Juan Dela Cruz', status: 'In Progress', due: 'May 5, 2024', semester: '1st', schoolYear: '2024-2025' },
        { section: 'Math 201', facilitator: 'Dr. Maria Santos', status: 'Finished', due: 'April 20, 2024', semester: '1st', schoolYear: '2024-2025' },
      
        // 2025-2026 Data
        { section: 'English 102', facilitator: 'Ms. Ana Garcia', status: 'Pending', due: 'May 12, 2025', semester: '2nd', schoolYear: '2025-2026' },
        { section: 'Math 201', facilitator: 'Dr. Maria Santos', status: 'In Progress', due: 'May 15, 2025', semester: '2nd', schoolYear: '2025-2026' },
        { section: 'Physics 103', facilitator: 'Prof. Ramon Lopez', status: 'Finished', due: 'April 30, 2025', semester: '2nd', schoolYear: '2025-2026' },
        { section: 'Computer Science 101', facilitator: 'Prof. Juan Dela Cruz', status: 'In Progress', due: 'May 1, 2024', semester: '1st', schoolYear: '2025-2026' },
        { section: 'Physics 103', facilitator: 'Prof. Ramon Lopez', status: 'Pending', due: 'May 12, 2024', semester: '1st', schoolYear: '2025-2026' },
        { section: 'Math 201', facilitator: 'Dr. Maria Santos', status: 'Finished', due: 'April 15, 2024', semester: '1st', schoolYear: '2025-2026' } 
    ];
  
    // Function to populate the table
    function populateTable(data) {
      const tableBody = document.getElementById('clearance-history-body');
      tableBody.innerHTML = '';  // Clear any existing rows
  
      // Iterate over the data and add rows to the table
      data.forEach(item => {
        const row = document.createElement('tr');
  
        const sectionCell = document.createElement('td');
        sectionCell.textContent = item.section;
        row.appendChild(sectionCell);
  
        const facilitatorCell = document.createElement('td');
        facilitatorCell.textContent = item.facilitator;
        row.appendChild(facilitatorCell);
  
        const statusCell = document.createElement('td');
        statusCell.textContent = item.status;
        row.appendChild(statusCell);
  
        const dueCell = document.createElement('td');
        dueCell.textContent = item.due;
        row.appendChild(dueCell);
  
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    }
  
    // Function to filter data based on selected semester and school year
    function filterData() {
      const semester = document.getElementById('semester-dropdown').value;
      const schoolYear = document.getElementById('schoolyear-dropdown').value;
  
      // Filter the data based on the selected semester and school year
      const filteredData = clearanceHistoryData.filter(item => {
        return item.semester === semester && item.schoolYear === schoolYear;
      });
  
      // Populate the table with the filtered data
      populateTable(filteredData);
    }
  
    // Attach event listeners to the dropdowns to filter data when the user changes the selection
    document.getElementById('semester-dropdown').addEventListener('change', filterData);
    document.getElementById('schoolyear-dropdown').addEventListener('change', filterData);
  
    // Initially populate the table with all data
    populateTable(clearanceHistoryData);
  });
  