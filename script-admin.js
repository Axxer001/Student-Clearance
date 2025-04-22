// ==== SIDEBAR TOGGLE ACTION ====
// Get the sidebar toggle button and side panel
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidePanel = document.getElementById('side-panel');

// When toggle button is clicked, show/hide the sidebar
sidebarToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent the event from bubbling up
  sidePanel.classList.toggle('active'); // Toggle the 'active' class
});

// Prevent clicks inside the sidebar from closing it
sidePanel.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Hide sidebar when clicking outside of it
document.addEventListener('click', () => {
  if (sidePanel.classList.contains('active')) {
    sidePanel.classList.remove('active');
  }
});


// ==== NOTIFICATION POPUP ====
// Get the notification bell icon and popup
const bellIcon = document.querySelector('.notification-bell');
const popup = document.getElementById('notification-popup');

if (bellIcon && popup) {
  // Toggle popup visibility on bell click
  bellIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });

  // Close popup when clicking outside
  document.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Prevent popup from closing when clicked inside
  popup.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}


// ==== TAB STUDENT COUNTERS ====
// Count the number of students in each tab and update the numbers
function updateTabCounters() {
  const finishedCount = document.querySelectorAll("#finished-tab .student-entry").length;
  const checkCount = document.querySelectorAll("#check-tab .student-entry").length;
  const taskCount = document.querySelectorAll("#task-tab .student-entry").length;

  document.querySelector(".finished-count").textContent = finishedCount;
  document.querySelector(".check-count").textContent = checkCount;
  document.querySelector(".task-count").textContent = taskCount;
}


// ==== LOGOUT BUTTON ====
// Redirect to index.html when logout button is clicked
document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});


// ==== EXPAND/COLLAPSE TABS ====
// Toggle expansion of each tab when clicked
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tab.classList.toggle('expanded');
  });
});


// ==== SAMPLE DATA PER TAB ====
const tabData = {
  finished: ['Kevin Librero', 'Miko Zamora', 'Razel Herodias'],
  check: ['Jhon Clein', 'Graziella Marife'],
  task: ['Renz Tagalog', 'Lance Bisaya']
};


// ==== RENDER STUDENT LIST INTO TABS ====
// tabClass: class name of the tab (e.g., 'check-tab')
// namesArray: array of student names
// showApprove: whether to show the ✔ approve button
function renderStudentList(tabClass, namesArray, showApprove = false) {
  const tab = document.querySelector(`.${tabClass} .details-list`);
  tab.innerHTML = ''; // Clear existing content

  namesArray.forEach(name => {
    const li = document.createElement('li');
    li.classList.add('student-entry');
    li.innerHTML = `
      <span class="student-name">${name}</span>
      <div class="entry-buttons">
        ${showApprove ? '<button class="approve-btn">✔</button>' : ''}
        <button class="delete-btn">🗑</button>
      </div>
    `;
    tab.appendChild(li);
  });

  // Update the counters after adding students
  updateTabCounters();
}


// ==== INITIAL RENDERING OF TABS ====
renderStudentList('finished-tab', tabData.finished);
renderStudentList('check-tab', tabData.check, true); // 'Check' tab has approve button
renderStudentList('task-tab', tabData.task, true);   // 'Task' tab has approve button


// ==== STUDENT ENTRY BUTTON ACTIONS ====
// Listen for clicks on approve/delete buttons
document.addEventListener('click', (e) => {
  const entry = e.target.closest('.student-entry');
  if (!entry) return;

  const parentTab = entry.closest('.tabs');
  const name = entry.querySelector('.student-name').textContent;

  // ---- DELETE BUTTON ----
  if (e.target.classList.contains('delete-btn')) {
    if (parentTab.classList.contains('finished-tab')) {
      tabData.finished = tabData.finished.filter(n => n !== name);
    } else if (parentTab.classList.contains('check-tab')) {
      tabData.check = tabData.check.filter(n => n !== name);
    } else if (parentTab.classList.contains('task-tab')) {
      tabData.task = tabData.task.filter(n => n !== name);
    }

    entry.remove(); // Remove from UI
    updateTabCounters(); // Update numbers
    return;
  }

  // ---- APPROVE BUTTON ----
  if (e.target.classList.contains('approve-btn')) {
    if (parentTab && parentTab.classList.contains('check-tab')) {
      // Show confirmation modal
      document.getElementById('modal-student-name').textContent = name;
      document.getElementById('check-modal').style.display = 'flex';

      // When user confirms approval
      document.getElementById('confirm-check-btn').onclick = () => {
        tabData.finished.push(name); // Add to finished list
        renderStudentList('finished-tab', tabData.finished); // Update finished tab
        entry.remove(); // Remove from check tab
        document.getElementById('check-modal').style.display = 'none'; // Close modal
        updateTabCounters();
      };

      // Cancel approval
      document.getElementById('cancel-check-btn').onclick = () => {
        document.getElementById('check-modal').style.display = 'none';
      };

    } else if (parentTab && parentTab.classList.contains('task-tab')) {
      // For task tab: just remove the student from the list
      entry.remove();
      updateTabCounters();
    }
  }
});


// ==== INITIALIZE COUNTERS ON PAGE LOAD ====
document.addEventListener('DOMContentLoaded', () => {
  updateTabCounters();
});
