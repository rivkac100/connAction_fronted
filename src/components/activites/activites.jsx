
// import { useEffect, useState} from 'react';
// // import './style.css'
// import { useDispatch, useSelector } from "react-redux";
// // import { searchEventThunk } from '../store/slices/searchEventThunk'
// import { Outlet, useNavigate } from 'react-router-dom';


// import '@emotion/styled'
// import "./activites"
// // import { Button } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// // import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
// import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
// import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';

// export const Activities = ( )=>{
//    const navigate = useNavigate()
//   const dispatch= useDispatch();
//   const activites= useSelector(state=>state.activity.activities)
//   console.log(activites)
  
//   const token = useSelector(state => state.activity.token);
//   const failed = useSelector(state => state.activity.failed);
//   const [delt,setDelt]=useState(false);
//   const [edit,setEdit]=useState(false);
//   const [mngId, setMngId]=useState(-1);
  
//  useEffect(() => {
    
//   dispatch(activitiesFetch());
//        alert("I am in activities");
//   // navigate(`/calendar`)
    
// }, [])
// useEffect(() => {
    
//    if(activites?.length==0)dispatch(activitiesFetch());
         
// //   navigate(`/calendar`)
      
//   }, [activites])

// const  deleteActivity=async(id)=>{
//     debugger
//     dispatch(deleteActivityThunk(id));
//    console.log("success");

// }
   

//    return  <div className='CustomerPage'>
//     <h1 className='myCustomers'>my activites</h1>
    

//         <table>
//             <thead>
//                 <tr>
//                <th>קוד פעילות</th>
//                <th>שם פעילות</th>
//                <th>מיקום</th>
//                <th>מחיר</th>
//                <th>תעריף לילה</th>
//                <th>אורך הפעילות</th>
//                <th>קוד מנהל </th>
//                <th></th>
//                <th></th>
            
//          </tr>   </thead>
//             <tbody>
//                 {activites?.length>0 && activites.map(c=> {return<tr key={c.activityid}>
//                 <td >{c.activityId}</td>
//                 <td>{c.activityDescription}</td>
//                 <td>{c.location?c.location:"המיקום לבחירתך"}</td>
//                 <td>{c.price}</td>
//                 <td>{c.nightPrice}</td>
//                 <td>{c.lenOfActivity}</td>
//                 <td>{c.managerId}</td>
                
                
                
//                 <td>
//                 {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.activityId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
//                 <IconButton onClick={()=>deleteActivity(c.id)} aria-label="delete" size='large' >
//                 <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
//                 </IconButton>
              
//                 </td>
//                 <td>
//                 {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.activityId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
//                 <IconButton onClick={()=>navigate(`editActivity/${c.id}`)} aria-label="edit" size='large' >
//                 <EditNoteOutlinedIcon htmlColor=' #3b3a3d'/>
//                 </IconButton>
//                 </td>
//                </tr>})}
//             </tbody>
//         </table>
//         <button className='button' onClick={()=>navigate('newActivity')}>add</button>

//         {/* {delt && <button onClick={()=>deleteCustomer(custId)}>delete</button>}
//         {edit && <button onClick={()=>navigate(`editCustomer/${custId}`)}>edit</button>} */}
//         {/* <Button variant='text'>nnnngf</Button> */}
//  <div>
//     <Outlet></Outlet>
//  </div>
//     </div>
// } 

//----------------------------------------------------------------------------------------------------------- 


import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';
// import { deleteCustomerThunk } from '../../store/slices/activities/deleteCustomerThunk';
// import { customersFetchThunk } from '../../store/slices/activities/customersFetch';
import './activites.css';

// Material UI
import {
  Box, Typography, Button, IconButton, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, TextField,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert, InputAdornment, Paper, Grid, Card, CardContent,
  Avatar, Chip, Menu, MenuItem, ListItemIcon, ListItemText, Checkbox,
  Divider, Tooltip, Collapse, CircularProgress, useMediaQuery, useTheme
} from '@mui/material';

import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  PeopleAlt as PeopleAltIcon,
  MonetizationOn as MonetizationOnIcon,
  LocationCity as LocationCityIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Download as DownloadIcon,
  TableChart as TableChartIcon,
//   PictureAsPdfIcon,
  Print as PrintIcon,
  SearchOff as SearchOffIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

// Charts
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// For exports
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable' 
import html2canvas from 'html2canvas';
import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';

export const Activities = () => {
 const refPdf=useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Redux state
  const activities = useSelector((state) => state.activity.activities || []);
  const isLoading = useSelector((state) => state.activity.isLoading);

  // Local state
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [advancedSearch, setAdvancedSearch] = useState({
    activityDescription: '',
    lenOfActivity: '',
    price: '',
    managerId: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [Loading, setLoading] = useState(false);
  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  // Fetch activities on component mount
  useEffect(() => {
    dispatch(activitiesFetch());
  }, [dispatch]);

  // Memoized filtered and sorted activities
  const processedActivities = useMemo(() => {
    if (!activities.length) return [];
 
    let result = [...activities];
 
    // Apply search
    if (searchTerm) {
      result = result.filter(activity =>
        (activity.activityDescription && activity.activityDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.lenOfActivity && activity.lenOfActivity.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.price && activity.price.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.managerId && activity.managerId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
 
    // Apply advanced search
    if (Object.values(advancedSearch).some(value => value !== '')) {
      if (advancedSearch.lenOfActivity) {
        result = result.filter(activity =>
          activity.lenOfActivity && activity.lenOfActivity.toLowerCase().includes(advancedSearch.lenOfActivity.toLowerCase())
        );
      }
   
      if (advancedSearch.managerId) {
        result = result.filter(activity =>
          activity.managerId && activity.managerId.toLowerCase().includes(advancedSearch.managerId.toLowerCase())
        );
      }
   
      if (advancedSearch.price) {
        result = result.filter(activity =>
          activity.price && activity.price.toLowerCase().includes(advancedSearch.price.toLowerCase())
        );
      }
   
      // if (advancedSearch.minAmount) {
      //   result = result.filter(activity =>
      //     activity.price >= parseFloat(advancedSearch.minAmount)
      //   );
      // }
    }
 
    // Apply filters
    if (activeFilters.includes('highAmount')) {
      result = result.filter(activity => activity.price >= 100);
    }
 
   //  if (activeFilters.includes('dueSoon')) {
   //    const oneMonthFromNow = new Date();
   //    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
   
   //    // result = result.filter(activity => {
   //    //   if (!activity.due) return false;
   //    //   const dueDate = new Date(activity.due);
   //    //   return dueDate <= oneMonthFromNow && dueDate >= new Date();
   //    // });
   //  }
 
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key]) return 1;
        if (!b[sortConfig.key]) return -1;
     
        const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
     
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
 
    return result;
  }, [activities, searchTerm, advancedSearch, activeFilters, sortConfig]);

  // Update filtered activities when processed activities change
  useEffect(() => {
    setFilteredActivities(processedActivities);
  }, [processedActivities]);

  // Chart data preparation
  const lenChartData = useMemo(() => {
    const lenCount = {};
 
    activities.forEach(activity => {
      if (activity.lenOfActivity) {
         lenCount[activity.lenOfActivity] = (priceCount[activity.lenOfActivity] || 0) + 1;
      }
    });
 
    // Convert to array and sort by count
    const lenData = Object.entries(lenCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
 
    // Take top 5 cities and group the rest as "אחר"
    if (lenData.length > 5) {
      const toplens = lenData.slice(0, 5);
      const otherCount = lenData.slice(5).reduce((sum, len) => sum + len.value, 0);
   
      return [...toplens, { name: 'אחר', value: otherCount }];
    }
 
    return priceData;
  }, [activities]);

  const amountChartData = useMemo(() => {
    const amountRanges = {
      '0-1000': 0,
      '1001-5000': 0,
      '5001-10000': 0,
      '10001+': 0
    };
 
    activities.forEach(activity => {
      const price = activity.pri || 0;
      if (price <= 1000) {
        amountRanges['0-1000']++;
      } else if (price <= 5000) {
        amountRanges['1001-5000']++;
      } else if (price <= 10000) {
        amountRanges['5001-10000']++;
      } else {
        amountRanges['10001+']++;
      }
    });
 
    return Object.entries(amountRanges).map(([name, value]) => ({ name, value }));
  }, [activities]);

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleMenuOpen = (event, activity) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(activity);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleEditClick = () => {
   //  navigate(`editCustomer/${selectedCustomer.activityId}`);
    handleMenuClose();
  };

  const handleViewDetails = () => {
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteActivityThunk({id:selectedActivity.activityId}));
      setOpenDeleteDialog(false);
      setSnackbar({
        open: true,
        message: 'לקוח נמחק בהצלחה',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'שגיאה במחיקת הלקוח',
        severity: 'error'
      });
    }
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilterToggle = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleExportMenuOpen = (event) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  const handleAdvancedSearch = () => {
    // The search is applied through the useMemo hook
    // This is just to close the advanced search panel if needed
    if (Object.values(advancedSearch).every(value => value === '')) {
      setShowAdvancedSearch(false);
    }
  };

  const handleClearAdvancedSearch = () => {
    setAdvancedSearch({
      lenOfActivity: '',
      managerId: '',
      price: '',
      managerId: ''
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
    handleClearAdvancedSearch();
    setSortConfig({ key: '', direction: '' });
    handleFilterMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRefresh = () => {
    dispatch(activitiesFetch())
      .then(() => {
        setSnackbar({
          open: true,
          message: 'רשימת הלקוחות עודכנה בהצלחה',
          severity: 'success'
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: `שגיאה בטעינת הלקוחות: ${error.message}`,
          severity: 'error'
        });
      });
  };

  // Export functions
  const exportToExcel = () => {
    // Create worksheet from filtered activities
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers.map(activity => ({
      'קוד': activity.activityId,
      'קוד עסק ': activity.managerId,
      'תיאור': activity.activityDescription || '',
      'מיקום': activity.location || '',
      'אורך הפעילות': activity.lenOfActivity || '',
      ' מחיר': activity.price || '',
      ' תעריף לילה': activity.nightPrice || '',
      
    })));
 
    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'פעילויות');
 
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'רשימת פעילויות.xlsx');
 
    // Show success message
    setSnackbar({
      open: true,
      message: 'הקובץ יוצא בהצלחה',
      severity: 'success'
    });
 
    handleExportMenuClose();
  };

 //  const exportToPDF = () => {
 //    const doc = new jsPDF('landscape');
 
 //    // Add title
 //    doc.setFont('Helvetica', 'bold');
 //    doc.setFontSize(18);
 //    doc.text('רשימת לקוחות', doc.internal.pageSize.width / 2, 20, { align: 'center' });
 
 //    // Add date
 //    doc.setFont('Helvetica', 'normal');
 //    doc.setFontSize(12);
 //    doc.text(`תאריך הפקה: ${new Date().toLocaleDateString('he-IL')}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
 
 //    // Create table data
 //    const tableColumn = ['מזהה', 'שם מוסד', 'איש קשר', 'טלפון', 'עיר', 'סכום', 'תאריך תשלום'];
 //    const tableRows = filteredCustomers.map(activity => [
 //      activity.activityId,
 //      activity.activityDescription,
 //      activity.lenOfActivity || '',
 //      activity.mobile || '',
 //      activity.managerId || '',
 //      `₪${activity.price?.toLocaleString() || 0}`,
 //      `₪${activity.due?.toLocaleString() || 0}`
 //      //activity.due ? //new Date(activity.due).toLocaleDateString('he-IL') : ''
 //    ]);
 // console.log(tableRows);
 //   //  Generate table
 //   //  doc.autoTable({
 //   //    head: [tableColumn],
 //   //    body: tableRows,
 //   //    startY: 40,
 //   //    styles: { font: 'Helvetica', halign: 'right' },
 //   //    headStyles: { fillColor: [123, 31, 162], textColor: 255 },
 //   //    alternateRowStyles: { fillColor: [245, 247, 250] },
 //   //    margin: { top: 40 }
 //   //  });
 
 //    // Save PDF
 //    doc.save('רשימת_לקוחות.pdf');
 
 //    // Show success message
 //    setSnackbar({
 //      open: true,
 //      message: 'הקובץ יוצא בהצלחה',
 //      severity: 'success'
 //    });
 
 //    handleExportMenuClose();
 //  };
 
//  const exportToPDF = async () => {
//    // if (!achivments || !achivments.completeMark) return;
   
//    const content = refPdf.current;
//    console.log(content);
//    if (!content) return;

//    try {
//       setLoading(true);

//      const canvas = await html2canvas(content, {
//        scale: 2, // איכות גבוהה יותר
//        useCORS: true,
//        logging: false,
//        backgroundColor: '#ffffff'
//      });

//      // const imgData = canvas.toDataURL('image/png');

//      // יצירת PDF בגודל A4
//      const pdf = new jsPDF({
//        orientation: 'portrait',
//        unit: 'mm',
//        format: 'a4',
//      });

//      const imgWidth = 210; // רוחב דף A4 במ"מ
//      const imgHeight = (canvas.height * imgWidth) / canvas.width;

//      // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

//      // שמירת הקובץ
//      pdf.save(`רשימת_לקוחות.pdf`);
//    } catch (error) {
//      console.error('Error exporting to PDF:', error);
//    } finally {
//       setLoading(false);
//    }
//  };

  const handleExport = (type) => {
    switch (type) {
      case 'excel':
        exportToExcel();
        break;
      case 'pdf':
        //exportToPDF();
        break;
      case 'print':
        window.print();
        handleExportMenuClose();
        break;
      default:
        break;
    }
  };
 
  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
    return (
      <text 
        x={x} 
        y={y} 
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12 }}
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };
 
  // Render loading state
  if (isLoading) {
    return (
      <Box className="loading-container">
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>טוען נתוני פעילויות...</Typography>
      </Box>
    );
  }
 
  return (
    <Box className="activities-dashboard">
      {/* Dashboard Header */}
      <Box className="dashboard-header">
        <Typography variant="h4" className="page-title">
          <PeopleAltIcon className="header-icon" />
          ניהול פעילויות
        </Typography>
        
        <Box className="header-actions">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('newCustomer')}
            className="add-activity-button"
          >
            הוסף לקוח
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            className="refresh-button"
          >
            רענן
          </Button>
        </Box>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} className="stats-container">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card total-activities">
            <CardContent>
              <Box className="stat-icon-container">
                <Avatar className="stat-icon">
                  <PeopleAltIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" component="div">
                {activities.length}
              </Typography>
              <Typography color="text.secondary">
                סה"כ פעילויות
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card total-price">
            <CardContent>
              <Box className="stat-icon-container">
                <Avatar className="stat-icon">
                  <MonetizationOnIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" component="div">
                ₪{activities.reduce((sum, activity) => sum + (activity.price || 0), 0).toLocaleString()}
              </Typography>
              <Typography color="text.secondary">
                סה"כ הכנסות
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card cities">
            <CardContent>
              <Box className="stat-icon-container">
                <Avatar className="stat-icon">
                  <LocationCityIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" component="div">
                {new Set(activities.filter(c => c.activityDescription).map(c => c.activityDescription)).size}
              </Typography>
              <Typography color="text.secondary">
                פעילויות
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card emails">
            <CardContent>
              <Box className="stat-icon-container">
                <Avatar className="stat-icon">
                  <EmailIcon />
                </Avatar>
              </Box>
              <Typography variant="h5" component="div">
                {activities.filter(c => c.price && c.price.includes('@')).length}
              </Typography>
              <Typography color="text.secondary">
                אימיילים פעילים
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
      
      {/* Charts Section */}
      <Box className="charts-section">
        <Button
          variant="text"
          className="toggle-charts-button"
          onClick={() => setShowCharts(!showCharts)}
          startIcon={showCharts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {showCharts ? 'הסתר גרפים' : 'הצג גרפים'}
        </Button>
        
        <Collapse in={showCharts}>
          <Grid container spacing={3} className="charts-container">
            <Grid item xs={12} md={6}>
              <Paper className="chart-paper" elevation={3}>
                <Typography variant="h6" className="chart-title">התפלגות פעילויות לפי אורך פעילות</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={priceChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                    >
                      {cityChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip formatter={(value, name) => [`${value} לקוחות`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper className="chart-paper" elevation={3}>
                <Typography variant="h6" className="chart-title">התפלגות פעילויות לפי סכום</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={amountChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value} לקוחות`]} />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#8884d8"
                      name="מספר לקוחות"
                    >
                      {amountChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      </Box>
      
      {/* Search and Filter Section */}
      <Box className="search-filter-container">
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <TextField
              className="search-field"
              placeholder="חיפוש לקוחות..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              startIcon={showAdvancedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {showAdvancedSearch ? 'הסתר חיפוש מתקדם' : 'חיפוש מתקדם'}
            </Button>
          </Box>
          
          {/* Advanced Search Container */}
          <Collapse in={showAdvancedSearch}>
            <Paper className="advanced-search-container" elevation={2}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    className="advanced-search-field"
                    label="שם איש קשר"
                    variant="outlined"
                    size="small"
                    value={advancedSearch.lenOfActivity || ''}
                    onChange={(e) => setAdvancedSearch({ ...advancedSearch, lenOfActivity: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    className="advanced-search-field"
                    label="עיר"
                    variant="outlined"
                    size="small"
                    value={advancedSearch.managerId || ''}
                    onChange={(e) => setAdvancedSearch({ ...advancedSearch, managerId: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    className="advanced-search-field"
                    label="אימייל"
                    variant="outlined"
                    size="small"
                    value={advancedSearch.price || ''}
                    onChange={(e) => setAdvancedSearch({ ...advancedSearch, price: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    className="advanced-search-field"
                    label="סכום מינימלי"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={advancedSearch.minAmount || ''}
                    onChange={(e) => setAdvancedSearch({ ...advancedSearch, minAmount: e.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAdvancedSearch}
                      className="advanced-search-button"
                      size="small"
                    >
                      חפש
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClearAdvancedSearch}
                      size="small"
                    >
                      נקה
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Box>
        
        <Box className="filter-actions">
          {activeFilters.length > 0 && (
            <Box className="active-filters">
              {activeFilters.includes('highAmount') && (
                <Chip
                  label="סכום גבוה"
                  onDelete={() => handleFilterToggle('highAmount')}
                  className="filter-chip"
                  size="small"
                />
              )}
              {activeFilters.includes('dueSoon') && (
                <Chip
                  label="תשלום קרוב"
                  onDelete={() => handleFilterToggle('dueSoon')}
                  className="filter-chip"
                  size="small"
                />
              )}
            </Box>
          )}
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterMenuOpen}
            className="filter-button"
            size="small"
          >
            סינון
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportMenuOpen}
            className="export-button"
            size="small"
          >
            ייצוא
          </Button>
        </Box>
      </Box>
     
     {/* Table Section */}
     <Paper className="table-container" ref={refPdf} elevation={3}>
       <TableContainer>
         <Table stickyHeader aria-label="sticky table" className="activities-table">
           <TableHead>
             <TableRow>
               <TableCell className="table-header-cell" onClick={() => handleSort('activityId')}>
                 מזהה
                 {sortConfig.key === 'activityId' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               <TableCell className="table-header-cell" onClick={() => handleSort('activityDescription')}>
                 שם מוסד
                 {sortConfig.key === 'activityDescription' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               {!isMobile && (
                 <>
                   <TableCell className="table-header-cell">פקס</TableCell>
                   <TableCell className="table-header-cell">טלפון</TableCell>
                 </>
               )}
               <TableCell className="table-header-cell" onClick={() => handleSort('price')}>
                 אימייל
                 {sortConfig.key === 'price' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               <TableCell className="table-header-cell" onClick={() => handleSort('lenOfActivity')}>
                 איש קשר
                 {sortConfig.key === 'lenOfActivity' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               {!isMobile && (
                 <TableCell className="table-header-cell">טלפון איש קשר</TableCell>
               )}
               <TableCell className="table-header-cell" onClick={() => handleSort('managerId')}>
                 עיר
                 {sortConfig.key === 'managerId' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               {!isMobile && (
                 <TableCell className="table-header-cell">קהילה</TableCell>
               )}
               <TableCell className="table-header-cell" onClick={() => handleSort('price')}>
                 סכום
                 {sortConfig.key === 'price' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               <TableCell className="table-header-cell" onClick={() => handleSort('due')}>
                 תאריך תשלום
                 {sortConfig.key === 'due' && (
                   <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                 )}
               </TableCell>
               <TableCell className="table-header-cell">פעולות</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {filteredCustomers.length > 0 ? (
               filteredCustomers
                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map((activity) => (
                   <TableRow
                     hover
                     key={activity.activityId}
                     className="table-row"
                   >
                     <TableCell className="table-cell">{activity.activityId}</TableCell>
                     <TableCell className="table-cell name-cell">{activity.activityDescription}</TableCell>
                     {!isMobile && (
                       <>
                         <TableCell className="table-cell">{activity.fax || "-"}</TableCell>
                         <TableCell className="table-cell">{activity.mobile || "-"}</TableCell>
                       </>
                     )}
                     <TableCell className="table-cell">
                       {activity.price ? (
                         <Tooltip title="שלח אימייל">
                           <a href={`mailto:${activity.price}`} className="price-link">
                             {activity.price}
                           </a>
                         </Tooltip>
                       ) : (
                         "-"
                       )}
                     </TableCell>
                     <TableCell className="table-cell">{activity.lenOfActivity || "-"}</TableCell>
                     {!isMobile && (
                       <TableCell className="table-cell">
                         {activity.contactPhone ? (
                           <Tooltip title="התקשר">
                             <a href={`tel:${activity.contactPhone}`} className="phone-link">
                               {activity.contactPhone}
                             </a>
                           </Tooltip>
                         ) : (
                           "-"
                         )}
                       </TableCell>
                     )}
                     <TableCell className="table-cell">{activity.managerId || "-"}</TableCell>
                     {!isMobile && (
                       <TableCell className="table-cell">{activity.community || "-"}</TableCell>
                     )}
                     <TableCell className="table-cell price-cell">
                       ₪{(activity.price || 0).toLocaleString()}
                     </TableCell>
                     <TableCell className="table-cell">
                       {activity.due ? (
                         <Chip
                           label={new Date(activity.due).toLocaleDateString('he-IL')}
                           color={new Date(activity.due) < new Date() ? "error" : "default"}
                           size="small"
                         />
                       ) : (
                         "-"
                       )}
                     </TableCell>
                     <TableCell className="table-cell">
                       {isMobile ? (
                         <IconButton
                           size="small"
                           onClick={(event) => handleMenuOpen(event, activity)}
                         >
                           <MoreVertIcon />
                         </IconButton>
                       ) : (
                         <Box className="action-buttons">
                           <Tooltip title="עריכה">
                             <IconButton
                               size="small"
                               onClick={() => navigate(`editCustomer/${activity.activityId}`)}
                             >
                               <EditIcon />
                             </IconButton>
                           </Tooltip>
                           <Tooltip title="מחיקה">
                             <IconButton
                               size="small"
                               onClick={() => {
                                 setSelectedCustomer(activity);
                                 setOpenDeleteDialog(true);
                               }}
                             >
                               <DeleteIcon />
                             </IconButton>
                           </Tooltip>
                           <Tooltip title="צפייה בפרטים">
                             <IconButton
                               size="small"
                               onClick={() => {
                                 setSelectedCustomer(activity);
                                 setOpenDetailsDialog(true);
                               }}
                             >
                               <VisibilityIcon />
                             </IconButton>
                           </Tooltip>
                         </Box>
                       )}
                     </TableCell>
                   </TableRow>
                 ))
             ) : (
               <TableRow>
                 <TableCell colSpan={isMobile ? 7 : 12} className="empty-state">
                   <Box className="empty-state">
                     <SearchOffIcon className="empty-state-icon" />
                     <Typography variant="h6" className="empty-state-text">
                       לא נמצאו לקוחות התואמים את החיפוש
                     </Typography>
                     <Button
                       variant="outlined"
                       color="primary"
                       startIcon={<RefreshIcon />}
                       onClick={handleClearFilters}
                       sx={{ mt: 2 }}
                     >
                       נקה סינון
                     </Button>
                   </Box>
                 </TableCell>
               </TableRow>
             )}
           </TableBody>
         </Table>
       </TableContainer>
       
       <TablePagination
         rowsPerPageOptions={[10, 25, 50, 100]}
         component="div"
         count={filteredCustomers.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
         labelRowsPerPage="שורות בעמוד:"
         labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
         className="table-pagination"
       />
     </Paper>
     
     {/* Filter Menu */}
     <Menu
       anchorEl={filterMenuAnchor}
       open={Boolean(filterMenuAnchor)}
       onClose={handleFilterMenuClose}
       className="filter-menu"
     >
       <MenuItem onClick={() => handleFilterToggle('highAmount')} className="filter-menu-item">
         <Checkbox
           checked={activeFilters.includes('highAmount')}
           color="primary"
           size="small"
         />
         <ListItemText primary="סכום גבוה (מעל 5,000 ₪)" />
       </MenuItem>
       <MenuItem onClick={() => handleFilterToggle('dueSoon')} className="filter-menu-item">
         <Checkbox
           checked={activeFilters.includes('dueSoon')}
           color="primary"
           size="small"
         />
         <ListItemText primary="תשלום בחודש הקרוב" />
       </MenuItem>
       <Divider />
       <MenuItem onClick={handleClearFilters} className="filter-menu-item">
         <ListItemIcon>
           <RefreshIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText primary="נקה סינון" />
       </MenuItem>
     </Menu>
     
     {/* Export Menu */}
     <Menu
       anchorEl={exportMenuAnchor}
       open={Boolean(exportMenuAnchor)}
       onClose={handleExportMenuClose}
       className="export-menu"
     >
       <MenuItem onClick={() => handleExport('excel')} className="export-menu-item">
         <ListItemIcon>
           <TableChartIcon fontSize="small" style={{ color: '#1F7244' }} />
         </ListItemIcon>
         <ListItemText primary="ייצוא ל-Excel" />
       </MenuItem>
       <MenuItem onClick={() => handleExport('pdf')} className="export-menu-item">
         {/* <ListItemIcon> */}
           {/* <PictureAsPdfIcon fontSize="small" style={{ color: '#F40F02' }} /> */}
         {/* </ListItemIcon> */}
         <ListItemText primary="ייצוא ל-PDF" />
       </MenuItem>
       <MenuItem onClick={() => handleExport('print')} className="export-menu-item">
         <ListItemIcon>
           <PrintIcon fontSize="small" style={{ color: '#424242' }} />
         </ListItemIcon>
         <ListItemText primary="הדפסה" />
       </MenuItem>
     </Menu>
     
     {/* Action Menu for Mobile */}
     <Menu
       anchorEl={anchorEl}
       open={Boolean(anchorEl)}
       onClose={handleMenuClose}
     >
       <MenuItem onClick={handleEditClick}>
         <ListItemIcon>
           <EditIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText primary="עריכה" />
       </MenuItem>
       <MenuItem onClick={handleDeleteClick}>
         <ListItemIcon>
           <DeleteIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText primary="מחיקה" />
       </MenuItem>
       <MenuItem onClick={handleViewDetails}>
         <ListItemIcon>
           <VisibilityIcon fontSize="small" />
         </ListItemIcon>
         <ListItemText primary="צפייה בפרטים" />
       </MenuItem>
     </Menu>
     
     {/* Activity Details Dialog */}
     <Dialog
       open={openDetailsDialog}
       onClose={() => setOpenDetailsDialog(false)}
       maxWidth="md"
       fullWidth
     >
       <DialogTitle>
         פרטי לקוח: {selectedCustomer?.activityDescription}
         <IconButton
           aria-label="close"
           onClick={() => setOpenDetailsDialog(false)}
           sx={{ position: 'absolute', right: 8, top: 8 }}
         >
           <CloseIcon />
         </IconButton>
       </DialogTitle>
       <DialogContent dividers>
         {selectedCustomer && (
           <Grid container spacing={2}>
             <Grid item xs={12} md={6}>
               <Typography variant="subtitle2" color="textSecondary">מזהה</Typography>
               <Typography variant="body1" gutterBottom>{selectedCustomer.activityId}</Typography>
               
               <Typography variant="subtitle2" color="textSecondary">שם מוסד</Typography>
               <Typography variant="body1" gutterBottom>{selectedCustomer.activityDescription}</Typography>
               
               <Typography variant="subtitle2" color="textSecondary">אימייל</Typography>
               <Typography variant="body1" gutterBottom>
                 {selectedCustomer.price || "-"}
               </Typography>
               
               <Typography variant="subtitle2" color="textSecondary">טלפון</Typography>
               <Typography variant="body1" gutterBottom>
                 {selectedCustomer.mobile || "-"}
               </Typography>
               
               <Typography variant="subtitle2" color="textSecondary">פקס</Typography>
               <Typography variant="body1" gutterBottom>
                 {selectedCustomer.fax || "-"}
               </Typography>
             </Grid>
             
             <Grid item xs={12} md={6}>
               <Typography variant="subtitle2" color="textSecondary">איש קשר</Typography>
               <Typography variant="body1" gutterBottom>{selectedCustomer.lenOfActivity || "-"}</Typography>
               
               <Typography variant="subtitle2" color="textSecondary">טלפון איש קשר</Typography>
               <Typography variant="body1" gutterBottom>
                 {selectedCustomer.contactPhone || "-"}
               </Typography>
               
               <Typography variant="subtitle2" color="textSecondary">עיר</Typography>
               <Typography variant="body1" gutterBottom>{selectedCustomer.managerId || "-"}</Typography>
               
               <Typography variant="subtitle2" color="textSecondary">קהילה</Typography>
               <Typography variant="body1" gutterBottom>{selectedCustomer.community || "-"}</Typography>
               
               <Typography variant="subtitle2" color="textSecondary">סכום</Typography>
               <Typography variant="body1" gutterBottom color="primary" fontWeight="bold">
                 ₪{(selectedCustomer.price || 0).toLocaleString()}
               </Typography>
               
               <Typography variant="subtitle2" color="textSecondary">תאריך תשלום</Typography>
               <Typography variant="body1" gutterBottom>
                 {selectedCustomer.due ? new Date(selectedCustomer.due).toLocaleDateString('he-IL') : "-"}
               </Typography>
             </Grid>
           </Grid>
         )}
       </DialogContent>
       <DialogActions>
         <Button onClick={() => navigate(`editCustomer/${selectedCustomer.activityId}`)} color="primary">
           עריכה
         </Button>
         <Button onClick={() => setOpenDetailsDialog(false)} color="primary">
           סגור
         </Button>
       </DialogActions>
     </Dialog>
     
     {/* Delete Confirmation Dialog */}
     <Dialog
       open={openDeleteDialog}
       onClose={() => setOpenDeleteDialog(false)}
     >
       <DialogTitle>אישור מחיקת לקוח</DialogTitle>
       <DialogContent>
         <DialogContentText>
           האם אתה בטוח שברצונך למחוק את הלקוח "{selectedCustomer?.activityDescription}"?
           פעולה זו אינה ניתנת לביטול.
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
           ביטול
         </Button>
         <Button onClick={handleDeleteConfirm} color="error" autoFocus>
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
       <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
         {snackbar.message}
       </Alert>
     </Snackbar>
     
     {/* Outlet for nested routes */}
     <Outlet />
    </Box>
  );
};