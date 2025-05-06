document.addEventListener("DOMContentLoaded", () => {
    // Sample student data
    const students = [
        { name: "John Doe", course: "BS Artificial Intelligence", year: "4th Year", semester: "1st Sem" },
        { name: "Jane Doe", course: "BS Data Science", year: "3rd Year", semester: "2nd Sem" },
        { name: "Chris Evans", course: "BS Business Management", year: "1st Year", semester: "1st Sem" },
        { name: "Emma Stone", course: "BS Civil Engineering", year: "4th Year", semester: "2nd Sem" },
        { name: "Ryan Reynolds", course: "BS Mechanical Engineering", year: "2nd Year", semester: "1st Sem" },
        { name: "Scarlett Johansson", course: "BS Architecture", year: "3rd Year", semester: "2nd Sem" },
        { name: "Robert Downey Jr.", course: "BS Computer Science", year: "2nd Year", semester: "1st Sem" },
        { name: "Olivia Wilde", course: "BS Education", year: "1st Year", semester: "2nd Sem" },
        { name: "Jake Gyllenhaal", course: "BS Information Technology", year: "4th Year", semester: "1st Sem" },
        { name: "Natalie Portman", course: "BS Psychology", year: "2nd Year", semester: "2nd Sem" },
        { name: "Matt Damon", course: "BS Computer Engineering", year: "3rd Year", semester: "1st Sem" },
        { name: "Jennifer Lawrence", course: "BS Business Administration", year: "1st Year", semester: "2nd Sem" },
        { name: "Tom Hanks", course: "BS Accountancy", year: "4th Year", semester: "1st Sem" },
        { name: "Angelina Jolie", course: "BS Data Analytics", year: "3rd Year", semester: "1st Sem" },
        { name: "Will Smith", course: "BS Electronics Engineering", year: "2nd Year", semester: "2nd Sem" },
        { name: "Sophie Turner", course: "BS Marketing", year: "1st Year", semester: "1st Sem" },
        { name: "Chris Hemsworth", course: "BS Computer Science", year: "3rd Year", semester: "2nd Sem" },
        { name: "Hugh Jackman", course: "BS Nursing", year: "4th Year", semester: "1st Sem" },
        { name: "Matthew McConaughey", course: "BS Education", year: "2nd Year", semester: "1st Sem" },
        { name: "Emma Watson", course: "BS Mathematics", year: "4th Year", semester: "2nd Sem" },
        { name: "Keira Knightley", course: "BS Information Technology", year: "1st Year", semester: "2nd Sem" },
        { name: "Henry Cavill", course: "BS Civil Engineering", year: "3rd Year", semester: "1st Sem" },
        { name: "Gerard Butler", course: "BS Computer Science", year: "2nd Year", semester: "2nd Sem" },
        { name: "Charlize Theron", course: "BS Accountancy", year: "1st Year", semester: "1st Sem" },
        { name: "Jason Momoa", course: "BS Mechanical Engineering", year: "4th Year", semester: "2nd Sem" },
        { name: "Emily Blunt", course: "BS Business Administration", year: "3rd Year", semester: "1st Sem" },
        { name: "Gal Gadot", course: "BS Psychology", year: "2nd Year", semester: "2nd Sem" },
        { name: "Zoe Saldana", course: "BS Aerospace Engineering", year: "2nd Year", semester: "1st Sem" },
        { name: "Chris Pratt", course: "BS Architecture", year: "1st Year", semester: "2nd Sem" },
        { name: "Brie Larson", course: "BS Computer Science", year: "4th Year", semester: "1st Sem" }
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
