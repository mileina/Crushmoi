import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './formulaire.css'; 


function Formulaire() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [messageOui, setMessageOui] = useState('');
  const [messageNon, setMessageNon] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const instagramLink = "https://www.instagram.com/mileinya";
  const customLink = "https://cloud-campus.fr/cloud-campus-ecole-de-developpement-web-full-stack-en-distanciel-alternance/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = uuidv4(); 
    const formData = { id, email, date, messageOui, messageNon };
  
    console.log(formData);
  
    fetch('https://apicrushme-78ffc6826d3c.herokuapp.com/api/invitation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const newLink = `https://crushmoi-b78956e48bb4.herokuapp.com/invitation/${data.id}`; 
      setGeneratedLink(newLink);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setCopySuccess('Lien copié !');
      })
      .catch(err => {
        setCopySuccess('Échec de la copie');
      });
  };
  

  return (
    <div className="container">
      <h1>Crush moi</h1>
      <form id="rendezVousForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Entre ton email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Choisi une date de rendez vous</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="messageOui">Ton message (Si Oui) :</label>
          <textarea
            id="messageOui"
            name="messageOui"
            required
            value={messageOui}
            onChange={(e) => setMessageOui(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="messageNon">Ton message (Si Non) :</label>
          <textarea
            id="messageNon"
            name="messageNon"
            required
            value={messageNon}
            onChange={(e) => setMessageNon(e.target.value)}
          ></textarea>
        </div>
        
        <button type="submit">Envoyer</button>
      </form>
      {generatedLink && (
  <div>
  <p>Ton lien a envoyer !</p>
  <input
    type="text"
    value={generatedLink}
    readOnly
    onClick={(e) => e.target.select()}
  />
  <button onClick={copyToClipboard}>Copier le lien</button>
  {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
  
</div>

      )}

<div className="buttons-container">
  <a href={instagramLink} target="_blank" rel="noopener noreferrer">
    <button className="custom-button instagram-button"> Mon reseau : Mil</button>
  </a>

  {customLink && (
    <a href={customLink} target="_blank" rel="noopener noreferrer">
      <button className="custom-button ecole-button">CLoud Campus</button>
    </a>
  )}
</div>



      
    </div>
    
  );
}

export default Formulaire;
