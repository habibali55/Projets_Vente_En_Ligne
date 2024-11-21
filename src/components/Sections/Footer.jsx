import React from 'react';
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className='text-center text-lg-start text-muted' style={{ backgroundColor: '#737373', color: 'white', borderTop: '3px solid white', paddingTop: '20px' }}>

      {/* Main Content */}
      <section>
        <div className='container text-center text-md-start mt-5' style={{ color: 'white' }}>
          <div className='row mt-3'>
            {/* Company Information */}
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center' style={{ paddingBottom: '20px', borderBottom: '1px solid white' }}>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>ParLunettes</h6>
              <p>
                Notre application permet de faciliter l'achat pour les clients.
              </p>
            </div>

            {/* Contact Information */}
            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-center' style={{ paddingBottom: '20px', borderBottom: '1px solid white' }}>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Contact</h6>
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <MdOutlineMailOutline style={{ marginRight: '10px' }} /> ParLunettes@gmail.com
              </p>
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <BsFillTelephoneFill style={{ marginRight: '10px' }} /> 58443232
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Icons */}
      <section className='p-4' style={{ borderTop: '1px solid white', color: 'white' }}>
        <div className='container text-center'>
          <div className='d-flex justify-content-center'>
            <a href='#' className='me-4 text-reset' style={{ color: 'white', fontSize: '25px' }}>
              <CiFacebook />
            </a>
            <a href='#' className='me-4 text-reset' style={{ color: 'white', fontSize: '25px' }}>
              <CiInstagram />
            </a>
            <a href='#' className='me-4 text-reset' style={{ color: 'white', fontSize: '25px' }}>
              <FaTwitter />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
