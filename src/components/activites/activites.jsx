
// import { useEffect, useState} from 'react';
// // import './style.css'
// import { useDispatch, useSelector } from "react-redux";
// // import { searchEventThunk } from '../store/slices/searchEventThunk'
// import { Outlet, useNavigate } from 'react-router-dom';


// import '@emotion/styled'
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
//   const activites= useSelector(state=>state.activity.activites)
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
    
//    // if(activites.length>0)
         
//   // navigate(`/calendar`)
      
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
//                <th></th>
//                <th></th>
            
//          </tr>   </thead>
//             <tbody>
//                 {activites.length>0 && activites.map(c=> {return<tr className={c.id===mngId} onClick={() => {setMngId(c.id);setDelt(true);setEdit(true)}} key={c.id}>
//                 <td >{c.activityId}</td>
//                 <td>{c.activityDescription}</td>
//                 <td>{c.location?c.location:"המיקום לבחירתך"}</td>
//                 <td>{c.price}</td>
//                 <td>{c.nightPrice}</td>
//                 <td>{c.lenOfActivity}</td>
                
                
                
//                 <td>
//                 {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.instituteId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
//                 <IconButton onClick={()=>deleteActivity(c.id)} aria-label="delete" size='large' >
//                 <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
//                 </IconButton>
              
//                 </td>
//                 <td>
//                 {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.instituteId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Tooltip from '@mui/material/Tooltip';
import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';
import { motion, AnimatePresence } from 'framer-motion';
import './activites.css';

export const Activities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activity.activites);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  useEffect(() => {
    setIsLoading(true);
    dispatch(activitiesFetch())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  const deleteActivity = async (id, event) => {
    event.stopPropagation();
    
    if (window.confirm('האם אתה בטוח שברצונך למחוק פעילות זו?')) {
      dispatch(deleteActivityThunk(id));
    }
  };

  const handleEditClick = (id, event) => {
    event.stopPropagation();
    navigate(`editActivity/${id}`);
  };

  const filteredActivities = activities.filter(activity => 
    activity.activityDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activity.location && activity.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="activities-container">
      <div className="activities-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          הפעילויות שלי
        </motion.h1>
        
        <div className="activities-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="חיפוש פעילות..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button 
              className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
          
          <motion.button 
            className="add-activity-button"
            onClick={() => navigate('newActivity')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AddCircleOutlineIcon /> הוספת פעילות
          </motion.button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>טוען פעילויות...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="empty-state">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="empty-content"
          >
            <img src="/empty-activities.svg" alt="אין פעילויות" />
            <h2>אין פעילויות להצגה</h2>
            <p>התחל ליצור פעילויות חדשות כדי לראות אותן כאן</p>
            <motion.button 
              className="add-activity-button"
              onClick={() => navigate('newActivity')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AddCircleOutlineIcon /> הוספת פעילות ראשונה
            </motion.button>
          </motion.div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="activities-grid">
          <AnimatePresence>
            {filteredActivities.map(activity => (
              <motion.div 
                key={activity.id}
                layoutId={`activity-${activity.id}`}
                className={`activity-card ${selectedId === activity.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(selectedId === activity.id ? null : activity.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="activity-header">
                  <h3>{activity.activityDescription}</h3>
                  <span className="activity-id">#{activity.activityId}</span>
                </div>
                
                <div className="activity-details">
                  <div className="detail-item">
                    <LocationOnIcon />
                    <span>{activity.location || "המיקום לבחירתך"}</span>
                  </div>
                  
                  <div className="detail-item">
                    <AttachMoneyIcon />
                    <span>{activity.price} ₪</span>
                  </div>
                  
                  <div className="detail-item">
                    <NightsStayIcon />
                    <span>{activity.nightPrice} ₪</span>
                  </div>
                  
                  <div className="detail-item">
                    <AccessTimeIcon />
                    <span>{activity.lenOfActivity} שעות</span>
                  </div>
                </div>
                
                <div className="activity-actions">
                  <Tooltip title="ערוך פעילות">
                    <IconButton 
                      onClick={(e) => handleEditClick(activity.id, e)} 
                      className="edit-button"
                    >
                      <EditNoteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="מחק פעילות">
                    <IconButton 
                      onClick={(e) => deleteActivity(activity.id, e)} 
                      className="delete-button"
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="activities-table-container">
          <table className="activities-table">
            <thead>
              <tr>
                <th>קוד פעילות</th>
                <th>שם פעילות</th>
                <th>מיקום</th>
                <th>מחיר</th>
                <th>תעריף לילה</th>
                <th>אורך הפעילות</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredActivities.map(activity => (
                  <motion.tr 
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={selectedId === activity.id ? 'selected-row' : ''}
                    onClick={() => setSelectedId(selectedId === activity.id ? null : activity.id)}
                  >
                    <td>{activity.activityId}</td>
                    <td>{activity.activityDescription}</td>
                    <td>{activity.location || "המיקום לבחירתך"}</td>
                    <td>{activity.price} ₪</td>
                    <td>{activity.nightPrice} ₪</td>
                    <td>{activity.lenOfActivity} שעות</td>
                    <td>
                      <div className="table-actions">
                        <Tooltip title="ערוך פעילות">
                          <IconButton 
                            onClick={(e) => handleEditClick(activity.id, e)} 
                            size="small"
                            className="edit-button"
                          >
                            <EditNoteOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="מחק פעילות">
                          <IconButton 
                            onClick={(e) => deleteActivity(activity.id, e)} 
                            size="small"
                            className="delete-button"
                          >
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
      
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};
