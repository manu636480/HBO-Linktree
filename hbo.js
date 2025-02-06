document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".link");
    const clickData = JSON.parse(localStorage.getItem("clickCounts")) || {};

    // Initialize click counts if not present
    links.forEach(link => {
        const linkText = link.innerText.trim();
        if (!clickData[linkText]) {
            clickData[linkText] = 0;
        }

        link.addEventListener("click", function () {
            clickData[linkText]++;
            localStorage.setItem("clickCounts", JSON.stringify(clickData));
            updateChart();
        });
    });

    // Create a Chart.js graph
    const ctx = document.createElement("canvas");
    ctx.id = "clickChart";
    document.body.appendChild(ctx);

    const chartConfig = {
        type: "bar",
        data: {
            labels: Object.keys(clickData),
            datasets: [{
                label: "Number of Clicks",
                data: Object.values(clickData),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    let chart = new Chart(ctx, chartConfig);

    function updateChart() {
        chart.data.labels = Object.keys(clickData);
        chart.data.datasets[0].data = Object.values(clickData);
        chart.update();
    }
});