import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './activites.css';

// Material UI
import {
  Box, Typography, Button, IconButton, Paper, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert, CircularProgress, Grid, Collapse, Card, CardContent,
  CardActions, CardMedia, Chip, Divider, Avatar, Tooltip, Container
} from '@mui/material';

import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Nightlight as NightlightIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';

import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';
//import { activitiesByMangerIdThunk } from '../../store/slices/managers/ordersByMangerIdThunk';
import { managersFetchThunkById } from '../../store/slices/managers/managerFetchThunkById';
import { editActivityName } from '../../store/slices/orders/orderSlice';



export const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  // Redux state
  const activitiesByMid = useSelector((state) => state.manager.activities);
  const allActivities = useSelector((state) => state.activity.activities);
  const manager = useSelector((state) => state.manager.myManager);
  const isLoading = useSelector((state) => state.activity.isLoading);

  // Local state
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [searchFields, setSearchFields] = useState({
    activityName: "",
    activityDescription: "",
    lenOfActivity: "",
    location: "",
    price: "",
    nightPrice: ""
  });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
const [activities, setActivities] = useState(param.mid ? activitiesByMid?activitiesByMid:[] : allActivities?allActivities:[]);
  // הוספת קוד דיבוג בתחילת הקומפוננטה
  console.log("Component rendering with params:", param);

  // הוספת useEffect לבדיקת הנתונים בכל רנדור
  useEffect(() => {
    console.log("Current state - Activities:", activities);
    console.log("Current state - Manager:", manager);
    console.log("Current state - Loading:", isLoading);

  }, [activities, manager, isLoading]);

  // Fetch activities on component mount
  useEffect( () => {
    debugger
    console.log("Fetching activities for manager ID:", param.mid);
    if (param.mid && param.id) {
      if (!allActivities.length) {
         dispatch(managersFetchThunkById({ id: param.mid }))
        
      }
      if(manager) {
        setActivities(activitiesByMid);
        console.log(activitiesByMid);
      }
      // activities = activitiesByMid;
    }
    else {
      if (allActivities.length === 0) {
         dispatch(activitiesFetch());
      }
      if(allActivities) {
        setActivities(allActivities);
        console.log( allActivities);
      }

      // activities = allActivities;
    }

  }, []);

  // Handle search field changes
  const handleSearchChange = (field, value) => {
    setSearchFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear all search fields
  const clearSearch = () => {
    setSearchFields({
      activityName: "",
      activityDescription: "",
      lenOfActivity: "",
      location: "",
      price: "",
      nightPrice: ""
    });
  };

  //  activities = param.mid ? (activitiesByMid?activitiesByMid:[] ): (allActivities?allActivities:[]);
  // Filtered activities
  const filteredActivities = activities?.filter(activity => {
    // Check if any search field is filled
    console.log("Checking activity:", activity);
    const isSearchActive = Object.values(searchFields).some(value => value !== '');

    // If no search is active, return all activities
    if (!isSearchActive) return true;

    // Check each field
    const matchesName = !searchFields.activityName ||
      (activity.activityName && activity.activityName.toLowerCase().includes(searchFields.activityName.toLowerCase()));

    const matchesDescription = !searchFields.activityDescription ||
      (activity.activityDescription && activity.activityDescription.toLowerCase().includes(searchFields.activityDescription.toLowerCase()));

    const matchesLocation = !searchFields.location ||
      (activity.location && activity.location.toLowerCase().includes(searchFields.location.toLowerCase()));

    // חיפוש מחיר עד המחיר שהוזן (ולא בדיוק את המחיר)
    const matchesPrice = !searchFields.price ||
      (activity.price && activity.price <= parseFloat(searchFields.price));

    const matchesLength = !searchFields.lenOfActivity ||
      (activity.lenOfActivity && activity.lenOfActivity.toString().includes(searchFields.lenOfActivity));

    // Return true if all filled fields match
    return matchesName && matchesDescription && matchesLocation && matchesPrice && matchesLength;
  });

  // Event handlers
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpenDetailsDialog(true);
  };

  const handleDeleteClick = (event, activity) => {
    event.stopPropagation(); // Prevent opening the details dialog
    setSelectedActivity(activity);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (event, activity) => {
    event.stopPropagation(); // Prevent opening the details dialog
    // navigate(`editActivity/${activity.id}`);
  };

  const handleOrderClick = (event, activity) => {
    event.stopPropagation(); // Prevent opening the details dialog
    dispatch(editActivityName(activity.activityName));
    navigate(`newOrder/${activity.activityId}`);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteActivityThunk(selectedActivity.id))
      .then(() => {
        setSnackbar({
          open: true,
          message: 'הפעילות נמחקה בהצלחה',
          severity: 'success'
        });
        setOpenDeleteDialog(false);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'אירעה שגיאה במחיקת הפעילות',
          severity: 'error'
        });
      });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRefresh = () => {
    // .then(() => {
    console.log("Activities fetched successfully");
    setSnackbar({
      open: true,
      message: 'הנתונים רועננו בהצלחה',
      severity: 'info'
    });
    // })
    // .catch(error => {
    //   console.error("Error fetching activities:", error);
    //   setSnackbar({
    //     open: true,
    //     message: 'אירעה שגיאה בטעינת הנתונים',
    //     severity: 'error'
    //   });
    // });
  };

  // Toggle search options visibility
  const toggleSearchOptions = () => {
    setShowSearchOptions(!showSearchOptions);
  };



  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <CircularProgress sx={{ color: '#b60557' }} />
        <Typography variant="h6" sx={{ mt: 2, color: '#333' }}>טוען נתוני פעילויות...</Typography>
      </Box>
    );
  }

  return (
    <Box className="activities-page">
      <div className="gradient-bg"></div>

      {/* Header */}
      <Container maxWidth="xl">
        <Box className="activities-header">
          <Typography variant="h2" className="page-title">
            פעילויות וטיולים
          </Typography>
          <Typography variant="h6" className="page-subtitle">
            צפייה, עריכה והזמנה של פעילויות במערכת
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="action-button primary"
              onClick={() => navigate('newActivity')}
            >
              הוסף פעילות
            </Button>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              className="action-button secondary"
              onClick={handleRefresh}
            >
              רענן
            </Button>

            {/* כפתור חיפוש - פותח את אפשרויות החיפוש */}
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              className="action-button search"
              onClick={() => { toggleSearchOptions(); }}
            >
              חיפוש וסינון
            </Button>
          </Box>
        </Box>

        {/* Search Options - מוצג רק כשלוחצים על כפתור החיפוש */}
        <Collapse in={showSearchOptions}>
          <Paper className="search-paper">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" className="section-title">
                <FilterListIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                סינון פעילויות
              </Typography>

              <IconButton
                onClick={toggleSearchOptions}
                className="close-search-button"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="שם פעילות"
                  variant="outlined"
                  size="small"
                  value={searchFields.activityName}
                  onChange={(e) => handleSearchChange('activityName', e.target.value)}
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="תיאור"
                  variant="outlined"
                  size="small"
                  value={searchFields.activityDescription}
                  onChange={(e) => handleSearchChange('activityDescription', e.target.value)}
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InfoIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="מיקום"
                  variant="outlined"
                  size="small"
                  value={searchFields.location}
                  onChange={(e) => handleSearchChange('location', e.target.value)}
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="מחיר מקסימלי"
                  variant="outlined"
                  size="small"
                  value={searchFields.price}
                  onChange={(e) => handleSearchChange('price', e.target.value)}
                  type="number"
                  className="search-field"
                  helperText="הצג פעילויות עד המחיר הזה"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="אורך פעילות (שעות)"
                  variant="outlined"
                  size="small"
                  value={searchFields.lenOfActivity}
                  onChange={(e) => handleSearchChange('lenOfActivity', e.target.value)}
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={clearSearch}
                    fullWidth
                    className="clear-button"
                  >
                    נקה סינון
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>

        {/* Results Summary - מוצג רק אם יש סינון פעיל */}
        {Object.values(searchFields).some(value => value !== '') && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
            <Typography variant="subtitle1" className="results-count">
              {filteredActivities?.length} פעילויות נמצאו
            </Typography>

            <Button
              variant="text"
              className="clear-search-button"
              onClick={clearSearch}
              startIcon={<CloseIcon />}
            >
              נקה סינון
            </Button>
          </Box>
        )}

        {/* Activity Cards Grid */}
        {activities && activities.length > 0 ? (
          <Grid container spacing={3} className="activities-grid">
            {filteredActivities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id || index}>
                <Card
                  className="activity-card"
                  // data-aos="fade-up"
                  onClick={() => handleActivityClick(activity)}
                >
                  <Box className="card-image-container">
                    <CardMedia
                      component="img"
                      image={`https://localhost:7044/img/${activity.imgPath}`}
                      alt={activity.activityDescription || "פעילות"}
                      className="activity-image"
                    />
                  </Box>

                  <Box className="activity-badge">
                    <Tooltip title="מזהה פעילות">
                      <Chip
                        label={activity.activityId}
                        size="small"
                        className="activity-id-chip"
                      />
                    </Tooltip>
                  </Box>

                  <CardContent className="activity-content">
                    <Box className="activity-details">
                      <Typography variant="h6" component="div" className="activity-name">
                        {activity.activityName || "פעילות ללא שם"}
                      </Typography>
                      <Typography variant="body2" component="div" className="activity-description">
                        {activity.activityDescription || "פעילות ללא תיאור"}
                      </Typography>

                      <Box className="activity-detail">
                        <LocationOnIcon fontSize="small" className="detail-icon location" />
                        <Typography variant="body2" noWrap>
                          {activity.location || "המיקום לבחירתך"}
                        </Typography>
                      </Box>

                      <Box className="activity-detail">
                        <AccessTimeIcon fontSize="small" className="detail-icon time" />
                        <Typography variant="body2">
                          {activity.lenOfActivity ? `${activity.lenOfActivity} שעות` : "משך לא צוין"}
                        </Typography>
                      </Box>

                      <Box className="activity-price">
                        <AttachMoneyIcon fontSize="small" className="detail-icon price" />
                        <Typography variant="body1" className="price-value">
                          ₪{activity.price || 0}
                        </Typography>
                      </Box>
                    </Box>
                    <CardActions className="card-actions">
                      <Box className="action-buttons">
                        <Tooltip title="הזמן פעילות">
                          <IconButton
                            size="small"
                            className="action-button order"
                            onClick={(e) => handleOrderClick(e, activity)}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="עריכה">
                          <IconButton
                            size="small"
                            className="action-button edit"
                            onClick={(e) => handleEditClick(e, activity)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="מחיקה">
                          <IconButton
                            size="small"
                            className="action-button delete"
                            onClick={(e) => handleDeleteClick(e, activity)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper className="no-results">
            <Typography variant="h6" color="text.secondary" gutterBottom>
              לא נמצאו פעילויות זמינות
            </Typography>
            <Typography variant="body1" color="text.secondary">
              נראה שאין עדיין פעילויות או שיש בעיה בטעינת הנתונים. נסה לרענן את הדף.
            </Typography>

          </Paper>
        )}

        {/* Activity Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          maxWidth="md"
          fullWidth
          className="details-dialog"
        >
          {selectedActivity && (
            <>
              <Box className="dialog-header">
                <CardMedia
                  component="img"
                  image={`https://localhost:7044/img/${selectedActivity.imgPath}`}
                  alt={selectedActivity.activityDescription || "פעילות"}
                  className="dialog-image"
                />

                <Box className="dialog-header-content">
                  <Typography variant="h3" className="dialog-title">
                    {selectedActivity.activityName || "פעילות ללא שם"}
                  </Typography>
                  <Typography variant="subtitle1" className="dialog-description">
                    {selectedActivity.activityDescription}
                  </Typography>
                  <Chip
                    label={`קוד פעילות: ${selectedActivity.activityId}`}
                    className="dialog-id-chip"
                  />
                </Box>

                <IconButton
                  onClick={() => setOpenDetailsDialog(false)}
                  className="dialog-close-button"
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <DialogContent className="dialog-content">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box className="details-section">
                      <Typography variant="h5" className="section-title">
                        פרטי הפעילות
                      </Typography>

                      <Box className="detail-item">
                        <Box className="detail-icon-container location">
                          <LocationOnIcon />
                        </Box>
                        <Box className="detail-content">
                          <Typography variant="body2" className="detail-label">
                            מיקום
                          </Typography>
                          <Typography variant="h6" className="detail-value">
                            {selectedActivity.location || "המיקום לבחירתך"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="detail-item">
                        <Box className="detail-icon-container time">
                          <AccessTimeIcon />
                        </Box>
                        <Box className="detail-content">
                          <Typography variant="body2" className="detail-label">
                            אורך הפעילות
                          </Typography>
                          <Typography variant="h6" className="detail-value">
                            {selectedActivity.lenOfActivity ? `${selectedActivity.lenOfActivity} שעות` : "לא צוין"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="detail-item">
                        <Box className="detail-icon-container manager">
                          <PersonIcon />
                        </Box>
                        <Box className="detail-content">
                          <Typography variant="body2" className="detail-label">
                            קוד מנהל
                          </Typography>
                          <Typography variant="h6" className="detail-value">
                            {selectedActivity.managerId || "לא צוין"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box className="pricing-section">
                      <Typography variant="h5" className="section-title">
                        פרטי תשלום
                      </Typography>

                      <Box className="price-box regular">
                        <Box className="price-header">
                          <AttachMoneyIcon className="price-icon" />
                          <Typography variant="body1" className="price-label">
                            מחיר רגיל
                          </Typography>
                        </Box>
                        <Typography variant="h3" className="price-amount">
                          ₪{selectedActivity.price || 0}
                        </Typography>
                      </Box>

                      <Box className="price-box night">
                        <Box className="price-header">
                          <NightlightIcon className="price-icon" />
                          <Typography variant="body1" className="price-label">
                            תעריף לילה
                          </Typography>
                        </Box>
                        <Typography variant="h3" className="price-amount">
                          ₪{selectedActivity.nightPrice || 0}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>

              <Box className="dialog-actions">
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  className="dialog-action-button edit"
                  onClick={() => {
                    setOpenDetailsDialog(false);
                    // navigate(`editActivity/${selectedActivity.id}`);
                  }}
                >
                  עריכת פעילות
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  className="dialog-action-button order"
                  onClick={() => {
                    setOpenDetailsDialog(false);
                    navigate(`/orders/new/${selectedActivity.activityId}`);
                  }}
                >
                  הזמן פעילות
                </Button>
                <Button
                  variant="contained"
                  className="dialog-action-button close"
                  onClick={() => setOpenDetailsDialog(false)}
                >
                  סגור
                </Button>
              </Box>
            </>
          )}
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          className="delete-dialog"
        >
          <DialogTitle className="delete-dialog-title">
            אישור מחיקת פעילות
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="delete-dialog-text">
              האם אתה בטוח שברצונך למחוק את הפעילות "{selectedActivity?.activityName || selectedActivity?.activityDescription}"?
              פעולה זו אינה ניתנת לביטול.
            </DialogContentText>
          </DialogContent>
          <DialogActions className="delete-dialog-actions">
            <Button onClick={() => setOpenDeleteDialog(false)} className="cancel-button">
              ביטול
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus className="confirm-delete-button">
              מחיקה
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" className="snackbar-alert">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>

      {/* Outlet for nested routes */}
      <Outlet />
    </Box>
  );
};
