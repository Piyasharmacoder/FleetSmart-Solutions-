import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (<>
    <div className="my-3 py-3"></div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0 m-0 fixed-top">
      <div className="container-fluid m-0">
        <a className="navbar-brand" onClick={() => navigate('/')}> <img src="logo.png" alt="...." height={60} className="" /> <span> FleetMaster</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav gap-3 w-100 d-flex justify-content-end">
            <li className="nav-item">
              <a className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/about')}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light " style={{ cursor: "pointer" }} onClick={() => navigate('/contact')}>Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-info" style={{ cursor: "pointer" }} onClick={() => navigate('/signup')}>Login/Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}

export default Header;