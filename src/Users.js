import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">Liste des transaction</h1>
      <table id="user-table" className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Mode d'entrée</th>
            <th>Code de condition</th>
            <th>PAN</th>
            <th>Code de traitement</th>
            <th>Montant de la transaction</th>
            <th>Taux de conversion de règlement</th>
            <th>Numéro d'audit de trace système</th>
            <th>Données de la piste 2</th>
            <th>Numéro de référence de récupération</th>
            <th>Données ICC</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.trandatetime}</td>
              <td>{user.Pointofserviceentrymode}</td>
              <td>{user.Pointofserviceconditioncode}</td>
              <td>{user.PAN}</td>
              <td>{user.ProcessingCode}</td>
              <td>{user.TransactionAmount}</td>
              <td>{user.SettlementConversionRate}</td>
              <td>{user.SystemTraceAuditNumber}</td>
              <td>{user.Track2Data}</td>
              <td>{user.RetrievalReferenceNumber}</td>
              <td>{user.ICCData}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="logoutButton" className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}
export default Users;