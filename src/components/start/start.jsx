import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Start=()=>{

    const navigate = useNavigate();

  return <div>
  
  
  <div style={{width:"30%"}}>
    <Button variant="contained" className='button' onClick={()=>navigate(`newOrder`)}>
        לכניסה
      </Button>
      <Button variant="contained" className='button'   onClick={() => navigate(`myOrders`)}>
       מנהל?
      </Button>
   </div>
   <div style={{width:"30%"}} >
   <img className='img' style={{width:"100%"}} src={process.env.PUBLIC_URL + "/start.jpg"} alt="" />
   </div>

  </div>  
}