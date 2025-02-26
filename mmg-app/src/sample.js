import React, { useEffect, useRef } from 'react';
import './sample.css';
import Paneericon from "./assets/Panner-icon.svg";
import Proteins from "./assets/meat.svg";
import Whey from "./assets/powder.svg";
import Energybar from "./assets/ricebag.svg";
import Palakpaneer from "./assets/paneercubes.svg";
import Activestar from "./assets/active-star.svg";
import Inactivestar from "./assets/inactive-star.svg";
import MMGpacket from "./assets/MMG-image.svg";

const PricingTable = () => {
  const tableContainerRef = useRef(null);
  const scrollRightRef = useRef(null);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const scrollRight = scrollRightRef.current;

    const handleScroll = () => {
      if (tableContainer.scrollLeft > 0) {
        scrollRight.style.display = 'none';
      } else {
        scrollRight.style.display = 'block';
      }

      const totalTableWidth = tableContainer.scrollWidth;
      const tableViewport = tableContainer.clientWidth;

      if (tableContainer.scrollLeft >= totalTableWidth - tableViewport) {
        tableContainer.classList.add('table-end');
      } else {
        tableContainer.classList.remove('table-end');
      }
    };

    const handleScrollRight = () => {
      const columnWidth = tableContainer.querySelector('.cd-table-column').offsetWidth;
      tableContainer.scrollBy({ left: columnWidth, behavior: 'smooth' });
      scrollRight.style.display = 'none';
    };

    tableContainer.addEventListener('scroll', handleScroll);
    scrollRight.addEventListener('click', handleScrollRight);

    return () => {
      tableContainer.removeEventListener('scroll', handleScroll);
      scrollRight.removeEventListener('click', handleScrollRight);
    };
  }, []);

  return (
    <section id="cd-table">
      <header className="cd-table-column">
        <div className='icon-height'>
          <img src={Paneericon} className='paneer-icon-active-hidden' alt='' />
        </div>
        <ul className="set-list-active">
          <li>PROTEIN</li>
          <li>FAT</li>
          <li>CALORIES</li>
          <li>PRICE</li>
        </ul>
      </header>

      <div className="cd-table-container" ref={tableContainerRef}>
        <div className="cd-table-wrapper">
          <div className="cd-table-column column-active">
            <div className='icon-height'>
              <img src={Activestar} className="active-star" alt="active star" />
              <img src={MMGpacket} className='paneer-active-image-1' alt='' />
            </div>
            <ul className="set-list-paneer">
              <li>31G</li>
              <li>5G</li>
              <li>160</li>
              <li>₹</li>
            </ul>
          </div>

          <div className="cd-table-column border-column">
            <div className='icon-height'>
              <img
                src={Inactivestar}
                className="inactive-star"
                alt="inactive star"
              />
              <img src={Palakpaneer} className='palak-icon-active' alt='' />
            </div>
            <ul className="set-list">
              <li>18G</li>
              <li>25G</li>
              <li>300</li>
              <li>₹</li>
            </ul>
          </div>

          <div className="cd-table-column border-column">
            <div className='icon-height'>
              <img
                src={Inactivestar}
                className="inactive-star"
                alt="inactive star"
              />
              <img src={Proteins} className='proteins-icon-active' alt='' />
            </div>
            <ul className="set-list">
              <li>27G</li>
              <li>5G</li>
              <li>150</li>
              <li>₹₹</li>
            </ul>
          </div>

          <div className="cd-table-column border-column">
            <div className='icon-height'>
              <img
                src={Inactivestar}
                className="inactive-star"
                alt="inactive star"
              />
              <img src={Energybar} className='energy-icon-active' alt='' />
            </div>
            <ul className="set-list">
              <li>20G</li>
              <li>12G</li>
              <li>300</li>
              <li>₹₹₹</li>
            </ul>
          </div>

          <div className="cd-table-column border-column">
            <div className='icon-height'>
              <img
                src={Inactivestar}
                className="inactive-star"
                alt="inactive star"
              />
              <img src={Whey} className='whey-icon-active' alt='' />
            </div>
            <ul className="set-list">
              <li>25G</li>
              <li>3G</li>
              <li>140</li>
              <li>₹₹₹₹</li>
            </ul>
          </div>
        </div>
      </div>
      <em className="cd-scroll-right" ref={scrollRightRef}></em>
    </section>
  );
};

export default PricingTable;
