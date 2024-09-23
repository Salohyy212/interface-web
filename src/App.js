import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './App.css'; 

const generateLoremIpsum = () => {
  const loremTexts = [
    'Lorem ipsum dolor sit amet.',
    'Consectetur adipiscing elit.',
    'Vivamus luctus urna sed urna.',
    'Integer aliquam elit ac nibh.',
    'Cras quis metus nec risus.',
  ];
  const randomIndex = Math.floor(Math.random() * loremTexts.length);
  return loremTexts[randomIndex];
};

function App() {
  const [name, setName] = useState('');
  const [selectedAgregats, setSelectedAgregats] = useState([]);
  const [loremText, setLoremText] = useState(generateLoremIpsum());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgregatChange = (e) => {
    const value = e.target.value;
    setSelectedAgregats((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    setLoremText(generateLoremIpsum());
  }, [name, selectedAgregats]);

  const chartData = [
    { date: '2024-01-01', 'Agrégat': Math.random() * 100, 'Trésorerie': Math.random() * 100, 'Immobilisation': Math.random() * 100, 'Obligation': Math.random() * 100 },
    { date: '2024-01-02', 'Agrégat': Math.random() * 100, 'Trésorerie': Math.random() * 100, 'Immobilisation': Math.random() * 100, 'Obligation': Math.random() * 100 },
  ];

  const colors = {
    'Agrégat': '#0000FF', 
    'Trésorerie': '#FF0000', 
    'Immobilisation': '#000000', 
    'Obligation': '#FFFF00',
  };

  return (
    <div className="app-container">
      <div className="user-input">
        <label htmlFor="patrimoine-name" className="inline-label">Patrimoine</label>
        <select id="patrimoine-name" value={name} onChange={handleNameChange}>
          <option value="">Sélectionner</option>
          <option value="Crésus">Crésus</option>
          <option value="Zety">Zety</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="agregat-selection">
        {['Agrégat', 'Trésorerie', 'Immobilisation', 'Obligation'].map((agregat) => (
          <label key={agregat}>
            <input
              type="checkbox"
              value={agregat}
              checked={selectedAgregats.includes(agregat)}
              onChange={handleAgregatChange}
            />
            {agregat}
          </label>
        ))}
      </div>

      <div className="date-inputs">
        <label htmlFor="start-date">De: </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="end-date">À: </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    
      <div className="output-container">
        {name && (
          <div className="output">
            <div className="text-output1">
              <h3>Flux Impossible</h3>
              <p>{loremText}</p>
            </div>

            <div className="separator"></div> 

            <div className="text-output2">
              <h3>Flux Journalier</h3>
              <p>
                {name
                  ? `Lorem Ipsum pour ${name}. ` +
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                    'Vivamus luctus urna sed urna suscipit, at vulputate nisi gravida. ' +
                    'Integer aliquam elit ac nibh faucibus, non tincidunt nisl tristique. ' +
                    'Cras quis metus nec risus accumsan fringilla. ' +
                    'Nullam vitae magna in elit bibendum gravida. ' +
                    'Proin at erat a nunc faucibus viverra. ' +
                    'Donec non urna ac est vehicula vehicula.'
                  : 'Entrez un nom de patrimoine'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="chart-container" style={{ marginLeft: '20px', marginTop: '20px' }}>
        {selectedAgregats.length > 0 ? (
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedAgregats.map((agregat) => (
              <Line
                key={agregat}
                type="monotone"
                dataKey={agregat}
                stroke={colors[agregat]}
              />
            ))}
          </LineChart>
        ) : (
          <p>Aucun agrégat sélectionné pour afficher le graphique.</p>
        )}
      </div>

      <div style={{ clear: 'both' }} /> 
    </div>
  );
}

export default App;
