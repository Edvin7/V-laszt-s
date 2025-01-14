import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Stats.css';

const Stats = () => {
  const chartRef = useRef(null); // canvas referencia

  useEffect(() => {
    // Pártok és szavazatok
    let parties = [
      "Fidesz-KDMP",
      "DK-MSZP-Párbeszéd-Zöldek",
      "Jobbik",
      "MEMO",
      "LMP-Zöldek",
      "Mi Hazánk",
      "2RK Párt",
      "Momentum",
      "Tisza Párt",
      "MKKP",
      "MMN",
      "Nép Pártján"
    ];

    let votes = [2500000, 1800000, 600000, 200000, 400000, 500000, 100000, 750000, 3000000, 150000, 120000, 300000];

    // Tisza Párt első helyre kerül (legnagyobb szavazatszám)
    const sortedData = parties.map((party, i) => ({ party, vote: votes[i] }))
                              .sort((a, b) => b.vote - a.vote);

    parties = sortedData.map(data => data.party);
    votes = sortedData.map(data => data.vote);

    // Százalékok számítása
    const totalVotes = votes.reduce((a, b) => a + b, 0);
    const percentages = votes.map(v => ((v / totalVotes) * 100).toFixed(2));

    // Színek a diagramhoz
    const colors = [
      "#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f",
      "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ab",
      "#8c564b", "#d62728"
    ];

    // Ha már létezik a chart, töröljük azt
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy(); // Töröljük az előző chartot
    }


    // Táblázat dinamikus kitöltése
    const tableBody = document.getElementById('tableBody');
    parties.forEach((party, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${party}</td>
        <td>${votes[index].toLocaleString()}</td>
        <td><span class="percentage">${percentages[index]}%</span></td>
      `;
      tableBody.appendChild(row);
    });

  }, []); // A komponens betöltésekor egyszer fut le

  return (
    <div className="container">
      <h1>Választási Eredmények</h1>
      <div className="chart-container">
        {/* Ref a canvas elemhez */}
        <canvas ref={chartRef}></canvas>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Párt</th>
            <th>Listára leadott érvényes szavazatok száma</th>
            <th>Listára leadott érvényes szavazatok aránya (%)</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {/* Dinamikusan generált táblázat */}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
