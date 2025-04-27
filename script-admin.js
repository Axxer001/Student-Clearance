// Toggle the side panel visibility
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidePanel = document.querySelector('.side-panel');

sidebarToggle.addEventListener('click', () => {
  sidePanel.classList.toggle('active');
});

// Notification bell toggle
const notificationBell = document.querySelector('.notification-bell');
const notificationPopup = document.querySelector('.notification-popup');

notificationBell.addEventListener('click', () => {
  notificationPopup.classList.toggle('active');
});

// Admin tabs toggle functionality (expand/collapse)
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Toggle the expanded state of the tab
    tab.classList.toggle('expanded');
  });
});

// Approve and delete buttons in student entries
const approveButtons = document.querySelectorAll('.approve-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

approveButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = "Approved";
    button.style.backgroundColor = "#27ae60"; // Green
  });
});

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = "Deleted";
    button.style.backgroundColor = "#c0392b"; // Red
  });
});

// Modal for viewing student submission (clicking on a student entry)
const studentEntries = document.querySelectorAll('.student-entry');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modalCloseButton = document.querySelector('.modal-actions .close');

studentEntries.forEach(entry => {
  entry.addEventListener('click', () => {
    modalOverlay.style.display = 'flex'; // Show the modal
  });
});

modalCloseButton.addEventListener('click', () => {
  modalOverlay.style.display = 'none'; // Hide the modal
});

// Function to close the modal by clicking outside the modal content
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none'; // Hide the modal if clicked outside
  }
});

// Optional: To show modal with student details (image and info)
function displayStudentDetails(student) {
  modalContent.innerHTML = `
    <h2>${student.name}</h2>
    <img src="${student.image}" alt="Student Image">
    <p>${student.details}</p>
  `;
}
