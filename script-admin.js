// ---------------------------
// Sidebar toggle functionality
// ---------------------------
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

// ---------------------------
// Notification bell toggle functionality
// ---------------------------
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

  // Close notification when clicking outside
  document.addEventListener('click', (e) => {
    if (!notificationPopup.contains(e.target) && !notificationBell.contains(e.target)) {
      notificationPopup.classList.remove('active');
    }
  });
}

// ---------------------------
// Admin tabs toggle functionality (expand/collapse)
// ---------------------------
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tab.classList.toggle('expanded');
  });
});

// ---------------------------
// Approve and delete buttons
// ---------------------------
const approveButtons = document.querySelectorAll('.approve-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

approveButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking "Approve"
    button.textContent = "Approved";
    button.style.backgroundColor = "#27ae60"; // Green
  });
});

deleteButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking "Delete"
    button.textContent = "Deleted";
    button.style.backgroundColor = "#c0392b"; // Red
  });
});

// ---------------------------
// Modal for viewing student submission
// ---------------------------
const studentEntries = document.querySelectorAll('.student-entry');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modalCloseButton = document.querySelector('.modal-actions .close');

studentEntries.forEach(entry => {
  entry.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
  });
});

if (modalCloseButton) {
  modalCloseButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });
}

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});
