import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa';

function PanierEtPaiement({ panier, setPanier }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    codedeCarte: '',
    montant: '',
    modePaiement: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/paiement/addPaiement', form);
      setShowModal(true);
    } catch (error) {
      console.error('Erreur lors du paiement :', error);
    }
  };

  const supprimerProduit = (id) => {
    const nouveauPanier = panier.filter((produit) => produit.id !== id);
    setPanier(nouveauPanier);
  };

  const augmenterQuantite = (id) => {
    const nouveauPanier = panier.map((produit) => {
      if (produit.id === id) {
        return { ...produit, quantite: produit.quantite + 1 };
      }
      return produit;
    });
    setPanier(nouveauPanier);
  };

  const diminuerQuantite = (id) => {
    const nouveauPanier = panier.map((produit) => {
      if (produit.id === id && produit.quantite > 1) {
        return { ...produit, quantite: produit.quantite - 1 };
      }
      return produit;
    });
    setPanier(nouveauPanier);
  };

  const total = panier.reduce((acc, produit) => {
    const prixNumerique = parseFloat(produit.Prix);
    return acc + prixNumerique * produit.quantite;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Container>
      <h1 className="mt-4">Panier et Paiement</h1>
      <h2>Produits dans le panier:</h2>
      {panier.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <Table striped bordered hover className="mb-4">
          <thead>
            <tr>
              <th>Nom du Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((produit) => {
              const prixUnitaire = parseFloat(produit.Prix);
              const prixTotal = prixUnitaire * produit.quantite;
              return (
                <tr key={produit.id}>
                  <td>{produit.Name}</td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => diminuerQuantite(produit.id)}
                      title="Diminuer la quantité"
                      disabled={produit.quantite <= 1}
                    >
                      <FaMinus />
                    </Button>
                    {produit.quantite}
                    <Button
                      variant="link"
                      onClick={() => augmenterQuantite(produit.id)}
                      title="Augmenter la quantité"
                    >
                      <FaPlus />
                    </Button>
                  </td>
                  <td>{prixTotal.toFixed(2)} dt</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => supprimerProduit(produit.id)}
                      title="Supprimer"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <h3>Total: {total.toFixed(2)} dt</h3>

      {panier.length > 0 && (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="w-50">
            <Form onSubmit={handleSubmit}>
              <h4 className="mt-4 text-center">Informations de paiement</h4>
              <Form.Group controlId="formNom" className="col-sm-12">
                <Form.Label>Nom et Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Entrez votre nom"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="col-sm-12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Entrez votre email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formModePaiement" className="col-sm-12">
                <Form.Label>Mode de paiement</Form.Label>
                <Form.Control
                  as="select"
                  name="modePaiement"
                  value={form.modePaiement}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="carte">Carte de Crédit</option>
                  <option value="paypal">PayPal</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCarte" className="col-sm-12">
                <Form.Label>Numéro de carte ou du compte PayPal</Form.Label>
                <Form.Control
                  type="text"
                  name="codedeCarte"
                  placeholder="Entrez votre numéro de carte"
                  value={form.codedeCarte}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="formCVV" className="col-sm-12">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="number"
                  name="montant"
                  placeholder="Entrez le CVV"
                  value={form.montant}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  style={{ backgroundColor: '#737373', borderColor: '#737373' }} // Appliquer la couleur #737373 ici
                >
                  Soumettre le paiement
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      )}

      {/* Modal de paiement */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Paiement réussi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Votre paiement a été effectué avec succès. Merci pour votre achat !</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ backgroundColor: '#737373', color: '#fff' }}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PanierEtPaiement;
