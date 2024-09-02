import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [formData, setFormData] = useState({ fullname: "", email: "", phone: "", message: "", });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { fullname, email, message } = formData;
    if (!fullname || !email || !message) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Your message has been sent successfully!");
      setFormData({ fullname: "", email: "", phone: "", message: "", });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-light py-2 py-md-3">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-2 display-5 text-center">Contact</h2>
              <p className="text-secondary mb-3 text-center">                The best way to contact us is to use our contact form below. Please fill out all of the required fields and we will get back to you as soon as possible.              </p>
              <hr className="w-50 mx-auto mb-3 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5 shadow shadow-5">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter Your Name" required />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">  Email <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                          </svg>
                        </span>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email Id" required />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label">  Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                          </svg>
                        </span>
                        <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Your Contact Number" />
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">  Message <span className="text-danger">*</span></label>
                      <textarea className="form-control" id="message" name="message" rows="3" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-dark btn-lg" type="submit" disabled={loading}>  {loading ? "Sending..." : "Submit"}</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
