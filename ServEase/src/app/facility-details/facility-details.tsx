"use client";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/facility-details.module.css";

const FacilityDetails: NextPage = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [active, setActive] = useState(1);

  const services1 = [
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
    "Service 5",
    "Service 6",
  ];
  const filters = [
    { label: "All", hasStar: false },
    { label: "5 (3.2K)", hasStar: true },
    { label: "4 (1.5K)", hasStar: true },
    { label: "3 (1.37K)", hasStar: true },
    { label: "2 (1.12K)", hasStar: true },
    { label: "1 (1.01K)", hasStar: true },
    { label: "With Media", hasStar: false },
  ];

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLiked((prev) => !prev);
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className={styles.facilityDetailsParent}>
      <div className={styles.facilityDetails}>
        <div className={styles.navigation}>
          <Image
            className={styles.serveaseLogoAlbumCover3}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/landingLogo.svg"
          />
          <div className={styles.servease}>
            <span className={styles.serv}>serv</span>
            <b>ease</b>
          </div>
          <div className={styles.navigationChild} />
          <div className={styles.homeParent}>
            <div className={styles.home}>Home</div>
            <div className={styles.home}>Discover</div>
            <div className={styles.contactUs}>Contact Us</div>
          </div>
          <div className={styles.navigationChild} />
          <Image
            className={styles.avatar}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/avatar.svg"
          />
        </div>
        <div className={styles.frameParent}>
          <div className={styles.image7Parent}>
            <div className={styles.image7} />
            <div className={styles.image7Group}>
              <div className={styles.buttonFrame}>
                <div className={styles.button11}>
                  <div className={styles.chevronLeft}>
                    <Image
                      className={styles.icon4}
                      width={5}
                      height={10}
                      sizes="100vw"
                      alt=""
                      src="Chevron left.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.image71} />
              <div className={styles.image71} />
              <div className={styles.image71} />
              <div className={styles.buttonWrapper}>
                <div className={styles.button11}>
                  <div className={styles.chevronRight}>
                    <Image
                      className={styles.icon3}
                      width={50}
                      height={10}
                      sizes="100vw"
                      alt=""
                      src="Chevron right.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paraContent} />
            <div className={styles.groupParent}>
              <div className={styles.frameChild}></div>
              <div className={styles.dividerIcon}></div>
              <div className={styles.wrapper2}>
                <div className={styles.circle}>
                  <Image
                    src="message square.svg"
                    alt="Chat"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.label}>Chat</div>
              </div>
              <div
                className={styles.wrapper2}
                onClick={() => {
                  const section = document.getElementById("location");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className={styles.circle}>
                  <Image
                    src="map square.svg"
                    alt="Chat"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.label}>Map</div>
              </div>
              <div
                className={styles.wrapper2}
                onClick={() => {
                  const section = document.getElementById("ratings");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className={styles.circle}>
                  <Image
                    src="review square.svg"
                    alt="Chat"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.label}>Review</div>
              </div>
            </div>
          </div>
          <div className={styles.frameGroup}>
            <div className={styles.barbershopParent}>
              <div className={styles.barbershop}>barbershop</div>
              <div className={styles.wrapper}>
                <b className={styles.b}>₱300 - ₱700</b>
              </div>
              <div className={styles.groupContainer}>
                <div className={styles.parent}>
                  <b className={styles.kReviews}>4.0</b>
                  <Image
                    className={styles.groupChild}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="Star 3.svg"
                  />
                  <Image
                    className={styles.groupItem}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="Star 3.svg"
                  />
                  <Image
                    className={styles.groupInner}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="Star 3.svg"
                  />
                  <Image
                    className={styles.starIcon}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild1}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="Star 3.svg"
                  />
                </div>
                <div className={styles.kReviewsWrapper}>
                  <b className={styles.kReviews}>(8.2K Reviews)</b>
                </div>
              </div>
              <div className={styles.paraContentWrapper}>
                <div className={styles.paraContent1}>
                  <Image
                    className={styles.locationPointIcon}
                    width={25}
                    height={25}
                    sizes="100vw"
                    alt=""
                    src="location-point.svg"
                  />
                  <div className={styles.nBacalsoAve}>
                    N. Bacalso Ave., Cebu City
                  </div>
                </div>
              </div>
              <div className={styles.paraContentParent}>
                <div className={styles.paraContent1}>
                  <div className={styles.locationPointIcon}>
                    <Image
                      className={styles.icon}
                      width={20.7}
                      height={20.8}
                      sizes="100vw"
                      alt=""
                      src="Phone.svg"
                    />
                  </div>
                  <div className={styles.nBacalsoAve}>(+63) 912-3456-789</div>
                </div>
                <div className={styles.paraContent1}>
                  <div className={styles.locationPointIcon}>
                    <Image
                      className={styles.icon1}
                      width={20.8}
                      height={16.7}
                      sizes="100vw"
                      alt=""
                      src="Mail.svg"
                    />
                  </div>
                  <div className={styles.nBacalsoAve}>email@email.com</div>
                </div>
              </div>
              <div className={styles.paraContent4} />
              <Image
                className={styles.dividerIcon1}
                width={629}
                height={1}
                sizes="100vw"
                alt=""
                src="Divider.svg"
              />
              <div className={styles.paraContent5} />
              <div className={styles.paraContentContainer}>
                <div className={styles.paraContent6}>
                  <b className={styles.workSchedule}>Work Schedule</b>
                </div>
              </div>
              <div className={styles.buttonParent}>
                <div className={styles.button1}>
                  <div className={styles.star} />
                  <div className={styles.mondayFriday}>Monday - Friday</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.paraContent7}>
                  <div className={styles.nBacalsoAve}>08:00 AM - 09:00 PM</div>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <div className={styles.button1}>
                  <div className={styles.star} />
                  <div className={styles.mondayFriday}>Saturday - Sunday</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.paraContent7}>
                  <div className={styles.nBacalsoAve}>10:00 AM - 08:00 PM</div>
                </div>
              </div>
              <div className={styles.paraContent9} />
              <Image
                className={styles.dividerIcon2}
                width={629}
                height={1}
                sizes="100vw"
                alt=""
                src="Divider.svg"
              />
              <div className={styles.paraContent10} />
              <div className={styles.paraContentFrame}>
                <div className={styles.paraContent6}>
                  <b className={styles.workSchedule}>Available Services</b>
                </div>
              </div>
              <div className={styles.frameDiv}>
                <div className={styles.paraContent6}>
                  <b className={styles.b}>₱300.00</b>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {services1.map((service, index) => (
                  <div
                    key={index}
                    className={`${styles.button3} ${
                      activeIndex === index ? styles.active : styles.inactive
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className={styles.star} />
                    <div className={styles.mondayFriday}>{service}</div>
                    <div className={styles.star} />
                  </div>
                ))}
              </div>
            </div>
            <Image
              className={styles.dividerIcon3}
              width={629}
              height={1}
              sizes="100vw"
              alt=""
              src="Divider.svg"
            />
            <div className={styles.buttonParent2}>
              <div className={styles.button9} onClick={handleClick}>
                <div className={styles.heart}>
                  <Image
                    src="/Heart.svg"
                    alt="heart outline"
                    width={30.5}
                    height={26.6}
                    className={`${styles.icon2} ${
                      !isLiked && !isAnimating ? styles.iconVisible : ""
                    }`}
                  />
                  <Image
                    src="/Heart1.svg"
                    alt="heart filled"
                    width={30.5}
                    height={26.6}
                    className={`${styles.icon2} ${
                      isLiked && !isAnimating ? styles.iconVisible : ""
                    }`}
                  />
                </div>
                <div className={styles.favorite11k}>
                  Favorite {isLiked ? "(1.1K)" : ""}
                </div>
                <div className={styles.star} />
                <div className={styles.star} />
              </div>
              <div className={styles.button4}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Book Now</div>
                <div className={styles.star} />
              </div>
            </div>
          </div>
        </div>
        <section id="location">
          <div className={styles.whatweofferbox}>
            <div className={styles.location}>
              <b className={styles.location1}>Location</b>
              <div className={styles.paraContentWrapper1}>
                <div className={styles.paraContent6}>
                  <div className={styles.nBacalsoAve}>
                    N. Bacalso Ave., Cebu City
                  </div>
                </div>
              </div>
              <div className={styles.paraContent14} />
              <div className={styles.map}>
                <Image
                  className={styles.buttonPlusIcon}
                  width={40}
                  height={40}
                  sizes="100vw"
                  alt=""
                  src="Button_ plus.svg"
                />
                <Image
                  className={styles.buttonMinusIcon}
                  width={40}
                  height={40}
                  sizes="100vw"
                  alt=""
                  src="Button_ minus.svg"
                />
                <Image
                  className={styles.locationOnIcon}
                  width={90}
                  height={90}
                  sizes="100vw"
                  alt=""
                  src="location_on.svg"
                />
                <Image
                  className={styles.bgIcon}
                  width={40}
                  height={40}
                  sizes="100vw"
                  alt=""
                  src="BG.svg"
                />
                <div className={styles.logo}>logo</div>
              </div>
              <div className={styles.paraContent14} />
              <div className={styles.button13}>
                <div className={styles.star} />
                <div className={styles.link}>
                  <div className={styles.bookNow1}>Book Now</div>
                  <Image
                    className={styles.svgIcon}
                    width={14}
                    height={14}
                    sizes="100vw"
                    alt=""
                    src="SVG.svg"
                  />
                </div>
                <div className={styles.star} />
              </div>
            </div>
          </div>
        </section>

        <div className={styles.location2}>
          <section id="ratings">
            <b className={styles.serviceRatings}>Service Ratings</b>
          </section>
          <div className={styles.paraContent14} />

          <div className={styles.group}>
            <div className={styles.parent2}>
              <b className={styles.b8}>4.0</b>
              <div className={styles.outOf5}>Out of 5</div>
            </div>
            <Image
              className={styles.icon5}
              width={160}
              height={160}
              sizes="100vw"
              alt=""
              src="75.svg"
            />
            <div className={styles.paraContentGroup}>
              <div className={styles.paraContent17}>
                <b className={styles.workSchedule}>8.2K Reviews</b>
              </div>
              <div className={styles.grid}>
                {filters.map((filter, index) => (
                  <div
                    key={index}
                    className={`${styles.buttonstar} ${
                      activeFilter === filter.label ? styles.active : ""
                    }`}
                    onClick={() => setActiveFilter(filter.label)}
                  >
                    {filter.hasStar && (
                      <Image
                        src="/Star 3.svg"
                        alt="star"
                        width={18}
                        height={18}
                        className={styles.iconstar}
                      />
                    )}
                    <span>{filter.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.paraContent14} />
          <div className={styles.locationInner}>
            <div className={styles.frameContainer}>
              <div className={styles.paraContentParent1}>
                <div className={styles.paraContent19}>
                  <div className={styles.serviceOptionWrapper}>
                    <div className={styles.serviceOption}>service option</div>
                  </div>
                  <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
                </div>
                <div className={styles.paraContent19}>
                  <div className={styles.container}>
                    <div className={styles.div1}>4.0</div>
                    <Image
                      className={styles.groupChild2}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild3}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild4}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild5}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild6}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                  </div>
                  <div className={styles.name}>name</div>
                </div>
                <div className={styles.button21} />
              </div>
              <div className={styles.paraContentWrapper2}>
                <div className={styles.paraContent21}>
                  <div className={styles.blahBlahBlah}>blah blah blah</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.locationChild}>
            <div className={styles.frameParent1}>
              <div className={styles.paraContentParent1}>
                <div className={styles.paraContent19}>
                  <div className={styles.serviceOptionWrapper}>
                    <div className={styles.serviceOption}>service option</div>
                  </div>
                  <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
                </div>
                <div className={styles.paraContent19}>
                  <div className={styles.container}>
                    <div className={styles.div1}>4.0</div>
                    <Image
                      className={styles.groupChild2}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild3}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild4}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild5}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild6}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                  </div>
                  <div className={styles.name}>name</div>
                </div>
                <div className={styles.button21} />
              </div>
              <div className={styles.paraContentWrapper2}>
                <div className={styles.paraContent21}>
                  <div className={styles.blahBlahBlah}>blah blah blah</div>
                </div>
              </div>
              <div className={styles.paraContent25}>
                <div className={styles.image73} />
                <div className={styles.image73} />
                <div className={styles.image73} />
                <div className={styles.image73} />
                <div className={styles.image73} />
              </div>
            </div>
          </div>
          <div className={styles.locationInner}>
            <div className={styles.frameContainer}>
              <div className={styles.paraContentParent1}>
                <div className={styles.paraContent19}>
                  <div className={styles.serviceOptionWrapper}>
                    <div className={styles.serviceOption}>service option</div>
                  </div>
                  <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
                </div>
                <div className={styles.paraContent19}>
                  <div className={styles.container}>
                    <div className={styles.div1}>4.0</div>
                    <Image
                      className={styles.groupChild2}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild3}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild4}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                    <Image
                      className={styles.groupChild5}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild6}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="Star 3.svg"
                    />
                  </div>
                  <div className={styles.name}>name</div>
                </div>
                <div className={styles.button21} />
              </div>
              <div className={styles.paraContentWrapper2}>
                <div className={styles.paraContent21}>
                  <div className={styles.blahBlahBlah}>blah blah blah</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paraContent14} />
          <div className={styles.locationInner2}>
            <div className={styles.buttonParent3}>
              <div className={styles.button24}>
                <div className={styles.chevronLeft}>
                  <Image
                    className={styles.icon4}
                    width={5}
                    height={10}
                    sizes="100vw"
                    alt=""
                    src="Chevron right.svg"
                  />
                </div>
              </div>
              <div className={styles.circlewrapper}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`${styles.circle} ${
                      active === num ? styles.circleactive : ""
                    }`}
                    onClick={() => setActive(num)}
                  >
                    <b>{num}</b>
                  </div>
                ))}
              </div>
              <div className={styles.buttonWrapper1}>
                <div className={styles.button30}>
                  <div className={styles.chevronRight}>
                    <Image
                      className={styles.icon3}
                      width={5}
                      height={10}
                      sizes="100vw"
                      alt=""
                      src="Chevron right.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.facilityDetailsChild} />
        <div className={styles.relatedservicesbox}>
          <b className={styles.relatedServices}>
            <span className={styles.relatedServicesTxtContainer}>
              <span>Related</span>
              <span className={styles.services}> Services</span>
            </span>
          </b>
          <div className={styles.cards}>
            <div className={styles.customerQuote}>
              <div className={styles.customerQuoteChild} />
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  <div className={styles.avatar1} />
                  <div className={styles.serviceFacilityNameParent}>
                    <div className={styles.serviceFacilityName}>
                      Service Facility Name
                    </div>
                    <div className={styles.parent3}>
                      <div className={styles.div4}>4.0</div>
                      <Image
                        className={styles.groupChild17}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild18}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild19}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild20}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 4.svg"
                      />
                      <Image
                        className={styles.groupChild21}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.customerQuote1}>
              <div className={styles.customerQuoteItem} />
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <div className={styles.avatar1} />
                  <div className={styles.serviceFacilityNameParent}>
                    <div className={styles.serviceFacilityName}>
                      Service Facility Name
                    </div>
                    <div className={styles.parent3}>
                      <div className={styles.div4}>4.0</div>
                      <Image
                        className={styles.groupChild17}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild18}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild19}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild20}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 4.svg"
                      />
                      <Image
                        className={styles.groupChild21}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.customerQuote1}>
              <div className={styles.customerQuoteItem} />
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <div className={styles.avatar1} />
                  <div className={styles.serviceFacilityNameParent}>
                    <div className={styles.serviceFacilityName}>
                      Service Facility Name
                    </div>
                    <div className={styles.parent3}>
                      <div className={styles.div4}>4.0</div>
                      <Image
                        className={styles.groupChild17}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild18}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild19}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                      <Image
                        className={styles.groupChild20}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 4.svg"
                      />
                      <Image
                        className={styles.groupChild21}
                        width={20}
                        height={20}
                        sizes="100vw"
                        alt=""
                        src="Star 3.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardsInner}>
              <div className={styles.buttonWrapper2}>
                <div className={styles.button31}>
                  <div className={styles.chevronRight4}>
                    <Image
                      className={styles.icon8}
                      width={30}
                      height={30}
                      sizes="100vw"
                      alt=""
                      src="Chevron right.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerChild} />
          <div className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </div>
          <b className={styles.contactUs1}>Contact Us</b>
          <div className={styles.supportserveasecom}>support@servease.com</div>
          <div className={styles.contactNumber}>// contact number</div>
          <b className={styles.support}>Support</b>
          <div className={styles.faqs}>FAQs</div>
          <div className={styles.privacyPolicy}>Privacy Policy</div>
          <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
          <div className={styles.aboutUs}>About Us</div>
          <b className={styles.quickLinks}>Quick Links</b>
          <div
            className={styles.servease1}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className={styles.serv}>serv</span>
            <b>ease</b>
          </div>
          <div className={styles.home1} onClick={() => router.push("/home")}>
            Home
          </div>
          <div className={styles.discover1}>Discover</div>
          <div className={styles.lineParent}>
            <div className={styles.lineDiv} />
            <div className={styles.servease2025}>
              servease 2025 © All rights reserved
            </div>
          </div>
          <Image
            className={styles.serveaseLogoAlbumCover31}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/landingLogo.svg"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
