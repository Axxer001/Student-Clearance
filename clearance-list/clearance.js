
    /**
     * Student data array representing the table's content.
     */
    let studentsData = [
        { name: "John Doe", course: "BS Computer Science", year: "4th Year" },
        { name: "Jane Smith", course: "BS Information Technology", year: "3rd Year" },
        { name: "Michael Lee", course: "BS Electronics Engineering", year: "2nd Year" },
        { name: "Emily Brown", course: "BS Accountancy", year: "1st Year" },
    ];

    /**
     * Array to store removed students.
     */
    let removedStudents = [];

    /**
     * Populates the student table with the current studentsData.
     * @param {Array} data - The student data to display in the table.
     */
    function populateTable(data) {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Clear existing rows

        if (data.length === 0) {
            const noDataRow = document.createElement("tr");
            noDataRow.innerHTML = `<td colspan="4" class="text-center">No results found</td>`;
            tableBody.appendChild(noDataRow);
        } else {
            data.forEach((student, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>
                        <input type="checkbox" class="select-checkbox" data-index="${index}">
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        bindSelectCheckboxes(); // Rebind Select All functionality
    }

    /**
     * Populates the removed students table.
     */
    function populateRemovedTable() {
        // Add logic for removed students table if needed
    }

    /**
     * Filters student data based on search input and year filter, and refreshes the table.
     */
    function filterData() {
        const searchValue = document.getElementById("search-input").value.toLowerCase().trim();
        const activeYear = document.querySelector(".dropdown-item.active")?.dataset.year || "";

        const filteredData = studentsData.filter(student => {
            const matchesYear = !activeYear || student.year === activeYear;
            const matchesSearch =
                student.name.toLowerCase().includes(searchValue) ||
                student.course.toLowerCase().includes(searchValue);
            return matchesYear && matchesSearch;
        });

        populateTable(filteredData);
        document.getElementById("select-all-checkbox").checked = false;
    }

    /**
     * Binds Select All functionality to all checkboxes.
     */
    function bindSelectCheckboxes() {
        const selectAllCheckbox = document.getElementById("select-all-checkbox");
        const checkboxes = document.querySelectorAll(".select-checkbox");

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function () {
                selectAllCheckbox.checked = [...checkboxes].every(cb => cb.checked);
            });
        });

        selectAllCheckbox.addEventListener("change", function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }

    /**
     * Handles the Add button click.
     * Removes selected students from the main table and adds them to removedStudents.
     */
    document.getElementById("add-button").addEventListener("click", function () {
        const checkboxes = document.querySelectorAll(".select-checkbox:checked");
        const indicesToRemove = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));

        // Move selected students to the removedStudents array
        indicesToRemove.forEach(index => {
            removedStudents.push(studentsData[index]);
        });

        // Filter out selected students from the original data
        studentsData = studentsData.filter((_, index) => !indicesToRemove.includes(index));

        // Refresh the table
        filterData();
        populateRemovedTable(); // Optional: Update the removed students table if implemented
    });

    /**
     * Initializes event listeners for search input and dropdown filters.
     */
    function initializeFilters() {
        document.getElementById("search-input").addEventListener("input", filterData);

        document.querySelectorAll(".year-filter").forEach(item => {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelectorAll(".year-filter").forEach(filter => filter.classList.remove("active"));
                this.classList.add("active");
                const selectedYear = this.getAttribute("data-year");
                document.getElementById("yearFilterDropdown").textContent = selectedYear || "Filter Year";
                filterData();
            });
        });
    }

    // Initial population of the table
    populateTable(studentsData);

    // Initialize filters
    initializeFilters();
