function Home() {
  return (
    <>
      <div className="vh-100 container-fluid bg-light">
        <br/>
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
              <img src="logo.png" class="d-block w-100" data-bs-interval="100" alt="..."/>
              </div>
              <div class="carousel-item">
              <img src="footer.png" class="d-block w-100" data-bs-interval="100" alt="..."/>
              </div>
              <div class="carousel-item">
              <img src="pngegg.png" class="d-block w-100" data-bs-interval="100" alt="..."/>
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
        <br/>
        <h1 className="text-center">Rentel services</h1>
      </div>
    </>
  );
}
export default Home;

