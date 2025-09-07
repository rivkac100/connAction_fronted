import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
import { addActivityThunk } from '../../store/slices/activites/addActivityThunk';
import { useNavigate, useParams } from 'react-router-dom';


//style..................................................................................................
// Custom theme with brown and red tones
const theme = createTheme({
  palette: {
       primary: {
    main: '#b60557', // SaddleBrown
    light: '#b60557', // Sienna
    dark: '#630296', // Darker brown
  },
  secondary: {
    main: '#b60557', // IndianRed
    light: '#b60557', // LightCoral
    dark: '#94024b', // Brown
  },
  background: {
    default: '#FFF8F0', // Light cream
    paper: '#FFF8F0',
  },
  text: {
    primary: '#b60557', // Dark brown
    secondary: '#b60557', // Medium brown
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
      color: '#b60557',
    },
    h5: {
      fontWeight: 500,
      color: '#b60557',
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


export const AddEditActivity = () => {
  const dispatch = useDispatch();
  // const activities = useSelector(state => state.Products?.productsList || []);

  // State for UI

  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');


  // const [filterCategory, setFilterCategory] = useState('all');

  // State for product operations

  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const params=useParams();
  const [newActivity, setNewActivity] = useState({

    activityName: "",
    activityDescription: "",
    lenOfActivity: -1,
    location: "",
    price: -1,
    nightPrice: -1,
    managerId: params.mid,
    imgPath: "",

  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();
  // Fetch products on component mount

  useEffect(() => {
    setAddProductDialogOpen(true);
  }, []);
  // Handle quantity update dialog




  // Handle add product dialog


  const closeAddProductDialog = () => {
    setAddProductDialogOpen(false);

    setNewActivity({
      activityName: "",
      activityDescription: "",
      lenOfActivity: -1,
      location: "",
      price: -1,
      nightPrice: -1,
      managerId: params.mid,
      imgPath: "",
    });
    setSelectedImage(null);
     navigate(-1);
  };

  const handleNewActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
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
    formData.append('file', selectedImage);

    try {
      const response = await fetch('https://localhost:7044/api/Img/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`שגיאת שרת: ${response.status}`);
      }

      const data = await response.json();
      console.log("תגובת השרת להעלאת תמונה:", data); // לוג מפורט של התגובה
      setUploadingImage(false);

      setSnackbar({
        open: true,
        message: 'התמונה הועלתה בהצלחה',
        severity: 'success'
      });

      // בדוק אם יש נתיב תמונה בתגובה
      if (data.imageUrl) {
        console.log("נתיב התמונה שהתקבל:", data.imageUrl);
        return data.imageUrl;
      } else {
        console.error("לא התקבל נתיב תמונה בתגובה:", data);
        return null;
      }
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

    // Upload image first
    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    // Add product with image URL
    const activityToAdd = {
      ...newActivity,
      imgPath: imageUrl
    };

    dispatch(addActivityThunk({ details: activityToAdd }))
      .then(() => {
        setSnackbar({
          open: true,
          message: 'המוצר נוסף בהצלחה',
          severity: 'success'
        });
        closeAddProductDialog();
        navigate(-1)
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




  




  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
       

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
                  name="activityName"
                  label="שם הפעילות"
                  fullWidth
                  variant="outlined"
                  type='text'
                  border='3px solid #b60557 !important'
                  value={newActivity.activityName}
                  onChange={handleNewActivityChange}
                  multiline
                  rows={3}

                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="activityDescription"
                  label="תיאור הפעילות"
                  fullWidth
                  variant="outlined"
                  type='text'
                  value={newActivity.activityDescription}
                  onChange={handleNewActivityChange}
                  multiline
                  rows={3}
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="מיקום הפעילות"
                  fullWidth
                  variant="outlined"
                  value={newActivity.location}
                  onChange={handleNewActivityChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="lenOfActivity"
                  label="משך פעילות"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newActivity.lenOfActivity}
                  onChange={handleNewActivityChange}
                
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="price"
                  label="מחיר"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newActivity.price}
                  onChange={handleNewActivityChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                    inputProps: { min: 0, step: 0.01 }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="nightPrice"
                  label=" מחיר לילה"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={newActivity.nightPrice}
                  onChange={handleNewActivityChange}
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

