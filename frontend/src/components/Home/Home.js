import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/category/list')
      .then(response => {
        setCategory(response.data.categories)
      }).catch(err => {
        console.log(err);
      })
  }, []);

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }
  return (
    <>
      <div className="container-fluid bg-light">
        <br />
        <Carousel activeIndex={index} onSelect={handleSelect} interval={1000} controls={false} >
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/jcb.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/truck.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/roadroler.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/loader.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/dumptruck.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/tractor.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
          <Carousel.Item>
            <center>
              <img className="d-block" src="image/crane.png" alt="..." style={{ objectFit: 'cover', height: "35vw" }} />
            </center>
          </Carousel.Item>
        </Carousel>
        <hr />
        <section id="team" className="py-3">
          <div className="container-fluid">
            <h1 className="section-title mb-2">OUR Services</h1>
            <div className="row">
              {category.map((item, index) =>
                <div key={index} className="col-xs-12 col-sm-6 col-md-4 ">
                  <div className="image-flip" >
                    <div className="mainflip flip-0">
                      <div className="frontside p-0 m-3">
                        <div className="card">
                          <div className="card-body text-center p-0 m-0 ">
                            <p className=' p-0 m-0'><img className="p-0 m-0" height={150} src={item.imageUrl} alt="card image" /></p>
                            <h4 className="card-title p-0 m-0">{item.categoryName}</h4>
                            <p className="card-text m-1">{item.use}</p>
                            <a href="..." className="btn btn-primary m-0 btn-sm"><i className="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="backside p-0 m-3 mt-0">
                        <div className="card">
                          <div className="card-body text-center d-flex align-items-center flex-column justify-content-center">
                            <h4 className="card-title">{item.categoryName}</h4>
                            <p className="card-text">{item.description}</p>
                            <button className="btn btn-primary m-0" onClick={() => { navigate("/vehicle", { state: item.categoryName }) }}>Chek</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;

