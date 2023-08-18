import React from 'react'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
     style={{
        backgroundImage:
        "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
     }}
    >
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
            <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                A marketplace <br />  for manufacturers.
            </h1>
            <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                No more middle men!! Buy directly from sellers to save costs <br /> 
                and scale production using
                our dedicated artisans. 
            </p>
            <Link to="/products" className="inline-block">
                <div className={`${styles.button} mt-5`}>
                    <span className="text-[#fff] font-[Poppins] text-[18px]">
                        Shop Now
                    </span>
                </div>
            </Link>
        </div>
        
    </div>
  )
}

export default Hero;