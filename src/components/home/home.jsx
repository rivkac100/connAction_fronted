import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './home.css'
import { Button, Stack } from '@mui/material';
//import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
//import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export const Home = () => {

  const navigate = useNavigate();
  const dispatch=useDispatch()
  const event =useSelector(state=>state.events.events);
  const params = useParams();
  const id = params.id;

  useEffect(()=>{
  dispatch(eventFetchThunk())
  },[])


  return <div>
    {/* <button type="text" >להזמנה</button>
<button type="text" onClick={()=>navigate(`/myOrders/${id}`)}>הסטורית הזמנות</button>
<button type="text">.........עלינו</button>
<button type="text">להזמנות הקרובות שלך</button>
<button type="text">יומן </button> */}
    <Stack direction="row" spacing={5}>
      <Button variant="contained" className='button' onClick={()=>navigate(`newOrder`)} endIcon={<ListAltIcon />}>
        להזמנה
      </Button>
      <Button variant="contained" className='button'  endIcon={<WorkHistoryIcon />} onClick={() => navigate(`myOrders`)}>
        הסטורית הזמנות
      </Button>
      <Button variant="contained" className='button' endIcon={<HowToRegIcon />}>
        .....עלינו
      </Button>
      <Button variant="contained" className='button' endIcon={<EditCalendarIcon />} onClick={() => navigate(`month`)}>
        יומן
      </Button>
      <Button variant="contained" className='button' endIcon={<HourglassBottomIcon />}>
        להזמנות הקרובות שלך
      </Button>
    </Stack>
    <div><Outlet></Outlet></div>
  </div>
}