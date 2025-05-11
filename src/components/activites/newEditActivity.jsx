// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import { getProductsThunk } from '../redux/slices/getProductsThunk';
// import { useDispatch, useSelector } from 'react-redux';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import { useEffect } from 'react';
// import { Details } from '@mui/icons-material';
// import { useState } from 'react';
// import {addProductThunk} from '../redux/slices/addProductThunk'
// export const ManageProducts=()=>{
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getProductsThunk());

//     }, [])
//     const [open, setOpen] = React.useState(false);
//     const [newActivity,setnewActivity]=React.useState({
//      prodId: 0,
//       pname: "name",
//       psum: 0,
//       pimporter: "importer",
//       pcompany: "company",
//       ppicture: "picture",
//       pdescription: "description"
//     });
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
//     const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//       '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//       },
//       '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//       },
//     }));


//     function TablePaginationActions(props) {
//         const theme = useTheme();
//         const { count, page, rowsPerPage, onPageChange } = props;

//         const handleFirstPageButtonClick = (event) => {
//           onPageChange(event, 0);
//         };

//         const handleBackButtonClick = (event) => {
//           onPageChange(event, page - 1);
//         };

//         const handleNextButtonClick = (event) => {
//           onPageChange(event, page + 1);
//         };

//         const handleLastPageButtonClick = (event) => {
//           onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//         };

//         return (
//           <Box sx={{ flexShrink: 0, ml: 2.5,overflow:"hidden",direction:"rtl" }}>
//             <IconButton
//               onClick={handleFirstPageButtonClick}
//               disabled={page === 0}
//               aria-label="first page"
//             >
//               {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//             </IconButton>
//             <IconButton
//               onClick={handleBackButtonClick}
//               disabled={page === 0}
//               aria-label="previous page"
//             >
//               {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//             </IconButton>
//             <IconButton
//               onClick={handleNextButtonClick}
//               disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//               aria-label="next page"
//             >
//               {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//             </IconButton>
//             <IconButton
//               onClick={handleLastPageButtonClick}
//               disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//               aria-label="last page"
//             >
//               {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//             </IconButton>
//           </Box>
//         );
//       }

//       TablePaginationActions.propTypes = {
//         count: PropTypes.number.isRequired,
//         onPageChange: PropTypes.func.isRequired,
//         page: PropTypes.number.isRequired,
//         rowsPerPage: PropTypes.number.isRequired,
//       };


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../redux/slices/getProductsThunk';
// import { updateProductThunk } from '../redux/slices/updateProductThunk';
import { addProductThunk } from '../redux/slices/addProductThunk';
import axios from 'axios';

// MUI Components
import {
  Box, Container, Typography, Paper, Grid, Card, CardContent, CardMedia, CardActions,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  InputAdornment, Divider, Chip, Tooltip, Snackbar, Alert, FormControl, InputLabel,
  Select, MenuItem, CircularProgress, TablePagination
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadIcon from '@mui/icons-material/Upload';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';

//style..................................................................................................
// Custom theme with brown and red tones
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // SaddleBrown
      light: '#A0522D', // Sienna
      dark: '#5D2E0C', // Darker brown
    },
    secondary: {
      main: '#CD5C5C', // IndianRed
      light: '#F08080', // LightCoral
      dark: '#A52A2A', // Brown
    },
    background: {
      default: '#FFF8F0', // Light cream
      paper: '#FFF8F0',
    },
    text: {
      primary: '#3E2723', // Dark brown
      secondary: '#5D4037', // Medium brown
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
      color: '#5D4037',
    },
    h5: {
      fontWeight: 500,
      color: '#8B4513',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// Styled components
const ProductCard = styled(Card)(({ theme }) => ({
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFAF5',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  position: 'relative',
}));

// const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
//   paddingTop: '56.25%', // 4:3 aspect ratio
//   backgroundSize: 'contain',backgroundPosition: 'center',height: 140,
//   backgroundColor: '#FFF',
// }));
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 180,
  objectFit: 'cover',
  objectPosition: 'center',
}));
const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: '#FFF',
  borderRadius: 8,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const ManageProducts = () => {
  const dispatch = useDispatch();
  // const activities = useSelector(state => state.Products?.productsList || []);

  // State for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  // const [filterCategory, setFilterCategory] = useState('all');

  // State for product operations
  const [editingProduct, setEditingProduct] = useState(null);
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({

  activityName: "",
  activityDescription: "",
  lenOfActivity: -1,
  location: "",
  price: -1,
  nightPrice: -1,
  managerId: -1,
  imgPath: "",

  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });


  // Fetch products on component mount


  // Handle quantity update dialog
  const openQuantityDialog = (product) => {
    setEditingProduct(product);
    setNewQuantity(product.psum);
    setQuantityDialogOpen(true);
  };

  const closeQuantityDialog = () => {
    setQuantityDialogOpen(false);
    setEditingProduct(null);
    setNewQuantity(0);
  };

  

  // Handle add product dialog
  const openAddProductDialog = () => {
    setAddProductDialogOpen(true);
  };

  const closeAddProductDialog = () => {
    setAddProductDialogOpen(false);
    setnewActivity({
      pname: '',
      pprice: 0,
      pdescription: '',
      // pcategory: '',
      psum: 0,
      ppicture: ''
    });
    setSelectedImage(null);
  };

  const handlenewActivityChange = (e) => {
    const { name, value } = e.target;
    setnewActivity({
      ...newActivity,
      [name]: value
    });
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };


  const uploadImage = async () => {
    if (!selectedImage) {
      setSnackbar({
        open: true,
        message: 'אנא בחר תמונה',
        severity: 'warning'
      });
      return null;
    }
  
    setUploadingImage(true);
  
    const formData = new FormData();
    formData.append('file', selectedImage); // שינוי מ-'image' ל-'file'
  
    try {
      // שימוש ב-fetch
      const response = await fetch('https://localhost:7064/api/Img/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`שגיאת שרת: ${response.status}`);
      }
  
      const data = await response.json();
      setUploadingImage(false);
  
      setSnackbar({
        open: true,
        message: 'התמונה הועלתה בהצלחה',
        severity: 'success'
      });
      
      return data.imageUrl; // השרת מחזיר את הנתיב בשדה imageUrl
    } catch (error) {
      console.error("שגיאה בהעלאת תמונה:", error);
      setUploadingImage(false);
      setSnackbar({
        open: true,
        message: 'שגיאה בהעלאת התמונה',
        severity: 'error'
      });
      return null;
    }
  };
  
  const handleAddActivity = async () => {
    // Validate form
    if (!newActivity.activityName || newActivity.price <= 0) {
      setSnackbar({
        open: true,
        message: 'אנא מלא את כל השדות הנדרשים',
        severity: 'warning'
      });
      return;
    }

    // Upload image first
    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    // Add product with image URL
    const activityToAdd = {
      ...newActivity,
      imgPath: imageUrl
    };

    dispatch(addProductThunk(activityToAdd))
      .then(() => {
        setSnackbar({
          open: true,
          message: 'המוצר נוסף בהצלחה',
          severity: 'success'
        });
        closeAddProductDialog();
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: 'שגיאה בהוספת המוצר',
          severity: 'error'
        });
      });
  };

  // Handle search, sort, and filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <PageHeader>
          <Typography variant="h4" component="h1">
            ניהול מוצרים
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={openAddProductDialog}
            sx={{ height: '5vh' }}
          >
            הוסף מוצר חדש
          </Button>
        </PageHeader>

        {/* Search and filters */}
        <Paper elevation={2} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <SearchBar
                fullWidth
                placeholder="חיפוש מוצרים..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={sortBy === 'name' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleSortChange('name')}
                  startIcon={<SortIcon />}
                  sx={{ flexGrow: 1, height: '5vh' }}
                >
                  מיון לפי שם {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                  variant={sortBy === 'price' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleSortChange('price')}
                  startIcon={<SortIcon />}
                  sx={{ flexGrow: 1, height: '5vh' }}
                >
                  מיון לפי מחיר {sortBy === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
                <Button
                  variant={sortBy === 'quantity' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleSortChange('quantity')}
                  startIcon={<SortIcon />}
                  sx={{ flexGrow: 1, height: '5vh' }}
                >
                  מיון לפי כמות {sortBy === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Products grid */}
       

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[12, 24, 36, 48]}
            labelRowsPerPage="מוצרים בעמוד:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
            sx={{
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                margin: 0,
              },
            }}
          />
        </Box>

      

        {/* Add Product Dialog */}
        <Dialog
          open={addProductDialogOpen}
          onClose={closeAddProductDialog}
          fullWidth
          maxWidth="md"
          dir="rtl"
        >
          <DialogTitle>
            הוספת מוצר חדש
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="pname"
                  label="שם המוצר"
                  fullWidth
                  variant="outlined"
                  value={newActivity.pname}
                  onChange={handlenewActivityChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="pprice"
                  label="מחיר"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newActivity.pprice}
                  onChange={handlenewActivityChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                    inputProps: { min: 0, step: 0.01 }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pdescription"
                  label="תיאור המוצר"
                  fullWidth
                  variant="outlined"
                  value={newActivity.pdescription}
                  onChange={handlenewActivityChange}
                  multiline
                  rows={3}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel id="category-label">קטגוריה</InputLabel>
                  <Select
                    labelId="category-label"
                    name="pcategory"
                    value={newActivity.pcategory}
                    onChange={handlenewActivityChange}
                    label="קטגוריה"
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <TextField
                  name="psum"
                  label="כמות במלאי"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newActivity.psum}
                  onChange={handlenewActivityChange}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ border: '1px dashed', borderColor: 'primary.main', borderRadius: 2, p: 3, textAlign: 'center' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="product-image-upload"
                    type="file"
                    onChange={handleImageSelect}
                  />
                  <label htmlFor="product-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<UploadIcon />}
                      sx={{ mb: 2 }}
                    >
                      בחר תמונה למוצר
                    </Button>
                  </label>
                  {selectedImage && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        נבחרה תמונה: {selectedImage.name}
                      </Typography>
                      <Box
                        component="img"
                        src={URL.createObjectURL(selectedImage)}
                        alt="תצוגה מקדימה"
                        sx={{
                          maxHeight: 200,
                          maxWidth: '100%',
                          objectFit: 'contain',
                          mt: 1,
                          borderRadius: 1
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddProductDialog} color="primary" startIcon={<CancelIcon />}>
              ביטול
            </Button>
            <Button
              onClick={handleAddActivity}
              color="secondary"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={uploadingImage}
            >
              {uploadingImage ? <CircularProgress size={24} /> : 'הוסף מוצר'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

