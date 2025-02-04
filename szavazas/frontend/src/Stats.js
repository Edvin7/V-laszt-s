import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './Stats.css';

const Stats = () => {
  const chartRef = useRef(null);
  const [parties, setParties] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lekérdezzük az adatokat a backendből
    fetch('http://localhost:3000/counters')
      .then(response => {
        if (!response.ok) {
          throw new Error('Hálózati hiba történt');
        }
        return response.json();
      })
      .then(data => {
        const partyNames = data.map(item => item.label);  // Pártok nevei
        const voteCounts = data.map(item => item.value);  // Szavazatok száma

        setParties(partyNames);
        setVotes(voteCounts);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (parties.length === 0 || votes.length === 0) return;

    const totalVotes = votes.reduce((a, b) => a + b, 0);
    const percentages = votes.map(v => ((v / totalVotes) * 100).toFixed(2));

    const colors = [
      "#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f",
      "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ab",
      "#8c564b", "#d62728"
    ];

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: parties,
          datasets: [{
            label: "Szavazatok száma",
            data: votes,
            backgroundColor: colors,
          }]
        }
      });
    }

  }, [parties, votes]);

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p>Hiba: {error}</p>;

  return (
    <div className="container">
      <h1>Választási Eredmények</h1>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Párt</th>
            <th>Szavazatok száma</th>
            <th>Szavazatok aránya (%)</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={index}>
              <td>{party}</td>
              <td>{votes[index].toLocaleString()}</td>
              <td>{((votes[index] / votes.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
