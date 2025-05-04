// PIE CHART CONFIGURATION
const pieChartContext = document.getElementById("pie-chart").getContext("2d");

const schoolYearData = {
  "2021-2022": {
    "1st": { finished: 80, unfinished: 20, taskRequests: 10 },
    "2nd": { finished: 60, unfinished: 40, taskRequests: 15 }
  },
  "2020-2021": {
    "1st": { finished: 50, unfinished: 30, taskRequests: 12 },
    "2nd": { finished: 40, unfinished: 40, taskRequests: 8 }
  },
  "2019-2020": {
    "1st": { finished: 70, unfinished: 50, taskRequests: 25 },
    "2nd": { finished: 45, unfinished: 55, taskRequests: 20 }
  },
  "2018-2019": {
    "1st": { finished: 40, unfinished: 60, taskRequests: 15 },
    "2nd": { finished: 55, unfinished: 45, taskRequests: 18 }
  },
  "2017-2018": {
    "1st": { finished: 60, unfinished: 40, taskRequests: 30 },
    "2nd": { finished: 50, unfinished: 50, taskRequests: 22 }
  },
  "2016-2017": {
    "1st": { finished: 90, unfinished: 10, taskRequests: 2 },
    "2nd": { finished: 70, unfinished: 5, taskRequests: 2 }
  },
  "2015-2016": {
    "1st": { finished: 60, unfinished: 40, taskRequests: 30 },
    "2nd": { finished: 50, unfinished: 50, taskRequests: 22 }
  },
};

let currentSchoolYear = "2021-2022";
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

    document.getElementById("finished-students").textContent = currentData.finished;
    document.getElementById("unfinished-students").textContent = currentData.unfinished;
    document.getElementById("task-requests").textContent = currentData.taskRequests;
    document.getElementById("total-students").textContent = currentData.finished + currentData.unfinished;
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

  document.getElementById("finished-students").textContent = currentData.finished;
  document.getElementById("unfinished-students").textContent = currentData.unfinished;
  document.getElementById("task-requests").textContent = currentData.taskRequests;
  document.getElementById("total-students").textContent = currentData.finished + currentData.unfinished;
}

updateChartAndStats();
