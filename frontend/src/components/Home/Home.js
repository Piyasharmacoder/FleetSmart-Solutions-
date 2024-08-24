import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const [index, setIndex] = useState(0);
 
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }
  return (
    <>
      <div className="container-fluid bg-light">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={1000} controls={false} >
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/jcb.png" alt="Second slide" style={{objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/truck.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/roadroler.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/loader.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/dumptruck.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/tractor.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" height={400} src="image/crane.png" alt="Third slide" style={{ objectFit: 'cover' }}/>
            </center>
          </Carousel.Item>
        </Carousel>
        <hr/>
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

