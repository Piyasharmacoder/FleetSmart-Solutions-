import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("userid", 0);
    localStorage.removeItem("token");
    navigate('/');
  }

  return (<>
    <div className="my-3 py-3"></div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0 m-0 d-flex justify-content-center fixed-top">
      <div className="container m-0">
        <p className="navbar-brand m-0 p-0" onClick={() => navigate('/')}> <img src="image/jcb.png" alt="...." height={60} className="m-0 p-0" /> <span> FleetMaster</span></p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav gap-4 w-100 d-flex justify-content-end ">
            <li className="nav-item">
              <span className="nav-link text-light" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/about')}>About</span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/contact')}>Contact</span>
            </li>
            <li className="nav-item">
              {(localStorage.getItem("userid") * 1 === 0) ?
                  <div className="dropdown m-0 p-0">
                    <button className="btn btn-success dropdown-toggle" type="button" id="dropdownmenu" data-bs-toggle="dropdown" aria-expanded="false">
                      LogIn
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownmenu">
                      <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate('/signin',{state:"user"})}>User</span>
                      <hr className="dropdown-divider"/>
                      <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => navigate('/signin',{state:"vendor"})}>Vendor</span>
                    </div>
                  </div>
                : <span className="nav-link text-info" style={{ cursor: "pointer" }} onClick={() => { logout() }}>LogOut</span>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}

export default Header;