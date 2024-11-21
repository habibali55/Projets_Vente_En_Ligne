import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Archivage() {
  // Définir les données de la grille (exemple)
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  // Exemple de gestion de l'édition d'une ligne
  const handleRowEditStop = (params, event) => {
    // Vous pouvez ajouter des actions personnalisées ici lorsque l'édition est arrêtée
  };

  const processRowUpdate = (newRow) => {
    // Logique de mise à jour de la ligne (par exemple, envoyer une requête API pour sauvegarder les modifications)
    return newRow;
  };

  


  const columns = [
    {
      field: 'avatar',
      headerName: 'Photo',
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="Produit" width={50} height={50} style={{ borderRadius: '4px' }} />
      ),
    },
    {
      field: "Name",
      headerName: "Nom du produit",
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    { field: 'Prix', headerName: 'Prix', width: 180, editable: true },
    {
      field: 'Description',
      headerName: 'Description',
      type: 'text',
      width: 180,
      editable: true,
    },
    {
      field: "Status",
      headerName: "Status",
      type: 'text',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom className='mb-4'>
        Les Produits archiver
      </Typography>
      <Box sx={{ width: '80%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}  // Assurez-vous que l'ID est utilisé correctement ici
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          rowHeight={60}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
}
