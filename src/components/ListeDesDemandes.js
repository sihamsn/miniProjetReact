import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequestsAsync, cancelRequestAsync } from '../redux/demandSlice';

const ListeDesDemandes = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id); // Récupérer l'ID de l'utilisateur connecté
  const requests = useSelector((state) => state.demands.requests); // Récupérer les demandes
  const isLoading = useSelector((state) => state.demands.isLoading);
  const error = useSelector((state) => state.demands.error);

   const user = useSelector((state) => state.user); // Récupération de l'utilisateur connecté
    const primaryColor = user?.couleur || '#007BFF'; // Couleur par défaut si non définie

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRequestsAsync(userId)); // Charger les demandes de l'utilisateur au démarrage
    }
  }, [dispatch, userId]);

  const handleCancelRequest = (requestId) => {
    console.log(`Tentative d'annulation de la demande avec ID: ${requestId} pour l'utilisateur ID: ${userId}`);
    if (window.confirm("Voulez-vous annuler cette demande ?")) {
      dispatch(cancelRequestAsync({ userId, requestId })); // Assurez-vous que userId et requestId sont corrects
    }
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Erreur : {error}</p>;
  }

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const titleStyle = {
    color: primaryColor, // Couleur primaire
    marginBottom: '10px',
  };

  const requestStyle = {
    padding: '10px',
    border: '1px solid ',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  };

  const buttonStyle = {
    backgroundColor: primaryColor,
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Couleur plus foncée pour le survol
  };

  return (
    <div style={containerStyle}>
      <h2>Mes demandes</h2>
      {requests.length === 0 ? (
        <p>Aucune demande trouvée.</p>
      ) : (
        <div>
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Demandes en attente</h3>
            {requests.filter(request => request.status === 'En attente').map((request) => (
              <div key={request.id} style={requestStyle}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Du {request.startDate} au {request.endDate}</p>
                <p>Status: {request.status}</p>
                <button 
                  onClick={() => handleCancelRequest(request.id)} 
                  style={buttonStyle}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                  Annuler la demande
                </button>
              </div>
            ))}
          </div>
          
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Demandes approuvées</h3>
            {requests.filter(request => request.status === 'Approuvée').map((request) => (
              <div key={request.id} style={requestStyle}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Du {request.startDate} au {request.endDate}</p>
                <p>Status: {request.status}</p>
              </div>
            ))}
          </div>
          
          <div style={sectionStyle}>
          <h3 style={titleStyle}>Demandes rejetées</h3>
            {requests.filter(request => request.status === 'Rejetée').map((request) => (
              <div key={request.id} style={requestStyle}>
                <h4>{request.title}</h4>
                <p>{request.description}</p>
                <p>Du {request.startDate} au {request.endDate}</p>
                <p>Status: {request.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeDesDemandes;