import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import newsLetterImg from "../../assets/images/newsletter.png";
import Button from "@mui/material/Button";
import { IoMailOutline } from "react-icons/io5";
import Banners from "../banners/index";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

const Footer = () => {
  const [bannerList, setBannerList] = useState([]);

  return (
    <>
      
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              
           
              

              <form className="mt-4">
            
              
              </form>
            </div>

            <div className="col-md-6">
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="topInfo row">

            <div className="col d-flex align-items-center">
              <span>
                <TbTruckDelivery />
              </span>
              <span className="ml-2">Free delivery </span>
            </div>

            <div className="col d-flex align-items-center">
              <span>
                <TbDiscount2 />
              </span>
              <span className="ml-2">Mega Discounts</span>
            </div>

            <div className="col d-flex align-items-center">
              <span>
                <CiBadgeDollar />
              </span>
              <span className="ml-2">Best price on the market</span>
            </div>
          </div>

          
           

            <div className="col">
            
              <ul>
                <li>
                  <Link to="#">ABOUT</Link>
                </li>
                <li>
                  <Link to="#">CONTACT US</Link>
                </li>
                <li>
                  <Link to="#">TERM & CONDITIONS</Link>
                </li>
                <li>
                  <Link to="#">PRIVACY & POLICIES</Link>
                </li>
                <li>
                  <Link to="#">REFUND POLICIES</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="copyright mt-3 pt-3 pb-3 d-flex">
            <p className="mb-0">Copyright 2024. All rights reserved</p>
            <ul className="list list-inline ml-auto mb-0 socials">
              <li className="list-inline-item">
                <Link to="#">
                  <FaFacebookF />
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="#">
                  <FaTwitter />
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="#">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
      </footer>
    </>
  );
};

export default Footer;
