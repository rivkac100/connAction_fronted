import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { customersFetchThunkById } from '../../store/slices/customers/customerFetchThunkById';
import {
  Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography,
  Paper, Container, Grid, IconButton, Chip, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Card, CardContent, Divider, Tooltip, Badge,
  InputAdornment, Fade, Zoom, Collapse, Alert, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { deleteOrderThunk } from '../../store/slices/orders/deleteOrderThunk';
import { ordersByMangerIdThunk } from '../../store/slices/managers/ordersByMangerIdThunk';
import './order.css';

export const MyOrders = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const myOrdersC = useSelector(state => state.customer.MyOrders);
  const myOrdersM = useSelector(state => state.manager.MyOrders);

  const id = params.id;
  const token = useSelector(state => state.order.token);
  const failed = useSelector(state => state.order.failed);
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [before, setBefore] = useState(false);

  // מצבים לסינון וחיפוש
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [viewMode, setViewMode] = useState('cards');
  const [activityNameFilter, setActivityNameFilter] = useState('');

  useEffect(() => {
    if (params.id && (!myOrdersC || myOrdersC.length === 0)) {
      dispatch(customersFetchThunkById({ id: params.id }));
    }
    if (params.mid && (!myOrdersM || myOrdersM.length === 0)) {
      dispatch(ordersByMangerIdThunk({ id: params.mid }));
    }

    if (today === new Date().toLocaleDateString()) {
      setToday(splitToDate(today));
    }
  }, []);

  const splitToDate = (d) => {
    const s = d.split("/");
    if (parseInt(s[0]) < 10)
      s[0] = "0" + s[0];
    if (parseInt(s[1]) < 10)
      s[1] = "0" + s[1];
    d = s[2] + "-" + s[0] + "-" + s[1];
    return d;
  }

  const deleteOrder = async (orderId) => {
    dispatch(deleteOrderThunk(orderId))
      .then(() => {
        setSnackbar({
          open: true,
          message: 'ההזמנה נמחקה בהצלחה',
          severity: 'success'
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'אירעה שגיאה במחיקת ההזמנה',
          severity: 'error'
        });
      });
  }

  const cheakDate = (date) => {
    const d1 = date.split("-");
    const d2 = today.split("-");
    if (d1[0] < d2[0])
      return true;
    else if (d1[0] === d2[0] && d1[1] < d2[1])
      return true;
    else if (d1[0] === d2[0] && d1[1] === d2[1] && d1[2] < d2[2])
      return true;
    else
      return false;
  }

  // פונקציה לאישור הזמנה
  const confirmOrder = (orderId) => {
    // כאן תוסיף את הלוגיקה לאישור ההזמנה בשרת
    console.log("אישור הזמנה:", orderId);
    setConfirmDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'ההזמנה אושרה בהצלחה',
      severity: 'success'
    });
    // לדוגמה: dispatch(confirmOrderThunk(orderId));
  }

  // פונקציה חדשה לבדיקה האם הזמנה עברה או לא
  const isOrderPast = (orderDate) => {
    // המרת התאריך לפורמט תקין לבדיקה
    const dateParts = orderDate.split('-');
    // יצירת אובייקט תאריך בפורמט שנה-חודש-יום
    const orderDateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    // השוואה עם התאריך הנוכחי
    const currentDate = new Date();
    // איפוס שעות, דקות, שניות ומילישניות לצורך השוואה מדויקת
    currentDate.setHours(0, 0, 0, 0);
    orderDateObj.setHours(0, 0, 0, 0);

    // החזרת תוצאת ההשוואה - האם התאריך עבר
    return orderDateObj < currentDate;
  };

  // עדכון פונקציית הפילטור כדי שתחפש בכל העמודות
  const filterOrders = (orders) => {
    if (!orders) return [];

    return orders.filter(order => {
      // סינון לפי חיפוש - בדיקה בכל העמודות הרלוונטיות
      const searchMatch = searchTerm === '' ||
        order.orderId?.toString().includes(searchTerm) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.brokerName && order.brokerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.activityName && order.activityName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.date && order.date.includes(searchTerm)) ||
        (order.activeHour && order.activeHour.includes(searchTerm)) ||
        (order.payment && order.payment.toString().includes(searchTerm)) ||
        (order.amountOfParticipants && order.amountOfParticipants.toString().includes(searchTerm));

      // סינון לפי תאריך - שימוש בפונקציה الجديدة
      let dateMatch = true;
      if (dateFilter === 'future') {
        dateMatch = !isOrderPast(order.date);
      } else if (dateFilter === 'past') {
        dateMatch = isOrderPast(order.date);
      }

      // סינון לפי שם פעילות
      const activityMatch = activityNameFilter === '' ||
        (order.activityName && order.activityName.toLowerCase().includes(activityNameFilter.toLowerCase()));

      return searchMatch && dateMatch && activityMatch;
    });
  }

  // מיון ההזמנות לפי תאריך
  const sortOrdersByDate = (orders) => {
    if (!orders) return [];
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA - dateB;
    });
  }

  // הפעלת הפילטרים והמיון
  const filteredOrdersC = filterOrders(myOrdersC);
  const filteredOrdersM = filterOrders(myOrdersM);

  const futureOrdersC = sortOrdersByDate(filteredOrdersC.filter(o => !isOrderPast(o.date)));
  const pastOrdersC = sortOrdersByDate(filteredOrdersC.filter(o => isOrderPast(o.date)));
  const futureOrdersM = sortOrdersByDate(filteredOrdersM.filter(o => !isOrderPast(o.date)));
  const pastOrdersM = sortOrdersByDate(filteredOrdersM.filter(o => isOrderPast(o.date)));

  const handleRefresh = () => {
    if (params.id) {
      dispatch(customersFetchThunkById({ id: params.id }))
        .then(() => {
          setSnackbar({
            open: true,
            message: 'הנתונים רועננו בהצלחה',
            severity: 'info'
          });
        });
    } else if (params.mid) {
      dispatch(ordersByMangerIdThunk({ id: params.mid }))
        .then(() => {
          setSnackbar({
            open: true,
            message: 'הנתונים רועננו בהצלחה',
            severity: 'info'
          });
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Toggle search options visibility
  const toggleSearchOptions = () => {
    setShowSearchOptions(!showSearchOptions);
  };

  // פונקציה להחלפת מצב התצוגה
  const toggleViewMode = () => {
    setViewMode(viewMode === 'cards' ? 'table' : 'cards');
  };

  return (
    <Box className="orders-page">
      <div className="gradient-bg"></div>

      {/* Header */}
      <Container maxWidth="xl">
        <Box className="orders-header">
          <Typography variant="h2" className="page-title">
            היסטוריית הזמנות
          </Typography>
          <Typography variant="h6" className="page-subtitle">
            צפייה, עריכה וניהול הזמנות במערכת
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              className="action-button secondary"
              onClick={handleRefresh}
            >
              רענן
            </Button>

            {/* כפתור להחלפת מצב תצוגה */}
            <Button
              variant="outlined"
              startIcon={viewMode === 'cards' ? <ViewListIcon /> : <ViewModuleIcon />}
              className="action-button view-toggle"
              onClick={toggleViewMode}
            >
              {viewMode === 'cards' ? 'תצוגת טבלה' : 'תצוגת כרטיסים'}
            </Button>

            {/* כפתור חיפוש - פותח את אפשרויות החיפוש */}
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              className="action-button search"
              onClick={toggleSearchOptions}
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
                סינון הזמנות
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
                  label="חיפוש חופשי"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                <FormControl fullWidth size="small">
                  <InputLabel>סינון לפי תאריך</InputLabel>
                  <Select
                    value={dateFilter}
                    label="סינון לפי תאריך"
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <MenuItem value="all">כל ההזמנות</MenuItem>
                    <MenuItem value="future">הזמנות עתידיות</MenuItem>
                    <MenuItem value="past">הזמנות שעברו</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* הוספת שדה סינון לפי שם פעילות */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="סינון לפי שם פעילות"
                  variant="outlined"
                  size="small"
                  value={activityNameFilter}
                  onChange={(e) => setActivityNameFilter(e.target.value)}
                  className="search-field"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterListIcon fontSize="small" />
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
                    onClick={() => {
                      setSearchTerm('');
                      setDateFilter('all');
                      setActivityNameFilter(''); // ניקוי גם של סינון שם פעילות
                    }}
                    fullWidth
                    className="clear-button"
                    sx={{ bgcolor: '#af2263', '&:hover': { bgcolor: '#8e0443' } }}
                  >
                    נקה סינון
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>

        {/* Results Summary - מוצג רק אם יש סינון פעיל */}
        {(searchTerm !== '' || dateFilter !== 'all' || activityNameFilter !== '') && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
            <Typography variant="subtitle1" className="results-count">
              {(params.id ? filteredOrdersC : filteredOrdersM)?.length} הזמנות נמצאו
            </Typography>

            <Button
              variant="text"
              className="clear-search-button"
              onClick={() => {
                setSearchTerm('');
                setDateFilter('all');
                setActivityNameFilter('');
              }}
              startIcon={<CloseIcon />}
            >
              נקה סינון
            </Button>
          </Box>
        )}

        {/* הזמנות עתידיות */}
        <Typography variant="h4" className="section-title" sx={{ mt: 5, mb: 3, color: '#af2263', fontWeight: 'bold' }}>
          הזמנות עתידיות
        </Typography>

        {/* תצוגת כרטיסים */}
        {viewMode === 'cards' && (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)'  // 5 בשורה במסכים גדולים
            },
            gap: 2
          }}>
            {params.id ? (
              futureOrdersC && futureOrdersC.length > 0 ? (
                futureOrdersC.map(order => (
                  <Box
                    key={order.orderId}
                    sx={{
                      width: {
                        xs: 'calc(100% - 16px)',
                        sm: 'calc(50% - 16px)',
                        md: 'calc(33.333% - 16px)',
                        lg: 'calc(20% - 16px)'
                      },
                      margin: '8px',
                    }}
                  >
                    <Card
                      elevation={3}
                      sx={{
                        height: '100%',
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        },
                        position: 'relative',
                        overflow: 'visible'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          bgcolor: '#b60557 !important',
                          color: 'white',
                          borderRadius: '20px',
                          px: 2,
                          py: 0.5,
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                          zIndex: 1
                        }}
                        style={{
                         backgroundColor: '#b60557 !important',
                        }}
                      >
                        פעיל
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="div" fontWeight="bold" color="#b60557">
                            {order.activityName || "פעילות ללא שם"}
                          </Typography>
                          <Chip
                            label={`#${order.orderId}`}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 'bold', bgcolor: '#d57fa7f6' }}
                          />
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <EventIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.date}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <AccessTimeIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.activeHour}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <PersonIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.brokerName || "לא צוין"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Badge badgeContent={order.amountOfParticipants} color="secondary" sx={{ mr: 1.5 }}>
                            <PersonIcon color="action" />
                          </Badge>
                          <Typography variant="body1">
                            משתתפים
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoneyIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" fontWeight="bold" color="#3b3a3d">
                            {order.payment} ₪
                          </Typography>
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Tooltip title="מחיקת הזמנה">
                            <IconButton onClick={() => deleteOrder(order.orderId)} color="error">
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="עריכת הזמנה">
                            <IconButton onClick={() => navigate(`editOrder/${order.orderId}`)} color="primary">
                              <EditNoteOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* כפתור עריכה להזמנות עתידיות */}
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditNoteOutlinedIcon />}
                          onClick={() => navigate(`editOrder/${order.orderId}`)}
                          sx={{
                            borderRadius: 2,
                            bgcolor: '#d57fa7f6',
                            '&:hover': { bgcolor: '#8e0443' }
                          }}
                        >
                          עריכה
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" color="text.secondary">
                      אין הזמנות עתידיות
                    </Typography>
                  </Paper>
                </Grid>
              )
            ) : (
              futureOrdersM && futureOrdersM.length > 0 ? (
                futureOrdersM.map(order => (
                  <Grid item xs={12} sm={6} md={4} key={order.orderId}>
                    <Card
                      elevation={3}
                      sx={{
                        height: '100%',
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        },
                        position: 'relative',
                        overflow: 'visible'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          bgcolor: '#b60557',
                          color: 'white',
                          borderRadius: '20px',
                          px: 2,
                          py: 0.5,
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                          zIndex: 1
                        }}
                
                      >
                        פעיל
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="div" fontWeight="bold" color="#b60557">
                            {order.activityName || "פעילות ללא שם"}
                          </Typography>
                          <Chip
                            label={`#${order.orderId}`}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 'bold', bgcolor: '#d57fa7f6' }}
                          />
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <EventIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.date}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <AccessTimeIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.activeHour}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <PersonIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1">
                            {order.customerName || "לא צוין"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Badge badgeContent={order.amountOfParticipants} color="secondary" sx={{ mr: 1.5 }}>
                            <PersonIcon color="action" />
                          </Badge>
                          <Typography variant="body1">
                            משתתפים
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoneyIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" fontWeight="bold" color="#3b3a3d">
                            {order.payment} ₪
                          </Typography>
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Tooltip title="מחיקת הזמנה">
                            <IconButton onClick={() => deleteOrder(order.orderId)} color="error">
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="עריכת הזמנה">
                            <IconButton onClick={() => navigate(`editOrder/${order.orderId}`)} color="primary">
                              <EditNoteOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* כפתור עריכה להזמנות עתידיות */}
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditNoteOutlinedIcon />}
                          onClick={() => navigate(`editOrder/${order.orderId}`)}
                          sx={{
                            borderRadius: 2,
                            bgcolor: '#d57fa7f6',
                            '&:hover': { bgcolor: '#8e0443' }
                          }}
                        >
                          עריכה
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" color="text.secondary">
                      אין הזמנות עתידיות
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
          </Box>
        )}
        {/* תצוגת טבלה */}
        {viewMode === 'table' && (
          <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="טבלת הזמנות">
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>קוד הזמנה</TableCell>
                  {params.mid && <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>לקוח</TableCell>}
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>מתווך/ת</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>פעילות</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>תאריך</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>שעה</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>משתתפים</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>תשלום</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {params.id ? (
                  futureOrdersC && futureOrdersC.length > 0 ? (
                    futureOrdersC.map((order) => (
                      <TableRow
                        key={order.orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{order.orderId}</TableCell>
                        <TableCell align="center">{order.brokerName}</TableCell>
                        <TableCell align="center">{order.activityName}</TableCell>
                        <TableCell align="center">{order.date}</TableCell>
                        <TableCell align="center">{order.activeHour}</TableCell>
                        <TableCell align="center">{order.amountOfParticipants}</TableCell>
                        <TableCell align="center">₪{order.payment}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => deleteOrder(order.orderId)}
                            >
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(`editOrder/${order.orderId}`)}
                              sx={{ color: '#af2263' }}
                            >
                              <EditNoteOutlinedIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="subtitle1" sx={{ py: 3 }}>
                          אין הזמנות עתידיות
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  futureOrdersM && futureOrdersM.length > 0 ? (
                    futureOrdersM.map((order) => (
                      <TableRow
                        key={order.orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{order.orderId}</TableCell>
                        <TableCell align="center">{order.customerName}</TableCell>
                        <TableCell align="center">{order.brokerName}</TableCell>
                        <TableCell align="center">{order.activityName}</TableCell>
                        <TableCell align="center">{order.date}</TableCell>
                        <TableCell align="center">{order.activeHour}</TableCell>
                        <TableCell align="center">{order.amountOfParticipants}</TableCell>
                        <TableCell align="center">₪{order.payment}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => deleteOrder(order.orderId)}
                            >
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(`editOrder/${order.orderId}`)}
                              sx={{ color: '#af2263' }}
                            >
                              <EditNoteOutlinedIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="subtitle1" sx={{ py: 3 }}>
                          אין הזמנות עתידיות
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* הזמנות שעברו */}
        <Typography variant="h4" className="section-title" sx={{ mt: 5, mb: 3, color: '#3b3a3d', fontWeight: 'bold' }}>
          הזמנות שעברו
        </Typography>

     {/* תצוגת כרטיסים להזמנות שעברו */}
        {viewMode === 'cards' && (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)'  // 5 בשורה במסכים גדולים
            },
            gap: 2
          }}>
            {params.id ? (
              pastOrdersC && pastOrdersC.length > 0 ? (
                pastOrdersC.map(order => (
                  <Box
                    key={order.orderId}
                    sx={{
                     width: {
                        xs: 'calc(100% - 16px)',
                        sm: 'calc(50% - 16px)',
                        md: 'calc(33.333% - 16px)',
                        lg: 'calc(20% - 16px)'
                      },
                      margin: '8px',
                    }}
                  >

                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        borderRadius: 2,
                        opacity: 0.9,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                    <Box
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          bgcolor: '#b60557',
                          color: 'white',
                          borderRadius: '20px',
                          px: 2,
                          py: 0.5,
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                          zIndex: 1
                        }}
                      >
                        פעיל
                      </Box>

                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="div" fontWeight="bold" color="#af2263" sx={{ opacity: 0.7 }}>
                            {order.activityName || "פעילות ללא שם"}
                          </Typography>
                          <Chip
                            label={`#${order.orderId}`}
                            color="default"
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                       <Divider sx={{ mb: 2 }} />
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <EventIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.date}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <AccessTimeIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.activeHour}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <PersonIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.brokerName || "לא צוין"}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Badge badgeContent={order.amountOfParticipants} color="default" sx={{ mr: 1.5 }}>
                            <PersonIcon color="action" />
                          </Badge>
                          <Typography variant="body1" color="text.secondary">
                            משתתפים
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoneyIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" fontWeight="bold" color="text.secondary">
                            {order.payment} ₪
                          </Typography>
                        </Box>
                      </CardContent>
                   <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
                        <Chip

                          label={order.isPayment===1?"הושלם": "לא הושלם"}
                          color="default"


                          icon={<CheckCircleIcon />}
                          variant="outlined"
                        />
                      </Box>
                    </Card>
                  </Box>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" color="text.secondary">
                      אין הזמנות קודמות
                    </Typography>
                  </Paper>
                </Grid>
              )
            ) : (
              pastOrdersM && pastOrdersM.length > 0 ? (
                pastOrdersM.map(order => (
                  <Grid item xs={12} sm={6} md={4} key={order.orderId}>
                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        borderRadius: 2,
                        opacity: 0.9,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="div" fontWeight="bold" color="#b60557" sx={{ opacity: 0.7 }}>
                            {order.activityName || "פעילות ללא שם"}
                          </Typography>
                          <Chip
                            label={`#${order.orderId}`}
                            color="default"
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <EventIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <AccessTimeIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.activeHour}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <PersonIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" color="text.secondary">
                            {order.customerName || "לא צוין"}
                          </Typography>
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Badge badgeContent={order.amountOfParticipants} color="default" sx={{ mr: 1.5 }}>
                            <PersonIcon color="action" />
                          </Badge>
                          <Typography variant="body1" color="text.secondary">
                            משתתפים
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoneyIcon color="action" sx={{ mr: 1.5 }} />
                          <Typography variant="body1" fontWeight="bold" color="text.secondary">
                            {order.payment} ₪
                          </Typography>
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
                        <Chip
                          label={order.isPayment===1?"הושלם": "לא הושלם"}
                          color="default"
                          icon={<CheckCircleIcon />}
                          variant="outlined"
                        />
                      </Box>

                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                    <Typography variant="h6" color="text.secondary">
                      אין הזמנות קודמות
                    </Typography>
                  </Paper>
                </Grid>

              )
            )}
          </Box>
        )}
        {/* תצוגת טבלה להזמנות שעברו */}
        {viewMode === 'table' && (
          <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="טבלת הזמנות שעברו">
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>קוד הזמנה</TableCell>
                  {params.mid && <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>לקוח</TableCell>}
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>מתווך/ת</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>פעילות</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>תאריך</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>שעה</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>משתתפים</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>תשלום</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: "white" }}>סטטוס</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {params.id ? (
                  pastOrdersC && pastOrdersC.length > 0 ? (
                    pastOrdersC.map((order) => (
                      <TableRow
                        key={order.orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, opacity: 0.8 }}
                      >
                        <TableCell align="center">{order.orderId}</TableCell>
                        <TableCell align="center">{order.brokerName}</TableCell>
                        <TableCell align="center">{order.activityName}</TableCell>
                        <TableCell align="center">{order.date}</TableCell>
                        <TableCell align="center">{order.activeHour}</TableCell>
                        <TableCell align="center">{order.amountOfParticipants}</TableCell>
                        <TableCell align="center">₪{order.payment}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={order.isPayment===1?"הושלם": "לא הושלם"}
                            color="default"
                            size="small"
                            icon={<CheckCircleIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="subtitle1" sx={{ py: 3 }}>
                          אין הזמנות קודמות
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  pastOrdersM && pastOrdersM.length > 0 ? (
                    pastOrdersM.map((order) => (
                      <TableRow
                        key={order.orderId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, opacity: 0.8 }}
                      >
                        <TableCell align="center">{order.orderId}</TableCell>
                        <TableCell align="center">{order.customerName}</TableCell>
                        <TableCell align="center">{order.brokerName}</TableCell>
                        <TableCell align="center">{order.activityName}</TableCell>
                        <TableCell align="center">{order.date}</TableCell>
                        <TableCell align="center">{order.activeHour}</TableCell>
                        <TableCell align="center">{order.amountOfParticipants}</TableCell>
                        <TableCell align="center">₪{order.payment}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={order.isPayment===1?"הושלם": "לא הושלם"}
                            color="default"
                            size="small"
                            icon={<CheckCircleIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="subtitle1" sx={{ py: 3 }}>
                          אין הזמנות קודמות
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* Snackbar לתצוגת הודעות */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
      <Outlet />
    </Box>
  );
}
