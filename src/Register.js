import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Réponse du serveur :', data);
        window.location.href = '/login'; // Rediriger vers la page de connexion après l'inscription
      } else {
        setMessage(data.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Page d'inscription</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card card-body">
            {/* Input Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            {/* Input Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">S'inscrire</button>
          </form>
          {message && <p style={{ color: 'red' }}>{message}</p>}
          <p>Déjà inscrit? <a href="/login">S'identifier</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
