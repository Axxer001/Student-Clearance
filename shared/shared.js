// NAVBAR & SIDEBAR TOGGLE + OUTSIDE CLICK HANDLING
(function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidePanel = document.getElementById('side-panel');
  
    if (!sidebarToggle || !sidePanel) return; // Early exit if elements are not found
    
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the click from propagating to the document
      sidePanel.classList.toggle('active'); // Toggle the 'active' class on the side panel
    });
  
    // Close the side panel if the user clicks outside of it
    document.addEventListener('click', (e) => {
      if (!sidePanel.contains(e.target) && sidePanel.classList.contains('active')) {
        sidePanel.classList.remove('active'); // Remove the 'active' class if clicked outside
      }
    });
  })();
  
  // NOTIFICATION POPUP
  (function() {
    const bellIcon = document.querySelector('.notification-bell');
    const popup = document.getElementById('notification-popup');
  
    if (!bellIcon || !popup) return; // Early exit if elements are not found
  
    // Ensure the popup is hidden by default
    popup.style.display = 'none';
  
    bellIcon.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the click from propagating to the document
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block'; // Toggle visibility
    });
  
    // Close the notification popup if the user clicks outside of it
    document.addEventListener('click', () => {
      if (popup.style.display === 'block') {
        popup.style.display = 'none'; // Hide popup when clicking outside
      }
    });
  
    // Prevent the popup from closing if the user clicks inside it
    popup.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click event from propagating
    });
  })();
  
  
  // FOOTER LOGOUT BUTTON
  (function() {
    const logoutBtn = document.getElementById('logout-btn');
  
    if (!logoutBtn) return; // Early exit if the logout button is not found
  
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default link behavior
      window.location.href = 'index.html'; // Redirect to the homepage
    });
  })();

  