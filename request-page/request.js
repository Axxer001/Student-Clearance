document.addEventListener("DOMContentLoaded", () => {
    // Sample student data
    const students = [
        { name: "Alice Johnson", course: "BS Computer Science", year: "4th Year", semester: "1st Sem" },
        { name: "Bob Smith", course: "BS Information Technology", year: "3rd Year", semester: "2nd Sem" },
        { name: "Charlie Brown", course: "BS Accountancy", year: "1st Year", semester: "1st Sem" },
        { name: "Diana Prince", course: "BS Civil Engineering", year: "4th Year", semester: "2nd Sem" },
        { name: "Ethan Hunt", course: "BS Mechanical Engineering", year: "2nd Year", semester: "1st Sem" },
        { name: "Fiona Carter", course: "BS Architecture", year: "3rd Year", semester: "2nd Sem" },
        { name: "George Clark", course: "BS Computer Science", year: "2nd Year", semester: "1st Sem" },
        { name: "Hannah Adams", course: "BS Education", year: "1st Year", semester: "2nd Sem" },
        { name: "Ian White", course: "BS Information Technology", year: "4th Year", semester: "1st Sem" },
        { name: "Jenna Miller", course: "BS Psychology", year: "2nd Year", semester: "2nd Sem" },
        { name: "Kevin Harris", course: "BS Computer Engineering", year: "3rd Year", semester: "1st Sem" },
        { name: "Laura Moore", course: "BS Business Administration", year: "1st Year", semester: "2nd Sem" },
        { name: "Matt Taylor", course: "BS Accountancy", year: "4th Year", semester: "1st Sem" },
        { name: "Jane Smith", course: "BS Information Technology", year: "3rd Year", semester: "1st Sem" },
        { name: "Michael Lee", course: "BS Electronics Engineering", year: "2nd Year", semester: "2nd Sem" },
        { name: "Emily Brown", course: "BS Accountancy", year: "1st Year", semester: "1st Sem" },
        { name: "Nathan Drake", course: "BS Computer Science", year: "3rd Year", semester: "2nd Sem" },
        { name: "Olivia Green", course: "BS Nursing", year: "4th Year", semester: "1st Sem" },
        { name: "Patrick Star", course: "BS Education", year: "2nd Year", semester: "1st Sem" },
        { name: "Quinn Harper", course: "BS Mathematics", year: "4th Year", semester: "2nd Sem" },
        { name: "Rachel Ray", course: "BS Computer Science", year: "1st Year", semester: "2nd Sem" },
        { name: "Steve Rogers", course: "BS Civil Engineering", year: "3rd Year", semester: "1st Sem" },
        { name: "Tony Stark", course: "BS Computer Science", year: "2nd Year", semester: "2nd Sem" },
        { name: "Uma Thurman", course: "BS Accountancy", year: "1st Year", semester: "1st Sem" },
        { name: "Victor Stone", course: "BS Computer Engineering", year: "4th Year", semester: "2nd Sem" },
        { name: "Wanda Maximoff", course: "BS Psychology", year: "3rd Year", semester: "1st Sem" },
        { name: "Xander Cage", course: "BS Mechanical Engineering", year: "2nd Year", semester: "2nd Sem" },
        { name: "Yara Greyjoy", course: "BS Business Administration", year: "1st Year", semester: "2nd Sem" },
        { name: "Zack Fair", course: "BS Computer Science", year: "4th Year", semester: "1st Sem" }
    ];

    const tableBody = document.getElementById("table-body");
    const searchBar = document.getElementById("search-bar");
    const selectAllCheckbox = document.getElementById("select-all");
    const addButton = document.getElementById('add-button');
    const alternateTaskModal = document.getElementById('alternate-task-modal');
    const closeModalButton = document.getElementById('close-modal');
    const cancelButton = document.getElementById('cancel-task');

    let selectedYear = "Filter Year";
    let currentStudents = [...students]; // Keep a copy of the original data for filtering
    let modalVisible = false; // Add this line

    // Function to populate the table
    function populateTable(data) {
        tableBody.innerHTML = "";

        if (data.length === 0) {
            const noDataRow = document.createElement("tr");
            const noDataCell = document.createElement("td");
            noDataCell.setAttribute("colspan", 4);
            noDataCell.classList.add("placeholder");
            noDataCell.textContent = "No data available";
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
            return;
        }

        data.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
                <td><input type="checkbox" class="student-checkbox" data-index="${index}"></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to handle 'select all' checkbox
    selectAllCheckbox.addEventListener("change", () => {
        const checkboxes = document.querySelectorAll(".student-checkbox");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Function to filter the data by year
    function filterByYear(year) {
        selectedYear = year;
        const filteredData = students.filter(student =>
            selectedYear === "All Years" || student.year === selectedYear
        );
        currentStudents = filteredData; // Update the current filtered data
        applySearch(); // Apply the current search query to the filtered data
    }

    // Event listeners for year filter dropdown items
    document.querySelectorAll("#yearFilter + .dropdown-menu .dropdown-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            const year = e.target.textContent;
            const yearFilterButton = document.getElementById('yearFilter');
            yearFilterButton.textContent = (year === "All Years") ? "Filter Year" : `Filter Year (${year})`;
            filterByYear(year);
        });
    });

    // Function to apply search to the current filtered students
    function applySearch() {
        const searchQuery = searchBar.value.trim().toLowerCase();
        const searchedData = currentStudents.filter(student =>
            student.name.toLowerCase().includes(searchQuery) ||
            student.course.toLowerCase().includes(searchQuery)
        );
        populateTable(searchedData);
    }

    // Event listener for search bar
    searchBar.addEventListener("input", applySearch);

    // Modal functionality - Modified to use modalVisible
    if (addButton && alternateTaskModal && closeModalButton && cancelButton) {
        addButton.addEventListener('click', function () {
            const selectedCheckboxes = document.querySelectorAll('.student-checkbox:checked');
            if (selectedCheckboxes.length > 0) {
                modalVisible = true;
                updateModalVisibility(); // Show the modal
            } else {
                alert("Please select at least one student before adding a task."); // Or any other user feedback
            }
        });

        closeModalButton.addEventListener('click', function () {
            modalVisible = false;
            updateModalVisibility(); // Hide the modal
        });

        cancelButton.addEventListener('click', function () {
            modalVisible = false;
            updateModalVisibility(); // Hide the modal
        });

        // Close the modal if the user clicks outside of it
        window.addEventListener('click', function (event) {
            if (event.target === alternateTaskModal) {
                modalVisible = false;
                updateModalVisibility(); // Hide the modal
            }
        });
    } else {
        console.error('One or more modal elements not found.');
    }

    function updateModalVisibility() {
        alternateTaskModal.style.display = modalVisible ? 'block' : 'none';
    }

    // Initial population of the table
    populateTable(currentStudents);
});

const addButton = document.getElementById('add-button');
const alternateTaskModal = document.getElementById('alternate-task-modal');

let modalVisible = false; // Tracks modal visibility

// Function to update modal visibility
function updateModalVisibility() {
    alternateTaskModal.style.display = modalVisible ? 'block' : 'none';
}

const body = document.body;
const modal = document.getElementById('alternate-task-modal');

// Add event listeners for modal functionality
addButton.addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll(".student-checkbox:checked");
    if (selectedCheckboxes.length > 0) {
        modalVisible = true;
        updateModalVisibility(); // Show the modal
    } else {
        alert("Please select at least one student before adding a task.");
    }
});

// Add event listener for submit button
const submitButton = document.getElementById('submit-task'); // Assuming there's a submit button in the modal
let removedStudents = [];  // New array to store removed students

// Event listener for the Submit button
if (submitButton) {
    submitButton.addEventListener('click', function () {
        modalVisible = false;
        updateModalVisibility(); // Hide the modal
        alert("Task sent successfully!");
    });
}



// Add event listener for cancel button
const cancelButton = document.getElementById('cancel-task');
if (cancelButton) {
    cancelButton.addEventListener('click', function () {
        cancelButton.addEventListener("click", () => {
            modalVisible = false;
            updateModalVisibility(); // Hide the modal
            alert("Task cancelled.");
        });
    });
}

function updateModalVisibility() {
    if (modalVisible) {
        body.classList.add('body-blurred'); // Add blur effect
        modal.style.display = 'block'; // Show the modal
        modal.style.position = 'fixed'; // Ensure it's positioned on top
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '1000'; // Ensure it's above other content
    } else {
        body.classList.remove('body-blurred'); // Remove blur effect
        modal.style.display = 'none'; // Hide the modal
    }
    
}



