//       var ctx = document.getElementById('myChart').getContext('2d');
//       var ctx1 = document.getElementById('myChart1').getContext('2d');
//       var ctx2 = document.getElementById('myChart2').getContext('2d');
//       var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
//       datasets: [
//         {
//           label: "Ingresos",
//           backgroundColor: "#3e95cd",
//           data: [10,0]
//         }, {
//           label: "Gastos",
//           backgroundColor: "#8e5ea2",
//           data: [0,0]
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'Comparación de Ingresos y Gastos Mensuales'
//       }
//     }
// });

//       var myChart1 = new Chart(ctx1, {
//     type: 'doughnut',
//     data: {
//       labels: ["Alimentos", "Transporte", "Entretenimiento", "Salud", "Otros"],
//       datasets: [
//         {
//           label: "Gastos por Categoría",
//           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
//           data: [2478,5267,734,784,433]
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'Distribución de Gastos por Categoría'
//       }
//     }
// });


//       var myChart2 = new Chart(ctx2, {
//     type: 'line',
//     data: {
//       labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
//       datasets: [{ 
//           data: [86,114,106,106,107,111,133],
//           label: "Deudas",
//           borderColor: "#8e5ea2",
//           fill: false
//         }, { 
//           data: [282,350,411,502,635,809,947],
//           label: "Créditos",
//           borderColor: "#3e95cd",
//           fill: false
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'Evolución de Deudas y Créditos a lo Largo del Tiempo'
//       }
//     }
// });
