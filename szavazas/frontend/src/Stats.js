import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import "./Stats.css";

const ElectionStats = () => {
  const parties = [
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
    "Nép Pártján",
  ];

  const votes = [
    2500000, 1800000, 600000, 200000, 400000, 500000, 100000, 750000,
    3000000, 150000, 120000, 300000,
  ];

  useEffect(() => {
    // Tisza Párt első helyre kerül (legnagyobb szavazatszám)
    const sortedData = parties
      .map((party, i) => ({ party, vote: votes[i] }))
      .sort((a, b) => b.vote - a.vote);

    const sortedParties = sortedData.map((data) => data.party);
    const sortedVotes = sortedData.map((data) => data.vote);

    // Százalékok számítása
    const totalVotes = sortedVotes.reduce((a, b) => a + b, 0);
    const percentages = sortedVotes.map(
      (v) => ((v / totalVotes) * 100).toFixed(2)
    );

    // Színek a diagramhoz
    const colors = [
      "#4e79a7",
      "#f28e2c",
      "#e15759",
      "#76b7b2",
      "#59a14f",
      "#edc948",
      "#b07aa1",
      "#ff9da7",
      "#9c755f",
      "#bab0ab",
      "#8c564b",
      "#d62728",
    ];

    // Oszlopdiagram
    const ctx = document.getElementById("votesChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedParties,
        datasets: [
          {
            label: "Szavazatok száma",
            data: sortedVotes,
            backgroundColor: colors,
            hoverBackgroundColor: colors.map((c) => c + "cc"), // Átlátszóbb hover
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Szavazatok: ${context.raw.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Szavazatok száma",
              color: "#666",
            },
          },
          x: {
            title: {
              display: true,
              text: "Párt",
              color: "#666",
            },
          },
        },
      },
    });

    // Táblázat generálása
    const tableRows = sortedParties.map((party, index) => (
      <tr key={party}>
        <td>{party}</td>
        <td>{sortedVotes[index].toLocaleString()}</td>
        <td>
          <span className="percentage">{percentages[index]}%</span>
        </td>
      </tr>
    ));

    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
      tableBody.innerHTML = ""; // Clear existing content
      tableRows.forEach((row) => tableBody.appendChild(row));
    }
  }, []);

  return (
    <div className="container">
      <h1>Választási Eredmények</h1>
      <div className="chart-container">
        <canvas id="votesChart"></canvas>
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

export default ElectionStats;
