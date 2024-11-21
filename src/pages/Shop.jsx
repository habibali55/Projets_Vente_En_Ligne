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
    alert(`${product.Name} a été ajouté au panier !`); // Afficher une alerte
  };

  return (
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
                  src={product.avatar} // Utiliser le champ `avatar` pour l'image
                  fluid
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <a href="#!">
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">New</span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </MDBRipple>
              <MDBCardBody className="d-flex flex-column">
                <a href="#!" className="text-reset">
                  <h5 className="card-title mb-3">{product.Name}</h5> {/* Nom du produit */}
                </a>
                <a href="#!" className="text-reset">
                  <p>{product.Description}</p> {/* Description du produit */}
                </a>
                <h6 className="mt-auto mb-3">{product.Prix}</h6> {/* Prix du produit */}
                <h6 className="mt-auto mb-3">{product.Status}</h6>
                <button
                  className="btn btn-primary mt-auto"
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
  );
}

export default Shop;
