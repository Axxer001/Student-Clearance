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
// Admin Tabs Expand/Collapse
// =========================
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tab.classList.toggle('expanded');
    });
});
