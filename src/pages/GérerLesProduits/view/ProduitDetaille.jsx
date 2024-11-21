import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import html2canvas from 'html2canvas';

export default function ProduitDetaille() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = React.useState({});

  const getProduit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/produits/getProduit/${id}`);
      console.log(response.data, "Produit infos");
      setProduit(response.data);
    } catch (error) {
      console.log("Produit n'est pas trouvé");
    }
  };

  React.useEffect(() => {
    getProduit(id);
  }, [id]);

  const handleDownload = () => {
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'incidence-details.png';
      link.click();
    });
  };

  return (
    <Box
      id="capture"
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Détails du Produit
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 3 }}>
          <img
            src={produit.avatar}
            alt={produit.Name}
            width={150}
            height={150}
            style={{ borderRadius: '4px', marginRight: '16px' }}
          />
          <Typography variant="h6">{produit.Name}</Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">
          <strong>Description:</strong> {produit.Description}
        </Typography>
        <Typography variant="body1">
          <strong>Prix:</strong> {produit.Prix}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {produit.Status}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/Produit')}>
          Retour à la liste
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDownload} sx={{ marginLeft: 2 }}>
          Télécharger les détails
        </Button>
      </Box>
    </Box>
  );
}
