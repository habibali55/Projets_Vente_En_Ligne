import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Shop({ ajouterAuPanier }) {
  const [products, setProducts] = useState([]); // État pour stocker les produits récupérés
  const [modalOpen, setModalOpen] = useState(false); // État pour contrôler l'ouverture du modal
  const [currentProduct, setCurrentProduct] = useState(null); // Produit ajouté

  // Récupérer les produits via l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:9000/produits/getProduit");
        const dataWithId = response.data.map((item) => ({
          ...item,
          id: item._id,  // Assurez-vous d'utiliser _id pour l'identifiant
        }));
        setProducts(dataWithId);  // Mettre à jour l'état des produits
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    ajouterAuPanier(product); // Appeler la fonction ajouterAuPanier
    setCurrentProduct(product); // Stocker le produit ajouté
    setModalOpen(true); // Ouvrir le modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Fermer le modal
  };

  return (
    <>
      <MDBContainer fluid className="my-5 text-center">
        <h4 className="mt-4 mb-5">
          <strong>Nos Produits</strong>
        </h4>

        <MDBRow>
          {products.map((product) => (
            <MDBCol md="6" lg="4" className="mb-4" key={product.id}>
              <MDBCard className="d-flex flex-column h-100">
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded hover-zoom"
                >
                  <MDBCardImage
                    src={product.avatar}
                    fluid
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </MDBRipple>
                <MDBCardBody className="d-flex flex-column">
                  <h5 className="card-title mb-3">{product.Name}</h5>
                  <p>{product.Description}</p>
                  <h6 className="mt-auto mb-3">{product.Prix}</h6>
                  <button
                    className="btn btn-primary mt-auto"
                    style={{ backgroundColor: '#737373', color: '#fff' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Ajouter au panier
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

      {/* Modal Bootstrap centré */}
      <div
        className={`modal fade ${modalOpen ? 'show' : ''}`}
        style={{ display: modalOpen ? 'block' : 'none' }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!modalOpen}
      >
        <div className="modal-dialog modal-dialog-centered"> {/* Classe pour centrer le modal */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Produit ajouté au panier</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {currentProduct && (
                <>
                  <p><strong>Produit :</strong> {currentProduct.Name}</p>
                  <p><strong>Prix :</strong> {currentProduct.Prix}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: '#737373', color: '#fff' }} // Couleur personnalisée pour le bouton
                onClick={handleCloseModal}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
