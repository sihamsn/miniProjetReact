import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRequestsAsyncAdmin, approveRequestAsync, rejectRequestAsync } from '../redux/demandSlice';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'; // Importation des icônes de React Icons

const ListeDemandesAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, error, requests } = useSelector((state) => state.demands);
  const user = useSelector((state) => state.user); // Assurez-vous que user.couleur existe ici
  const [detailsRequestId, setDetailsRequestId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserRequestsAsyncAdmin());
  }, [dispatch]);

  const demandesEnAttente = requests?.filter((req) => req.status === 'En attente');
  const demandesApprouvees = requests?.filter((req) => req.status === 'Approuvée');
  const demandesRejetees = requests?.filter((req) => req.status === 'Rejetée');

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#f4f6f9',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '2rem',
      color: user.couleur || '#2c3e50', 
      textAlign: 'center',
      marginBottom: '30px',
      fontFamily: "'Roboto', sans-serif",
    },
    sectionTitle: {
      fontSize: '1.6rem',
      color: user.couleur || '#16a085',
      marginTop: '25px',
      marginBottom: '15px',
      borderBottom: `3px solid ${user.couleur || '#16a085'}`,
      paddingBottom: '8px',
      fontWeight: '600',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
    },
    tableHeader: {
      backgroundColor: user.couleur || '#16a085',
      color: '#ffffff',
      padding: '10px',
      textAlign: 'left',
      fontSize: '1.1rem',
    },
    tableRow: {
      backgroundColor: '#ffffff',
      padding: '15px',
      borderBottom: '1px solid #ddd',
      height: '50px',
    },
    tableRowHover: {
      backgroundColor: '#f1f1f1',
    },
    tableData: {
      padding: '10px',
    },
    button: {
      backgroundColor: 'transparent',
      color: user.couleur || '#3498db',
      border: 'none',
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'underline',
      transition: 'color 0.3s',
    },
    buttonHover: {
      color: '#2980b9',
    },
    error: {
      color: '#e74c3c',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    paragraph: {
      textAlign: 'center',
      fontSize: '1rem',
      color: '#7f8c8d',
    },
    sectionEmpty: {
      color: '#95a5a6',
    },
    detailsContainer: {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: '#ecf0f1',
      borderRadius: '8px',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
    },
    detailsHeader: {
      fontSize: '1.4rem',
      color: '#2c3e50',
      marginBottom: '10px',
    },
    detailsText: {
      fontSize: '1rem',
      color: '#7f8c8d',
    },
  };

  const handleReject = (userId, requestId) => {
    dispatch(rejectRequestAsync({ userId, requestId }));
  };

  const handleApprove = (userId, requestId) => {
    dispatch(approveRequestAsync({ userId, requestId }));
  };

  const toggleDetails = (id) => {
    if (detailsRequestId === id) {
      setDetailsRequestId(null);
    } else {
      setDetailsRequestId(id);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Gestion des Demandes</h1>

      {isLoading && <p style={styles.paragraph}>Chargement des demandes...</p>}
      {error && <p style={styles.error}>Erreur : {error}</p>}

      {!isLoading && !error && (
        <div>
          <section>
            <h2 style={styles.sectionTitle}>Demandes en Attente</h2>
            {demandesEnAttente.length === 0 ? (
              <p style={styles.sectionEmpty}>Aucune demande en attente.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.tableData}>Nom</th>
                    <th style={styles.tableData}>Titre</th>
                    <th style={styles.tableData}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demandesEnAttente.map((request) => (
                    <tr
                      key={request.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => (e.target.style = { ...styles.tableRow, ...styles.tableRowHover })}
                      onMouseLeave={(e) => (e.target.style = styles.tableRow)}
                    >
                      <td style={styles.tableData}>
                        <strong>{request.nom} {request.prenom}</strong>
                      </td>
                      <td style={styles.tableData}>{request.title}</td>
                      <td style={styles.tableData}>
                        <button
                          style={styles.button}
                          onClick={() => handleApprove(request.userId, request.id)}
                        >
                          <FaCheck /> Approuver
                        </button>
                        <button
                          style={styles.button}
                          onClick={() => handleReject(request.userId, request.id)}
                        >
                          <FaTimes /> Rejeter
                        </button>
                        <button
                          style={styles.button}
                          onClick={() => toggleDetails(request.id)}
                        >
                          <FaInfoCircle /> Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {detailsRequestId && demandesEnAttente.find(req => req.id === detailsRequestId) && (
              <div style={styles.detailsContainer}>
                <h3 style={styles.detailsHeader}>Détails de la Demande</h3>
                <p style={styles.detailsText}><strong>Nom :</strong> {demandesEnAttente.find(req => req.id === detailsRequestId).nom} {demandesEnAttente.find(req => req.id === detailsRequestId).prenom}</p>
                <p style={styles.detailsText}><strong>Titre :</strong> {demandesEnAttente.find(req => req.id === detailsRequestId).title}</p>
                <p style={styles.detailsText}><strong>Description :</strong> {demandesEnAttente.find(req => req.id === detailsRequestId).description}</p>
              </div>
            )}
          </section>

          <section>
            <h2 style={styles.sectionTitle}>Demandes Approuvées</h2>
            {demandesApprouvees.length === 0 ? (
              <p style={styles.sectionEmpty}>Aucune demande approuvée.</p>
            ) : (
              <table style={styles.table}>

                <tbody>
                  {demandesApprouvees.map((request) => (
                    <tr
                      key={request.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => (e.target.style = { ...styles.tableRow, ...styles.tableRowHover })}
                      onMouseLeave={(e) => (e.target.style = styles.tableRow)}
                    >
                      <td style={styles.tableData}>
                        <strong>{request.nom} {request.prenom}</strong>
                      </td>
                      <td style={styles.tableData}>{request.title}</td>
                      <td style={styles.tableData}>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section>
            <h2 style={styles.sectionTitle}>Demandes Rejetées</h2>
            {demandesRejetees.length === 0 ? (
              <p style={styles.sectionEmpty}>Aucune demande rejetée.</p>
            ) : (
              <table style={styles.table}>

                <tbody>
                  {demandesRejetees.map((request) => (
                    <tr
                      key={request.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => (e.target.style = { ...styles.tableRow, ...styles.tableRowHover })}
                      onMouseLeave={(e) => (e.target.style = styles.tableRow)}
                    >
                      <td style={styles.tableData}>
                        <strong>{request.nom} {request.prenom}</strong>
                      </td>
                      <td style={styles.tableData}>{request.title}</td>
                      <td style={styles.tableData}>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ListeDemandesAdmin;
