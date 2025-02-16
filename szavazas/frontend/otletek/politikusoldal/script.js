const ctx = document.getElementById('voteChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2015', '2017', '2020', '2023'],
        datasets: [{
            label: 'Szavazatok (%)',
            data: [55, 62, 70, 75],
            backgroundColor: ['#2980b9', '#6dd5fa', '#3498db', '#16a085'],
            borderColor: ['#2980b9', '#6dd5fa', '#3498db', '#16a085'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: '#34495e',
                titleColor: '#ecf0f1',
                bodyColor: '#ecf0f1',
                borderColor: '#2980b9',
                borderWidth: 1,
                padding: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#2980b9',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    color: '#ecf0f1',
                    borderColor: '#ecf0f1'
                }
            },
            x: {
                ticks: {
                    color: '#2980b9',
                    font: {
                        size: 14
                    }
                },
                grid: {
                    color: '#ecf0f1',
                    borderColor: '#ecf0f1'
                }
            }
        }
    }
});
