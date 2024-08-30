import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(process.env.React_APP_SECRET_KEY_CategoryList)
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
        <section className="py-3 py-md-5">
          <div className="container">
            <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
              <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center bg-transparent">
                <Carousel activeIndex={index} onSelect={handleSelect} interval={1000} controls={true}>
                  {['jcb.png', 'truck.png', 'roadroler.png', 'loader.png', 'dumptruck.png', 'tractor.png', 'crane.png'].map((image, idx) => (
                    <Carousel.Item key={idx}>
                      <img className="d-block" src={`image/${image}`} alt={`Slide ${idx}`} style={{ objectFit: 'cover', height: '27vw' }} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="col-12 col-lg-6 bg-transparent">
                <div className="row justify-content-xl-center bg-transparent">
                  <div className="col-12 col-xl-10 bg-transparent z-5">
                    <h2 className="mb-3">Why Choose Us?</h2>
                    <p className="lead fs-4 mb-3 mb-xl-5">
                      A Fleet Management System enhances efficiency, reduces costs, and improves safety by providing real-time tracking, maintenance scheduling, and data-driven insights, making it essential for effective fleet operations.
                    </p>
                    {['Our evolution procedure is super intelligent.', 'We deliver services beyond expectations.', 'Let\'s hire us to reach your objectives.'].map((text, idx) => (
                      <div className="d-flex align-items-center mb-3" key={idx}>
                        <div className="me-3 text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-success bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                        </div>
                        <div>
                          <p className="fs-5 m-0">{text}</p>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => { navigate('/contact') }} className="btn bsb-btn-xl btn-outline-success rounded-pill">Connect Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section id="team" className="py-3">
          <div className="container-fluid">
            <h1 className="section-title mb-2">OUR Services</h1>
            <div className="row">
              {category.map((item, index) => (
                <div key={index} className="col-xs-12 col-sm-6 col-md-4">
                  <div className="image-flip">
                    <div className="mainflip flip-0">
                      <div className="frontside p-0 m-3">
                        <div className="card">
                          <div className="card-body text-center p-0 m-0">
                            <img className="p-0 m-0" height={150} src={item.imageUrl} alt={item.categoryName} />
                            <h4 className="card-title p-0 m-0">{item.categoryName}</h4>
                            <p className="card-text m-1">{item.use}</p>
                            <a href="#" className="btn btn-primary m-0 btn-sm"><i className="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="backside p-0 m-3 mt-0">
                        <div className="card">
                          <div className="card-body text-center d-flex align-items-center flex-column justify-content-center">
                            <h4 className="card-title">{item.categoryName}</h4>
                            <p className="card-text">{item.description}</p>
                            <button className="btn btn-primary m-0" onClick={() => { navigate("/vehicle", { state: item.categoryName }) }}>Check</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;

