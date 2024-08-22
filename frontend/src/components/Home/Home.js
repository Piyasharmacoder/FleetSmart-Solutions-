function Home() {
  return (
    <>
      <div className="container-fluid bg-light">
        <br />
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="logo.png" class="d-block w-100" data-bs-interval="100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="footer.png" class="d-block w-100" data-bs-interval="100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="pngegg.png" class="d-block w-100" data-bs-interval="100" alt="..." />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <br />
        <h1 className="text-center">Rentel services</h1>
        <div class="w-100 d-flex justify-content-around">
          <div class="dropdown dropend">
            <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Link 1</a></li>
              <li><a class="dropdown-item" href="#">Link 2</a></li>
              <li><a class="dropdown-item" href="#">Link 3</a></li>
            </ul>
          </div>
          <form class="d-flex w-25 border border-dark rounded-pill">
            <input class="form-control border-0 rounded-pill" type="text" placeholder="Search heare" />
            <button class="btn btn-primary  rounded-pill" type="button">Search</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Home;

