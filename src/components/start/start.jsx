import { useNavigate } from "react-router-dom";
import './start.css'
import { Button } from "@mui/material";

export const Start = () => {

    const navigate = useNavigate();

    return <div style={{
        display: "flex",
        flexDirection: "row",
        height:"100vh",
        background:"#3b3a3d",
        alignItems: "center"
    }}>


        <div style={{
            width: "30%",
            margin: "5%",
            display: "flex",
            flexDirection: "column"
        }}>
            <Button variant="contained" style={{ width: "80%", marginTop: "5%" /*,boxShadow: "0 8px 20px #9b9595"border:"white solid 2px"*/}} className='strt_bt' onClick={() => navigate(`/home`)}>
                לכניסה
            </Button>
            <br />
            <Button variant="contained" style={{ width: "80%", marginTop: "5%"/*,boxShadow: "0 8px 20px #9b9595"border:"white solid 2px"*/ ,borderRadius:"15px "}
        } className='strt_bt ' onClick={() => navigate(`/login`)}>
                מנהל?
            </Button>
        </div>
        <div style={{
            width: "50%",
            margin: "5%"

        }} >
            <img className='img' style={{ width: "100%", border: "none", borderRadius: "15px" ,boxShadow: "0 8px 20px #9b9595"}} src={process.env.PUBLIC_URL + "/start.jpg"} alt="" />
        </div>

    </div>
}