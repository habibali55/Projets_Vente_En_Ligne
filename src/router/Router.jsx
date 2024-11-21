import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from '../screens/Landing';
import Main from '../apps/Main';
import Login from '../screens/Login';
import Auth from '../apps/Auth';
import SignUp from '../screens/SignUp';
import Shop from '../pages/Shop';
import Produit from '../pages/GérerLesProduits/Produit';
import ProduitListe from '../pages/GérerLesProduits/view/ProduitListe';
import AddProduit from '../pages/GérerLesProduits/view/AddProduit';
import ProduitDetaille from '../pages/GérerLesProduits/view/ProduitDetaille';
import EditProduit from '../pages/GérerLesProduits/view/EditProduit';
import Profile from '../pages/profile/Profile';
import EditProfil from '../pages/profile/view/EditProfil';
import PanierEtPaiement from '../pages/PanierEtPaiement';
import Archivage from '../pages/archivage';
import getMe from '../components/GetMe';
import ProfilDetaille from '../pages/profile/view/ProfilDetaille.';

export default function Router() {
    const [user, setUser] = useState(null); // Pour l'exemple, défini sur true
    const [panier, setPanier] = useState([]);

    useEffect(() => {
        // Vérifier si un token existe dans le localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setUser(getMe());
        }
    }, []);

    // Fonction pour ajouter un produit au panier
    const ajouterAuPanier = (produit) => {
        setPanier((prevPanier) => {
            // Vérifier si un produit avec le même ID existe déjà dans le panier
            const produitExistant = prevPanier.find((item) => item.id === produit.id);
            if (produitExistant) {
                // Si le produit existe, augmenter la quantité
                return prevPanier.map((item) =>
                    item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
                );
            }
            // Sinon, ajouter le produit avec une quantité initiale de 1
            return [...prevPanier, { ...produit, quantite: 1 }];
        });
    };
    
    return (
        <BrowserRouter>
            <Routes>
                {user ? (
                    <Route path="/" element={<Main />}>
                        <Route index element={<Shop ajouterAuPanier={ajouterAuPanier} />} />
                        <Route path="Produit" element={<Produit />}>
                            <Route index element={<ProduitListe />} />
                            <Route path="ProduitDetaille/:id" element={<ProduitDetaille />} />
                            <Route path="AddProduit" element={<AddProduit />} />
                            <Route path="EditProduit/:id" element={<EditProduit />} />
                        </Route>
                        <Route path="Profile" element={<Profile />}>
                            <Route index element={<ProfilDetaille />} />
                            <Route path="EditProfil/:id" element={<EditProfil />} />
                        </Route>
                        <Route path="PanierEtPaiement" element={<PanierEtPaiement panier={panier} setPanier={setPanier} />} />
                        <Route path="Archiver" element={<Archivage />} />
                    </Route>
                ) : (
                    <Route path="/" element={<Auth />}>
                        <Route index element={<Landing />} />
                        <Route path="login" element={<Login />} />
                        <Route path="SignUp" element={<SignUp />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}
