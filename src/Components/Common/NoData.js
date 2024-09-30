import { Navbar } from "react-bootstrap";

const NoData = () => {
    const styles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "24px",
      color: "#fff",
      backgroundColor: "#000",
      textAlign: "center"
    };
  
    return( 
        <>
    <Navbar/>
    <div style={styles}>No Data Available</div>
    </>
 )};
  
  export default NoData;
  