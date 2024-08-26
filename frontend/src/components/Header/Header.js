import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("userid", 0);
    navigate('/');
  }

  return (<>
    <div className="my-3 py-3"></div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0 m-0 fixed-top">
      <div className="container-fluid m-0">
        <p className="navbar-brand" onClick={() => navigate('/')}> <img src="image/jcb.png" alt="...." height={60} className="" /> <span> FleetMaster</span></p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav gap-3 w-100 d-flex justify-content-end">
            <li className="nav-item">
              <p className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Home</p>
            </li>
            <li className="nav-item">
              <p className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/about')}>About</p>
            </li>
            <li className="nav-item">
              <p className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/contact')}>Contact</p>
            </li>
            <li className="nav-item">
              {(localStorage.getItem("userid") * 1 === 0) ?
                <p className="nav-link text-info" style={{ cursor: "pointer" }} onClick={() => navigate('/signin')}>Login/Signup</p>
                : <p className="nav-link text-info" style={{ cursor: "pointer" }} onClick={() => { logout() }}>LogOut</p>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}

export default Header;