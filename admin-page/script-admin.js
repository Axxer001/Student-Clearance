// PIE CHART CONFIGURATION
const pieChartContext = document.getElementById("pie-chart").getContext("2d");

const schoolYearData = {
  "2024-2025": {
    "1st": { finished: 10, unfinished: 2, taskRequests: 4 },
    "2nd": { finished: 10, unfinished: 2, taskRequests: 10 }
  },
  "2023-2024": {
    "1st": { finished: 10, unfinished: 2, taskRequests: 12 },
    "2nd": { finished: 10, unfinished: 2, taskRequests: 8 }
  },
  "2022-2023": {
    "1st": { finished: 10, unfinished: 2, taskRequests: 25 },
    "2nd": { finished: 10, unfinished: 2, taskRequests: 20 }
  },
  "2021-2022": {
    "1st": { finished: 10, unfinished: 8, taskRequests: 15 },
    "2nd": { finished: 10, unfinished: 8, taskRequests: 18 }
  },
};

let currentSchoolYear = "2024-2025";
let currentSemester = "2nd";
let currentData = schoolYearData[currentSchoolYear][currentSemester];

const pieChart = new Chart(pieChartContext, {
  type: "pie",
  data: {
    labels: ["Finished Students", "Unfinished Students", "Task Requests"],
    datasets: [{
      data: [currentData.finished, currentData.unfinished, currentData.taskRequests],
      backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
      borderColor: "#fff",
      borderWidth: 1,
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} (${((value / total) * 100).toFixed(1)}%)`;
          }
        }
      }
    }
  }
});

document.querySelectorAll(".list-group-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".list-group-item").forEach(link => link.classList.remove("active"));
    item.classList.add("active");

    currentSchoolYear = item.getAttribute("data-year");
    currentData = schoolYearData[currentSchoolYear][currentSemester];

    pieChart.data.datasets[0].data = [currentData.finished, currentData.unfinished, currentData.taskRequests];
    pieChart.update();

    updateStats();
  });
});

const sem1Btn = document.getElementById("semester-toggle-1st");
const sem2Btn = document.getElementById("semester-toggle-2nd");
const semesterButtons = { "1st": sem1Btn, "2nd": sem2Btn };

sem2Btn.classList.add("btn-primary");

function setActiveSemesterButton(button) {
  Object.values(semesterButtons).forEach(btn => btn.classList.remove("btn-primary"));
  button.classList.add("btn-primary");
}

sem1Btn.addEventListener("click", () => {
  currentSemester = "1st";
  currentData = schoolYearData[currentSchoolYear][currentSemester];
  updateChartAndStats();
  setActiveSemesterButton(sem1Btn);
});

sem2Btn.addEventListener("click", () => {
  currentSemester = "2nd";
  currentData = schoolYearData[currentSchoolYear][currentSemester];
  updateChartAndStats();
  setActiveSemesterButton(sem2Btn);
});

function updateChartAndStats() {
  pieChart.data.datasets[0].data = [
    currentData.finished,
    currentData.unfinished,
    currentData.taskRequests,
  ];
  pieChart.update();

  updateStats();
}

function updateStats() {
  document.getElementById("finished-students").textContent = currentData.finished;
  document.getElementById("unfinished-students").textContent = currentData.unfinished;
  document.getElementById("task-requests").textContent = currentData.taskRequests;
  document.getElementById("total-students").textContent = currentData.finished + currentData.unfinished + currentData.taskRequests;
}

updateChartAndStats();
