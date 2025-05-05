document.addEventListener("DOMContentLoaded", () => {
    // Set default for semester
    const semesterButton = document.getElementById("semesterFilter");
    semesterButton.textContent = "1st Sem";

    // Set default for school year
    const schoolYearButton = document.getElementById("schoolYearFilter");
    const yearOptions = document.querySelectorAll("#schoolYearFilter + .dropdown-menu .dropdown-item");
    const recentYear = Array.from(yearOptions).map(option => option.textContent.trim()).sort().pop();
    schoolYearButton.textContent = recentYear;

    // Optional: Highlight default options in dropdown
    yearOptions.forEach(option => {
        if (option.textContent.trim() === recentYear) {
            option.classList.add("selected");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Set default for semester and school year
    const semesterButton = document.getElementById("semesterFilter");
    const schoolYearButton = document.getElementById("schoolYearFilter");

    const semesterOptions = document.querySelectorAll("#semesterFilter + .dropdown-menu .dropdown-item");
    const schoolYearOptions = document.querySelectorAll("#schoolYearFilter + .dropdown-menu .dropdown-item");

    // Simulated data
    const tableData = {
        "2024-2025": {
            "1st Sem": {
                finished: [
                    { name: "Alice Johnson", course: "BSCS", year: "3rd Year" },
                    { name: "John Smith", course: "BSIT", year: "4th Year" },
                    { name: "Sarah Connor", course: "BSCS", year: "1st Year" },
                    { name: "Jake Peralta", course: "BSIT", year: "2nd Year" },
                    { name: "Terry Jeffords", course: "BSCS", year: "3rd Year" },
                    { name: "Amy Santiago", course: "BSIT", year: "4th Year" },
                    { name: "Rosa Diaz", course: "BSCS", year: "2nd Year" },
                    { name: "Charles Boyle", course: "BSIT", year: "3rd Year" },
                    { name: "Gina Linetti", course: "BSCS", year: "1st Year" },
                    { name: "Hitchcock Scully", course: "BSIT", year: "2nd Year" }
                ],
                unfinished: [
                    { name: "Jane Doe", course: "BSCS", year: "2nd Year" },
                    { name: "Mike Brown", course: "BSIT", year: "1st Year" }
                ]
            },
            "2nd Sem": {
                finished: [
                    { name: "Chris White", course: "BSCS", year: "4th Year" },
                    { name: "Sophia Black", course: "BSIT", year: "1st Year" },
                    { name: "Liam Gray", course: "BSCS", year: "2nd Year" },
                    { name: "Emma Green", course: "BSIT", year: "3rd Year" },
                    { name: "Noah Blue", course: "BSCS", year: "4th Year" },
                    { name: "Olivia Gold", course: "BSIT", year: "2nd Year" },
                    { name: "Elijah Silver", course: "BSCS", year: "3rd Year" },
                    { name: "Isabella Purple", course: "BSIT", year: "4th Year" },
                    { name: "Mason Red", course: "BSCS", year: "1st Year" },
                    { name: "Ava Pink", course: "BSIT", year: "2nd Year" }
                ],
                unfinished: [
                    { name: "Emma Green", course: "BSIT", year: "3rd Year" },
                    { name: "Lucas Yellow", course: "BSCS", year: "1st Year" }
                ]
            }
        },
        "2023-2024": {
            "1st Sem": {
                finished: [
                    { name: "Luke Sky", course: "BSCS", year: "4th Year" },
                    { name: "Leia Organa", course: "BSIT", year: "2nd Year" },
                    { name: "Han Solo", course: "BSCS", year: "3rd Year" },
                    { name: "Chewie Wookiee", course: "BSIT", year: "1st Year" },
                    { name: "Yoda Green", course: "BSCS", year: "2nd Year" },
                    { name: "Anakin Sky", course: "BSIT", year: "3rd Year" },
                    { name: "Padme Amidala", course: "BSCS", year: "4th Year" },
                    { name: "Rey Palpatine", course: "BSIT", year: "2nd Year" },
                    { name: "Finn Storm", course: "BSCS", year: "3rd Year" },
                    { name: "Poe Dameron", course: "BSIT", year: "4th Year" }
                ],
                unfinished: [
                    { name: "Jabba Hutt", course: "BSCS", year: "3rd Year" },
                    { name: "Boba Fett", course: "BSIT", year: "4th Year" }
                ]
            },
            "2nd Sem": {
                finished: [
                    { name: "Han Solo", course: "BSCS", year: "4th Year" },
                    { name: "Leia Organa", course: "BSIT", year: "3rd Year" },
                    { name: "Chewie Wookiee", course: "BSCS", year: "2nd Year" },
                    { name: "Luke Sky", course: "BSIT", year: "1st Year" },
                    { name: "Rey Palpatine", course: "BSCS", year: "4th Year" },
                    { name: "Anakin Sky", course: "BSIT", year: "3rd Year" },
                    { name: "Padme Amidala", course: "BSCS", year: "2nd Year" },
                    { name: "Obi-Wan Kenobi", course: "BSIT", year: "4th Year" },
                    { name: "Yoda Green", course: "BSCS", year: "1st Year" },
                    { name: "Qui-Gon Jinn", course: "BSIT", year: "3rd Year" }
                ],
                unfinished: [
                    { name: "Darth Maul", course: "BSCS", year: "2nd Year" },
                    { name: "Count Dooku", course: "BSIT", year: "4th Year" }
                ]
            }
        },
        "2022-2023": {
            "1st Sem": {
                finished: [
                    { name: "Harry Potter", course: "BSCS", year: "3rd Year" },
                    { name: "Hermione Granger", course: "BSIT", year: "4th Year" },
                    { name: "Ron Weasley", course: "BSCS", year: "2nd Year" },
                    { name: "Draco Malfoy", course: "BSIT", year: "1st Year" },
                    { name: "Luna Lovegood", course: "BSCS", year: "4th Year" },
                    { name: "Ginny Weasley", course: "BSIT", year: "3rd Year" },
                    { name: "Neville Longbottom", course: "BSCS", year: "1st Year" },
                    { name: "Fred Weasley", course: "BSIT", year: "2nd Year" },
                    { name: "George Weasley", course: "BSCS", year: "3rd Year" },
                    { name: "Cedric Diggory", course: "BSIT", year: "4th Year" }
                ],
                unfinished: [
                    { name: "Sirius Black", course: "BSCS", year: "3rd Year" },
                    { name: "Remus Lupin", course: "BSIT", year: "4th Year" }
                ]
            },
            "2nd Sem": {
                finished: [
                    { name: "Albus Dumbledore", course: "BSCS", year: "4th Year" },
                    { name: "Minerva McGonagall", course: "BSIT", year: "3rd Year" },
                    { name: "Severus Snape", course: "BSCS", year: "2nd Year" },
                    { name: "Rubeus Hagrid", course: "BSIT", year: "1st Year" },
                    { name: "Filius Flitwick", course: "BSCS", year: "3rd Year" },
                    { name: "Horace Slughorn", course: "BSIT", year: "4th Year" },
                    { name: "Mad-Eye Moody", course: "BSCS", year: "2nd Year" },
                    { name: "Nymphadora Tonks", course: "BSIT", year: "3rd Year" },
                    { name: "Arthur Weasley", course: "BSCS", year: "4th Year" },
                    { name: "Molly Weasley", course: "BSIT", year: "2nd Year" }
                ],
                unfinished: [
                    { name: "Bellatrix Lestrange", course: "BSCS", year: "3rd Year" },
                    { name: "Lucius Malfoy", course: "BSIT", year: "4th Year" }
                ]
            }
        },
        "2021-2022": {
            "1st Sem": {
                finished: [
                    { name: "Eren Yeager", course: "BSCS", year: "4th Year" },
                    { name: "Mikasa Ackerman", course: "BSIT", year: "3rd Year" },
                    { name: "Armin Arlert", course: "BSCS", year: "2nd Year" },
                    { name: "Jean Kirstein", course: "BSIT", year: "1st Year" },
                    { name: "Connie Springer", course: "BSCS", year: "3rd Year" },
                    { name: "Sasha Blouse", course: "BSIT", year: "4th Year" },
                    { name: "Levi Ackerman", course: "BSCS", year: "1st Year" },
                    { name: "Hange Zoe", course: "BSIT", year: "2nd Year" },
                    { name: "Erwin Smith", course: "BSCS", year: "3rd Year" },
                    { name: "Zeke Yeager", course: "BSIT", year: "4th Year" }
                ],
                unfinished: [
                    { name: "Historia Reiss", course: "BSCS", year: "2nd Year" },
                    { name: "Floch Forster", course: "BSIT", year: "1st Year" },
                    { name: "Reiner Braun", course: "BSCS", year: "3rd Year" },
                    { name: "Annie Leonhart", course: "BSIT", year: "4th Year" },
                    { name: "Pieck Finger", course: "BSCS", year: "2nd Year" },
                    { name: "Porco Galliard", course: "BSIT", year: "1st Year" },
                    { name: "Bertholdt Hoover", course: "BSCS", year: "4th Year" },
                    { name: "Ymir Fritz", course: "BSIT", year: "3rd Year" }
                ]
            },
            "2nd Sem": {
                finished: [
                    { name: "Naruto Uzumaki", course: "BSCS", year: "4th Year" },
                    { name: "Sasuke Uchiha", course: "BSIT", year: "3rd Year" },
                    { name: "Sakura Haruno", course: "BSCS", year: "2nd Year" },
                    { name: "Kakashi Hatake", course: "BSIT", year: "1st Year" },
                    { name: "Hinata Hyuga", course: "BSCS", year: "3rd Year" },
                    { name: "Shikamaru Nara", course: "BSIT", year: "4th Year" },
                    { name: "Ino Yamanaka", course: "BSCS", year: "1st Year" },
                    { name: "Choji Akimichi", course: "BSIT", year: "2nd Year" },
                    { name: "Rock Lee", course: "BSCS", year: "3rd Year" },
                    { name: "Neji Hyuga", course: "BSIT", year: "4th Year" }
                ],
                unfinished: [
                    { name: "Gaara of the Sand", course: "BSCS", year: "2nd Year" },
                    { name: "Temari", course: "BSIT", year: "3rd Year" },
                    { name: "Kankuro", course: "BSCS", year: "1st Year" },
                    { name: "Jiraiya", course: "BSIT", year: "4th Year" },
                    { name: "Tsunade", course: "BSCS", year: "2nd Year" },
                    { name: "Orochimaru", course: "BSIT", year: "1st Year" },
                    { name: "Itachi Uchiha", course: "BSCS", year: "4th Year" },
                    { name: "Kisame Hoshigaki", course: "BSIT", year: "3rd Year" }
                ]
            }
        }
    };
    

    // Helper function to update the tables
    function updateTables(semester, schoolYear) {
        const finishedTableBody = document.querySelector(".table-wrapper:first-child tbody");
        const unfinishedTableBody = document.querySelector(".table-wrapper:last-child tbody");

        // Clear existing rows
        finishedTableBody.innerHTML = "";
        unfinishedTableBody.innerHTML = "";

        // Get data for the selected semester and school year
        const data = tableData[schoolYear]?.[semester] || { finished: [], unfinished: [] };

        // Populate Finished List
        if (data.finished.length > 0) {
            data.finished.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${row.name}</td><td>${row.course}</td><td>${row.year}</td>`;
                finishedTableBody.appendChild(tr);
            });
        } else {
            finishedTableBody.innerHTML = `<tr><td colspan="3" class="placeholder">No data available</td></tr>`;
        }

        // Populate Unfinished List
        if (data.unfinished.length > 0) {
            data.unfinished.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${row.name}</td><td>${row.course}</td><td>${row.year}</td>`;
                unfinishedTableBody.appendChild(tr);
            });
        } else {
            unfinishedTableBody.innerHTML = `<tr><td colspan="3" class="placeholder">No data available</td></tr>`;
        }
    }

    // Initialize with defaults
    const recentYear = Array.from(schoolYearOptions).map(option => option.textContent.trim()).sort().pop();
    semesterButton.textContent = "1st Sem";
    schoolYearButton.textContent = recentYear;

    updateTables("1st Sem", recentYear);

    // Event listeners for dropdowns
    semesterOptions.forEach(option => {
        option.addEventListener("click", () => {
            semesterButton.textContent = option.textContent.trim();
            updateTables(semesterButton.textContent.trim(), schoolYearButton.textContent.trim());
        });
    });

    schoolYearOptions.forEach(option => {
        option.addEventListener("click", () => {
            schoolYearButton.textContent = option.textContent.trim();
            updateTables(semesterButton.textContent.trim(), schoolYearButton.textContent.trim());
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-bar input");

    searchBar.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const allRows = document.querySelectorAll(".table-wrapper table tbody tr");

        allRows.forEach((row) => {
            const name = row.querySelector("td:nth-child(1)")?.textContent.toLowerCase() || "";
            const course = row.querySelector("td:nth-child(2)")?.textContent.toLowerCase() || "";

            if (name.includes(query) || course.includes(query)) {
                row.style.display = ""; // Show row
            } else {
                row.style.display = "none"; // Hide row
            }
        });
    });
});

