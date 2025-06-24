"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import styles from "../styles/DiscoverPage.module.css";


const discoverPage: NextPage = () => {
  const onLinkContainerClick = useCallback(() => {
    // Add your code here
    console.log("Link clicked!");
  }, []);

  return (
    <div className={styles.discover1Parent}>
      <div className={styles.discover1}>
        <div className={styles.footer}>
          <div className={styles.footerChild} />
          <div className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </div>
          <b className={styles.contactUs}>Contact Us</b>
          <div className={styles.supportserveasecom}>support@servease.com</div>
          <div className={styles.contactNumber}>// contact number</div>
          <b className={styles.support}>Support</b>
          <div className={styles.faqs}>FAQs</div>
          <div className={styles.privacyPolicy}>Privacy Policy</div>
          <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
          <div className={styles.aboutUs}>About Us</div>
          <b className={styles.quickLinks}>Quick Links</b>
          <b className={styles.servease}>servease</b>
          <div className={styles.home}>Home</div>
          <div className={styles.discover}>Discover</div>
          <div className={styles.createAnAccount}>Create an Account</div>
          
          <div className={styles.lineParent}>
            <div className={styles.lineDiv} />
            <div className={styles.servease2025}>
              servease 2025 © All rights reserved
            </div>
          </div>
          <Image
            className={styles.serveaseLogoAlbumCover3}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/Servease Logo (Album Cover) (3) 2.png"
          />
        </div>
        <div className={styles.whatweofferbox} />
        <div className={styles.background}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.miscellaneous}>Miscellaneous</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <b className={styles.ourServices}>
          <span>{`Our `}</span>
          <span className={styles.services}>Services</span>
        </b>
        <div className={styles.background1}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.personalBeautyAnd}>
              Personal Beauty and Care
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.background2}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.healthAndMedical}>
              Health and Medical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.background3}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.fitnessAndSports}>Fitness and Sports</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.background4}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.educationAndTutoring}>
              Education and Tutoring
            </div>
            <div className={styles.svg} />
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.background5}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.repairAndTechnical}>
              Repair and Technical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.background6}>
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.foodAndBeverages}>Food and Beverages</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.image10} />
        </div>
        <div className={styles.navigation}>
          <Image
            className={styles.serveaseLogoAlbumCover31}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/Servease Logo (Album Cover) (3) 2.png"
          />
          <div className={styles.servease1}>
            <span className={styles.serv}>serv</span>
            <b>ease</b>
          </div>
          <div className={styles.navigationChild} />
          <div className={styles.homeParent}>
            <div className={styles.home1}>Home</div>
            <div className={styles.home1}>Discover</div>
            <div className={styles.contactUs1}>Contact Us</div>
          </div>
          <div className={styles.navigationChild} />
          <div className={styles.button}>
            <div className={styles.star} />
            <div className={styles.signIn}>Sign in</div>
            <div className={styles.star} />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.verticalborder}>
            <div className={styles.link7}>
              <Image
                className={styles.icon7}
                width={20}
                height={20}
                sizes="100vw"
                alt=""
                src="filter.svg"
              />
              <div className={styles.moreFilters}>More Filters</div>
            </div>
          </div>
          <div className={styles.button1}>
            <Image
              className={styles.icon8}
              width={15}
              height={15}
              sizes="100vw"
              alt=""
              src="find.svg"
            />
            <div className={styles.findListing}>Find Listing</div>
          </div>
          <div className={styles.form1}>
            <div className={styles.enterAService}>
              Enter a Service Name, Category, or Location
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default discoverPage;
