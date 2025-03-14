import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./Stats.css";
import Footer from "./Footer";

const Stats = () => {
  const chartRef = useRef(null);
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nyilvántartjuk, hogy be van-e jelentkezve a felhasználó

  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true); // Ha van felhasználói adat, be van jelentkezve
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/election-results")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hálózati hiba történt");
        }
        return response.json();
      })
      .then((data) => {
        setElectionData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (electionData.length === 0) return;

    const partyNames = electionData.map((item) => item.party);
    const voteCounts = electionData.map((item) => item.votes);

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
      "#bab0ab"
    ];

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: partyNames,
          datasets: [{
            label: "Szavazatok száma",
            data: voteCounts,
            backgroundColor: colors,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value.toLocaleString();
                },
              },
            },
          },
        },
      });
    }
  }, [electionData]);

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p>Hiba: {error}</p>;

  return (
    <div className="ccontainer">
      <h1 className="h11">Választási <span style={{ color: '#033473' }}>Eredmények</span></h1>
      <div className="lline"></div>
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
          {electionData.map((party, index) => (
            <tr key={index}>
              <td>{party.party}</td>
              <td>{party.votes.toLocaleString()}</td>
              <td>
                {((party.votes / electionData.reduce((a, b) => a + b.votes, 0)) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Stats;
