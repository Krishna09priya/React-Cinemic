// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Assets/Style Sheets/Pagination.css";
// import { NavLink} from "react-router-dom";

// function Pagination() {

//   return (
//     <div className="pagination-container">
//     <nav aria-label="Page navigation">
//       <ul className="pagination justify-content-center">
//         <li className="page-item">
//           <NavLink Name="page-link" to="#" aria-label="Previous">
//             <span aria-hidden="true">«</span>
//           </NavLink>
//         </li>
//         <li className="page-item">
//           <NavLink className="page-link" to="#">
//             1
//           </NavLink>
//         </li>
//         <li className="page-item">
//           <NavLink className="page-link" to="#">
//             2
//           </NavLink>
//         </li>
//         <li className="page-item">
//           <NavLink className="page-link" to="#">
//             3
//           </NavLink>
//         </li>
//         <li className="page-item">
//           <NavLink className="page-link" to="#" aria-label="Next">
//             <span aria-hidden="true">»</span>
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   </div> 
//   );
// }

// export default Pagination;
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Helper function to render page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(i)} 
            disabled={i === currentPage} // Disable current page button
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {/* Previous Page Button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">«</span>
            </button>
          </li>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Page Button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">»</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

