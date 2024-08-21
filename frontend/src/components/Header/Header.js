function Header() {
  return (<>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0 m-0">
      <div className="container-fluid m-0">
        <a className="navbar-brand" href=""> <img src="logo.png" alt="...." height={60} className="" /> <span> FleetMaster</span></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav gap-3 w-100 d-flex justify-content-end">
            <li className="nav-item">
              <a className="nav-link text-light " href="javascript:void(0)">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light " href="javascript:void(0)">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light " href="javascript:void(0)">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-info" href="javascript:void(0)">Login/Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>);
}

export default Header;