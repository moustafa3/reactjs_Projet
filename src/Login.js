import React, { useState } from 'react';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Réinitialiser les messages d'erreur

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data);
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/users'; // Rediriger vers la page des utilisateurs
      } else {
        setErrorMessage(data.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      setErrorMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div className="container mt-5 " >
      <h1 className="text-center">Page de connexion</h1>
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
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p>N'avez-vous pas de compte? <a href="/register">S'inscrire</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
