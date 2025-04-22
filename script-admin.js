//SIDEBAE ACTION
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

//NOTIF POPUP
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

// TAB NAME COUNTERS
function updateTabCounters() {
  const finishedCount = document.querySelectorAll("#finished-tab .student-entry").length;
  const checkCount = document.querySelectorAll("#check-tab .student-entry").length;
  const taskCount = document.querySelectorAll("#task-tab .student-entry").length;

  document.querySelector(".finished-count").textContent = finishedCount;
  document.querySelector(".check-count").textContent = checkCount;
  document.querySelector(".task-count").textContent = taskCount;
}

//LOGOUT
document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});

//ADMIN TAB EXPAND N COLLAPSE
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tab.classList.toggle('expanded');
  });
});

//TAB DATA
const tabData = {
  finished: ['Kevin Librero', 'Miko Zamora', 'Razel Herodias'],
  check: ['Jhon Clein', 'Graziella Marife'],
  task: ['Renz Tagalog', 'Lance Bisaya']
};

//STUDENT LIST RENDERER
function renderStudentList(tabClass, namesArray, showApprove = false) {
  const tab = document.querySelector(`.${tabClass} .details-list`);
  tab.innerHTML = '';

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

  // ✅ Update counters after rendering each list
  updateTabCounters();
}

//RENDER PER TAB
renderStudentList('finished-tab', tabData.finished);
renderStudentList('check-tab', tabData.check, true);
renderStudentList('task-tab', tabData.task, true);

//NAME BUTTON ACTIONS 
document.addEventListener('click', (e) => {
  const entry = e.target.closest('.student-entry');
  if (!entry) return;

  const parentTab = entry.closest('.tabs');
  const name = entry.querySelector('.student-name').textContent;

  // DELETE BUTTON
  if (e.target.classList.contains('delete-btn')) {
    if (parentTab.classList.contains('finished-tab')) {
      // Remove from tabData.finished
      tabData.finished = tabData.finished.filter(n => n !== name);
    } else if (parentTab.classList.contains('check-tab')) {
      // Remove from tabData.check
      tabData.check = tabData.check.filter(n => n !== name);
    } else if (parentTab.classList.contains('task-tab')) {
      // Remove from tabData.task
      tabData.task = tabData.task.filter(n => n !== name);
    }
  
    entry.remove();
    updateTabCounters();
    return;
  }
  

  // APPROVE BUTTON
  if (e.target.classList.contains('approve-btn')) {
    if (parentTab && parentTab.classList.contains('check-tab')) {
      document.getElementById('modal-student-name').textContent = name;
      document.getElementById('check-modal').style.display = 'flex';

      document.getElementById('confirm-check-btn').onclick = () => {
        tabData.finished.push(name);
        renderStudentList('finished-tab', tabData.finished); // rerender Finished
        entry.remove(); // remove from Check tab
        document.getElementById('check-modal').style.display = 'none';
        updateTabCounters(); //  Update both tabs
      };

      document.getElementById('cancel-check-btn').onclick = () => {
        document.getElementById('check-modal').style.display = 'none';
      };

    } else if (parentTab && parentTab.classList.contains('task-tab')) {
      entry.remove();
      updateTabCounters(); // Remove from Task
    }
  }
});

// Call once on load to initialize counters
document.addEventListener('DOMContentLoaded', () => {
  updateTabCounters();
});
