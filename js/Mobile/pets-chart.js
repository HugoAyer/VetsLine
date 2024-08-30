const chart_walking = document.getElementById('chart_walking');
const chart_food = document.getElementById('chart_food');

$(document).ready(function () {
    Chart_paseos()
    Chart_alimento()
});

const Chart_paseos = () => {
    new Chart(chart_walking, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
          datasets: [{
            label: 'Minutos de paseo',
            data: [15, 20, 10, 35, 12, 13,20],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

const Chart_alimento = () => {
    new Chart(chart_food, {
        type: 'pie',
        data: food,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

const food = {
    labels: [
      'Croquetas',
      'Premios de carne',
      'Salchicha'
    ],
    datasets: [{
      label: 'Alimentación',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };