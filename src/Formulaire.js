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
  
    fetch('https://crushmoi.vercel.app/api/invitation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      console.log("Response: ", response);
      return response.text();  // Utilisez text() pour lire le corps de la réponse en tant que texte brut
    })
    .then(text => {
      console.log("Response Body: ", text);
      try {
        const data = JSON.parse(text);  // Essayez de parser le texte en JSON
        const newLink = `https://crushmoi.vercel.app/invitation/${data.id}`; 
        setGeneratedLink(newLink);
      } catch (e) {
        throw new Error(`Could not parse JSON: ${text}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      console.error('Error message:', error.message);
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
          <label htmlFor="email">Ton email pour voir la reponse</label>
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
          <label htmlFor="date">Choisi une date :</label>
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
  <p>Votre lien d'invitation unique:</p>
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
