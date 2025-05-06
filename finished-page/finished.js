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
    const searchBar = document.getElementById("search-bar"); // Assuming the search bar has this ID

    let selectedSemester = "Semester";
    let selectedYear = "Filter Year";

    // Function to populate the table
    function populateTable(data) {
        tableBody.innerHTML = "";

        if (data.length === 0) {
            const noDataRow = document.createElement("tr");
            const noDataCell = document.createElement("td");
            noDataCell.setAttribute("colspan", 3);
            noDataCell.classList.add("placeholder");
            noDataCell.textContent = "No data available";
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
            return;
        }

        data.forEach((student) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to filter the data
    function filterData() {
        const filteredData = students.filter((student) => {
            const matchesSemester =
                selectedSemester === "Semester" || selectedSemester === "All" || student.semester === selectedSemester;
            const matchesYear =
                selectedYear === "Filter Year" || selectedYear === "All Years" || student.year === selectedYear;
            return matchesSemester && matchesYear;
        });
        populateTable(filteredData);
    }

    // Event listeners for semester filter
    document.querySelectorAll("#semesterFilter + .dropdown-menu .dropdown-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            selectedSemester = e.target.textContent;
            filterData();
        });
    });

    // Event listeners for year filter
    document.querySelectorAll("#yearFilter + .dropdown-menu .dropdown-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            selectedYear = e.target.textContent;
            filterData();
        });
    });

    // Event listener for search bar
    searchBar.addEventListener("input", () => {
        const searchQuery = searchBar.value.trim().toLowerCase();
        const filteredData = students.filter((student) => {
            const matchesSemester =
                selectedSemester === "Semester" || selectedSemester === "All" || student.semester === selectedSemester;
            const matchesYear =
                selectedYear === "Filter Year" || selectedYear === "All Years" || student.year === selectedYear;
            const matchesSearch =
                student.name.toLowerCase().includes(searchQuery) || student.course.toLowerCase().includes(searchQuery);

            return matchesSemester && matchesYear && matchesSearch;
        });
        populateTable(filteredData);
    });

    // Initial population
    populateTable(students);
});
