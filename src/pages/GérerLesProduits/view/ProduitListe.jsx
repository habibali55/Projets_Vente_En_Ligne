import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { IoArchiveOutline } from "react-icons/io5";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddToolbar(props) {
  const navigate = useNavigate();

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={() => navigate("/Produit/AddProduit")}>
        Add 
      </Button>
    </GridToolbarContainer>
  );
}

export default function ProduitListe() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();

  const getProduits = async () => {
    try {
      // Requête pour récupérer les produits
      let response = await axios.get("http://localhost:9000/produits/getProduit");

      // Ajouter l'id à partir de _id pour chaque produit
      const dataWithId = response.data.map((item) => ({
        ...item,
        id: item._id,  // Utilisation de _id comme identifiant
      }));

      // Mise à jour de l'état des produits
      setRows(dataWithId);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      toast.error('Erreur lors de la récupération des produits');
    }
  };

  React.useEffect(() => {
    getProduits();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await axios.delete(`http://localhost:9000/produits/deleteProduit/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      toast.success('Produit archivé!');
    } catch (error) {
      toast.error(`Erreur lors de l'archivage du produit: ${error.response?.data?.message || error.message}`);
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
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
      headerName: 'Description ' ,
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => navigate(`/Produit/EditProduit/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            onClick={() => navigate(`/Produit/ProduitDetaille/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<IoArchiveOutline />}
            label="Archive"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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
        Les Produits
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
          slots={{
            toolbar: AddToolbar,
          }}
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
