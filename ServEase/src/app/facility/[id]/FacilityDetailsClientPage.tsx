"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/facilitydetails.module.css";

interface Profile {
  id: string;
  business_name: string;
  full_name: string;
  address: string;
  contact_number: string;
  facility_image_url: string | null;
  picture_url: string | null;
  created_at: string;
  rating: number;
  specific_category: string;
  category: string;
  working_days: string[] | null;
  start_time: string | null;
  end_time: string | null;
  location: { lat: number; lng: number } | null;
  email: string | null;
}

interface Service {
  id: number; // Corrected type
  name: string; // Corrected property name
  price: number;
  provider_id: string;
}

interface Review {
  id: string;
}

interface RelatedService {
  id: string;
  business_name: string;
  rating: number;
  facility_image_url: string | null;
  picture_url: string | null;
}

const formatTime = (timeStr: string | null) => {
  if (!timeStr) return "N/A";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  const period = hour >= 12 ? "PM" : "AM";
  let adjustedHour = hour % 12;
  if (adjustedHour === 0) adjustedHour = 12;
  return `${adjustedHour}:${String(minute).padStart(2, "0")} ${period}`;
};

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_NAMES = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const formatWorkingDays = (days: string[] | null): string => {
  if (!days || days.length === 0) return "";
  if (days.length === 1)
    return DAY_NAMES[days[0] as keyof typeof DAY_NAMES] || days[0];

  const sortedDays = [...days].sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b)
  );

  const isConsecutive = (): boolean => {
    const indices = sortedDays.map((day) => DAY_ORDER.indexOf(day));

    let regularConsecutive = true;
    for (let i = 1; i < indices.length; i++) {
      if (indices[i] !== indices[i - 1] + 1) {
        regularConsecutive = false;
        break;
      }
    }

    if (regularConsecutive) return true;

    if (indices.includes(6) && indices.includes(0)) {
      const reordered = [...indices];
      const sunIndex = reordered.indexOf(6);
      const beforeSun = reordered.slice(0, sunIndex);
      const fromSun = reordered.slice(sunIndex);
      const newOrder = [...fromSun, ...beforeSun];

      const adjustedOrder = newOrder.map((idx) => (idx === 6 ? -1 : idx));

      for (let i = 1; i < adjustedOrder.length; i++) {
        if (adjustedOrder[i] !== adjustedOrder[i - 1] + 1) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  if (isConsecutive()) {
    const firstDay =
      DAY_NAMES[sortedDays[0] as keyof typeof DAY_NAMES] || sortedDays[0];
    const lastDay =
      DAY_NAMES[sortedDays[sortedDays.length - 1] as keyof typeof DAY_NAMES] ||
      sortedDays[sortedDays.length - 1];
    return `${firstDay} - ${lastDay}`;
  }

  return days
    .map((day) => DAY_NAMES[day as keyof typeof DAY_NAMES] || day)
    .join(", ");
};

const RelatedServiceCard = ({ related }: { related: RelatedService }) => {
  const router = useRouter();

  return (
    <div
      className={styles.customerQuote}
      onClick={() => router.push(`/facility/${related.id}`)}
    >
      <div className={styles.customerQuoteChild}>
        <Image
          src={related.facility_image_url || "/placeholder-facility.jpg"}
          alt={related.business_name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>
          <div className={styles.avatar1}>
            <Image
              src={related.picture_url || "/avatar.svg"}
              alt={related.business_name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.serviceFacilityNameParent}>
            <div className={styles.serviceFacilityName}>
              {related.business_name}
            </div>
            <div className={styles.parent3}>
              <div className={styles.div4}>{related.rating.toFixed(1)}</div>
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  className={styles.groupChild17}
                  width={20}
                  height={20}
                  alt="Star"
                  src={
                    i < Math.round(related.rating)
                      ? "/Star 31.svg"
                      : "/Star 4.svg"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacilityDetailsClientPage: NextPage<{
  facility: Profile;
  services: Service[];
  reviews: Review[];
  relatedServices: RelatedService[];
}> = ({ facility, services, reviews, relatedServices }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [active, setActive] = useState(1);
  const serviceNames = services ? services.map((service) => service.name) : [];
  const [activeServiceName, setActiveServiceName] = useState("");

  const filters = [
    { label: "All", hasStar: false },
    { label: "5", hasStar: true },
    { label: "4", hasStar: true },
    { label: "3", hasStar: true },
    { label: "2", hasStar: true },
    { label: "1", hasStar: true },
    { label: "With Media", hasStar: false },
  ];

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLiked((prev) => !prev);
      setIsAnimating(false);
    }, 100);
  };
  const top6PopularServices = relatedServices.slice(0, 6);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleServices = 3;

  const handleNext = () => {
    if (currentIndex < top6PopularServices.length - visibleServices) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };

  const facilityImages = Array(5).fill(
    facility.facility_image_url || "/placeholder-facility.jpg"
  );

  const visibleImages = 3;
  const [carouselIndex, setCarouselIndex] = useState(visibleImages);
  const totalImages = facilityImages.length;

  const handleNext1 = () => {
    if (carouselIndex >= totalImages + visibleImages) return;
    setCarouselIndex((prev) => prev + 1);
  };

  const handlePrev1 = () => {
    if (carouselIndex <= 0) return;
    setCarouselIndex((prev) => prev - 1);
  };
  const [disableAnim, setDisableAnim] = useState(false);

  const disableTransition = () => {
    setDisableAnim(true);
    setTimeout(() => setDisableAnim(false), 50); // restore transition
  };

  useEffect(() => {
    if (carouselIndex === totalImages + visibleImages) {
      setTimeout(() => {
        setCarouselIndex(visibleImages);
        disableTransition(); // temporarily disable transition
      }, 300);
    } else if (carouselIndex === 0) {
      setTimeout(() => {
        setCarouselIndex(totalImages);
        disableTransition();
      }, 300);
    }
  }, [carouselIndex]);

  useEffect(() => {
    if (services && services.length > 0 && !activeServiceName) {
      // Set the first service as the default active one.
      setActiveServiceName(services[0].name);
    }
  }, [services, activeServiceName]);

  const priceRange = useMemo(() => {
    if (!services || services.length === 0) return "N/A";
    const prices = services.map((s) => s.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return `₱${minPrice.toFixed(2)}`;
    return `₱${minPrice.toFixed(2)} - ₱${maxPrice.toFixed(2)}`;
  }, [services]);

  const selectedService = useMemo(() => {
    return services.find((s) => s.name === activeServiceName);
  }, [activeServiceName, services]);

  const selectedServicePrice = selectedService
    ? selectedService.price.toFixed(2)
    : "0.00";

  const handleBookNow = () => {
    if (!selectedService) {
      alert("Please select a service to book.");
      return;
    }

    const bookingUrl = `/appointment-booking?facilityId=${facility.id}&serviceId=${selectedService.id}`;

    router.push(bookingUrl);
  };

  return (
    <div className={styles.facilityDetailsParent}>
      <div className={styles.facilityDetails}>
        <div className={styles.frameParent}>
          <div className={styles.image7Parent}>
            <div className={styles.image7}>
              <Image
                src={facility.facility_image_url || "/placeholder-facility.jpg"}
                alt={facility.business_name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.image7Group}>
              <div className={styles.buttonFrame} onClick={handlePrev1}>
                <div className={styles.button11}>
                  <div className={styles.chevronLeft}>
                    <Image
                      className={styles.icon4}
                      width={5}
                      height={10}
                      alt="Previous"
                      src="/Chevron left.svg"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.carouselViewport1}>
                <div
                  className={styles.carouselTrack1}
                  style={{
                    transform: `translateX(-${
                      carouselIndex * (100 / visibleImages)
                    }%)`,
                    transition: disableAnim
                      ? "none"
                      : "transform 0.5s ease-in-out",
                  }}
                >
                  {/* Clone last N items at the start */}
                  {facilityImages.slice(-visibleImages).map((imgSrc, idx) => (
                    <div className={styles.image71} key={`clone-start-${idx}`}>
                      <Image
                        src={imgSrc}
                        alt="Clone Start"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}

                  {/* Original slides */}
                  {facilityImages.map((imgSrc, idx) => (
                    <div className={styles.image71} key={idx}>
                      <Image
                        src={imgSrc}
                        alt={`Facility Image ${idx + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}

                  {/* Clone first N items at the end */}
                  {facilityImages.slice(0, visibleImages).map((imgSrc, idx) => (
                    <div className={styles.image71} key={`clone-end-${idx}`}>
                      <Image
                        src={imgSrc}
                        alt="Clone End"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.buttonWrapper} onClick={handleNext1}>
                <div className={styles.button11}>
                  <div className={styles.chevronRight}>
                    <Image
                      className={styles.icon3}
                      width={50}
                      height={10}
                      alt="Next"
                      src="/Chevron right.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.groupParent}>
              <div className={styles.frameChild}></div>
              <div className={styles.dividerIcon}></div>
              <div className={styles.wrapper2}>
                <div className={styles.circle}>
                  <Image
                    src="/message square.svg"
                    alt="Chat"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.label}>Chat</div>
              </div>
              <div
                className={styles.wrapper2}
                onClick={() =>
                  document
                    .getElementById("location")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <div className={styles.circle}>
                  <Image
                    src="/map square.svg"
                    alt="Map"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.label}>Map</div>
              </div>
              <div
                className={styles.wrapper2}
                onClick={() =>
                  document
                    .getElementById("ratings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <div className={styles.circle}>
                  <Image
                    src="/review square.svg"
                    alt="Review"
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
              <div className={styles.barbershop}>{facility.business_name}</div>
              <div className={styles.wrapper}>
                <b className={styles.b}>{priceRange}</b>
              </div>
              <div className={styles.groupContainer}>
                <div className={styles.parent}>
                  <b className={styles.kReviews}>
                    {facility.rating.toFixed(1)}
                  </b>
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      className={styles.groupChild}
                      width={25}
                      height={25}
                      alt="Star"
                      src={
                        i < Math.round(facility.rating)
                          ? "/Star 31.svg"
                          : "/Star 4.svg"
                      }
                    />
                  ))}
                </div>
                <div className={styles.kReviewsWrapper}>
                  <b className={styles.kReviews}>({reviews.length} Reviews)</b>
                </div>
              </div>
              <div className={styles.paraContentWrapper}>
                <div className={styles.paraContent1}>
                  <Image
                    className={styles.locationPointIcon}
                    width={25}
                    height={25}
                    alt=""
                    src="/location-point.svg"
                  />
                  <div className={styles.nBacalsoAve}>{facility.address}</div>
                </div>
              </div>
              <div className={styles.paraContentParent}>
                <div className={styles.paraContent1}>
                  <div className={styles.locationPointIcon}>
                    <Image
                      className={styles.icon}
                      width={20.7}
                      height={20.8}
                      alt=""
                      src="/Phone.svg"
                    />
                  </div>
                  <div className={styles.nBacalsoAve}>
                    {facility.contact_number || "Not Available"}
                  </div>
                </div>
                <div className={styles.paraContent1}>
                  <div className={styles.locationPointIcon}>
                    <Image
                      className={styles.icon1}
                      width={20.8}
                      height={16.7}
                      alt=""
                      src="/Mail.svg"
                    />
                  </div>
                  <div className={styles.nBacalsoAve}>{facility.email}</div>
                </div>
              </div>
              <Image
                className={styles.dividerIcon1}
                width={629}
                height={1}
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.paraContentContainer}>
                <div className={styles.paraContent6}>
                  <b className={styles.workSchedule}>Work Schedule</b>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <div className={styles.button1}>
                  <div className={styles.star} />
                  {formatWorkingDays(facility.working_days) || "Not Specified"}
                  <div className={styles.star} />
                </div>
                <div className={styles.paraContent7}>
                  <div className={styles.nBacalsoAve}>
                    {facility.start_time && facility.end_time
                      ? `${formatTime(facility.start_time)} - ${formatTime(
                          facility.end_time
                        )}`
                      : "Not Available"}
                  </div>
                </div>
              </div>
              <Image
                className={styles.dividerIcon2}
                width={629}
                height={1}
                alt=""
                src="/Divider1.svg"
              />
              <div className={styles.paraContentFrame}>
                <div className={styles.paraContent6}>
                  <b className={styles.workSchedule}>Available Services</b>
                </div>
              </div>
              <div className={styles.frameDiv}>
                <div className={styles.paraContent6}>
                  <b className={styles.b}>₱ {selectedServicePrice}</b>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {/* --- UI RESTORED --- */}
                {/* This JSX is now exactly as you had it, using your original class logic. */}
                {serviceNames.map((serviceName) => (
                  <div
                    key={serviceName}
                    className={`${styles.button3} ${
                      activeServiceName === serviceName
                        ? styles.active
                        : styles.inactive
                    }`}
                    onClick={() => setActiveServiceName(serviceName)}
                  >
                    <div className={styles.star} />
                    <div className={styles.mondayFriday}>{serviceName}</div>
                    <div className={styles.star} />
                  </div>
                ))}
              </div>
              <Image
                className={styles.dividerIcon3}
                width={629}
                height={1}
                alt=""
                src="/Divider1.svg"
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
                  <div className={styles.favorite11k}>Favorite</div>
                </div>
                <div className={styles.button4} onClick={handleBookNow}>
                  <div className={styles.star} />
                  <div className={styles.mondayFriday}>Book Now</div>
                  <div className={styles.star} />
                </div>
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
                  <div className={styles.nBacalsoAve}>{facility.address}</div>
                </div>
              </div>
              <div className={styles.map}>
                <Image
                  className={styles.bgIcon}
                  fill
                  objectFit="cover"
                  alt="Map Background"
                  src="/Map.svg"
                />
                <Image
                  className={styles.locationOnIcon}
                  width={90}
                  height={90}
                  alt=""
                  src="/location_on1.svg"
                />
              </div>
              <div className={styles.button13}>
                <div className={styles.star} />
                <div className={styles.link}>
                  <div className={styles.bookNow1}>Get Directions</div>
                  <Image
                    className={styles.svgIcon}
                    width={14}
                    height={14}
                    alt=""
                    src="/SVG.svg"
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
          <div className={styles.group}>
            <div className={styles.parent2}>
              <b className={styles.b8}>{facility.rating.toFixed(1)}</b>
              <div className={styles.outOf5}>Out of 5</div>
            </div>
            <Image
              className={styles.icon5}
              width={160}
              height={160}
              alt=""
              src="/75.svg"
            />
            <div className={styles.paraContentGroup}>
              <div className={styles.paraContent17}>
                <b className={styles.workSchedule}>{reviews.length} Reviews</b>
              </div>
              <div className={styles.grid}>
                {filters.map((filter) => (
                  <div
                    key={filter.label}
                    className={`${styles.buttonstar} ${
                      activeFilter === filter.label ? styles.active : ""
                    }`}
                    onClick={() => setActiveFilter(filter.label)}
                  >
                    {filter.hasStar && (
                      <Image
                        src="/Star 31.svg"
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
          <div className={styles.locationInner}>
            <div className={styles.frameContainer}>...</div>
          </div>
          <div className={styles.locationChild}>
            <div className={styles.frameParent1}>...</div>
          </div>
        </div>
        <Image
          className={styles.dividerrelated}
          width={1300}
          height={1}
          alt=""
          src="/Divider1.svg"
        />
        <div className={styles.relatedservicesbox}>
          <b className={styles.relatedServices}>
            <span className={styles.relatedServicesTxtContainer}>
              <span>Related</span>
              <span className={styles.services}> Services</span>
            </span>
          </b>
          <div className={styles.servicesCarousel}>
            {currentIndex > 0 && (
              <button
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={handlePrev}
              >
                <Image
                  width={28}
                  height={28}
                  src="/Chevron right.svg"
                  alt="Previous"
                />
              </button>
            )}
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{
                  transform: `translateX(calc(-${
                    currentIndex * (100 / visibleServices)
                  }%))`,
                }}
              >
                {top6PopularServices.map((related) => (
                  <RelatedServiceCard key={related.id} related={related} />
                ))}
              </div>
            </div>
            {currentIndex < top6PopularServices.length - visibleServices && (
              <button
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={handleNext}
              >
                <Image
                  width={28}
                  height={28}
                  src="/Chevron right.svg"
                  alt="Next"
                />
              </button>
            )}
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
          <div className={styles.contactNumber}>contact number</div>
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

export default FacilityDetailsClientPage;
