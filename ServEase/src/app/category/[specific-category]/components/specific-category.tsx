'use client';

import { useState, useTransition } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../../../styles/specificcategory.module.css'; 
import { getProvidersBySpecificCategory } from '../actions';
import type { ServiceProvider } from '../../../lib/supabase/types'; 

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.round(rating);

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Image
          key={index}
          src={index < fullStars ? "/Star 3.svg" : "/Star 4.svg"}
          alt={index < fullStars ? "Filled Star" : "Empty Star"}
          width={20}
          height={20}
        />
      ))}
    </div>
  );
};

const ServiceProviderCard = ({
  id,
  name,
  location,
  rating,
  image_url,
  service_icon_url,
}: ServiceProvider) => {
  const router = useRouter();
  return (
    <div className={styles.customerQuote}>
      <div
        className={styles.customerQuoteChild}
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className={styles.avatarParent}>
        <div className={styles.avatar}>
          <Image
            className={styles.servicePhoto}
            width={45}
            height={45}
            alt={`${name} icon`}
            src={service_icon_url}
          />
          <div className={styles.avatar1} />
          <div className={styles.serviceFacilityNameParent}>
            <div className={styles.serviceFacilityName}>{name}</div>
            <div className={styles.location1}>{location}</div>
          </div>
          <div className={styles.avatar2} />
          <div className={styles.avatar3}>
            <div className={styles.groupParent}>
              <div className={styles.parent}>
                <div className={styles.div}>{rating.toFixed(1)}</div>
                <StarRating rating={rating} />
              </div>
              <button
                className={styles.link1}
                onClick={() => router.push(`/details/${id}`)}
              >
                <div className={styles.viewDetails}>View Details</div>
                <Image
                  className={styles.svgIcon}
                  width={14}
                  height={14}
                  alt="Arrow icon"
                  src="/SVG.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN CLIENT COMPONENT (UPDATED LOGIC) ---
// It receives props from the server component
interface SpecificCategoryClientProps {
  initialProviders: ServiceProvider[];
  categoryName: string; // The main category name, e.g., "Personal Care & Beauty"
  specificCategory: string; // The specific category name, e.g., "Barbershops"
}

const SpecificCategoryClient: NextPage<SpecificCategoryClientProps> = ({
  initialProviders,
  categoryName,
  specificCategory,
}) => {
  const router = useRouter();
  const [providers, setProviders] = useState<ServiceProvider[]>(initialProviders);
  const [isPending, startTransition] = useTransition();

  // The refresh handler now uses the specific category it was given from the props
  const handleRefresh = () => {
    startTransition(async () => {
      // Call the server action with the current specific category
      const { providers: updatedProviders, error } = await getProvidersBySpecificCategory(specificCategory);
      if (error) {
        alert(error); // Or show a more graceful error message
      } else {
        setProviders(updatedProviders);
      }
    });
  };

  return (
    <div className={styles.discover3}>
      {/* --- Static Header & Form --- */}
      <div className={styles.whatweofferbox} />
      <div className={styles.form}>
        <div className={styles.verticalborder}>
          <div className={styles.link}>
            <Image
              className={styles.icon}
              width={20}
              height={20}
              sizes="100vw"
              alt="Filter"
              src="/filter.svg"
            />
            <div className={styles.moreFilters}>More Filters</div>
          </div>
        </div>
        <div className={styles.button}>
          <Image
            className={styles.icon1}
            width={15}
            height={15}
            sizes="100vw"
            alt=""
            src="/Search.svg"
          />
          <div className={styles.findListing}>Find Listing</div>
        </div>
        <div className={styles.form1}>
          <div className={styles.enterAService}>
            Enter a Service Name, Category, or Location
          </div>
        </div>
      </div>
      
      {/* --- DYNAMIC TITLE --- */}
      <b className={styles.allServices}>
        <span>{categoryName}: </span>
        <span className={styles.services}>{specificCategory}</span>
      </b>
      <div className={styles.heroImage} />

      {/* --- Navigation Bar --- */}
      <div className={styles.navigation}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="/Servease Logo (Album Cover) (3) 1.png"
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
        <div className={styles.button1}>
          <div className={styles.star} />
          <div className={styles.signIn}>Sign in</div>
          <div className={styles.star} />
        </div>
      </div>

      {/* --- REFRESH BUTTON --- */}
      <div style={{ textAlign: "center", margin: "2rem 0 1rem 0" }}>
        <button
          onClick={handleRefresh}
          disabled={isPending}
          className={styles.button}
        >
          {isPending ? "Refreshing..." : `Refresh ${specificCategory}`}
        </button>
      </div>

      {/* --- DYNAMIC CONTENT AREA --- */}
      {providers.length > 0 ? (
        <div className={styles.cardGrid}>
          {providers.map((provider) => (
            <ServiceProviderCard key={provider.id} {...provider} />
          ))}
        </div>
      ) : (
        <div className={styles.statusMessage}>
          {isPending ? "Loading..." : `No services found for "${specificCategory}".`}
        </div>
      )}

      {/* --- FOOTER --- */}
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.yourTrustedPlatform}>
          Your trusted platform to discover, book, and manage local
          services—anytime, anywhere.
        </div>
        <b className={styles.contactUs1}>Contact Us</b>
        <div className={styles.supportserveasecom}>support@servease.com</div>
        <div className={styles.contactNumber}>+63 996-751-3542</div>
        <b className={styles.support}>Support</b>
        <div className={styles.faqs}>FAQs</div>
        <div className={styles.privacyPolicy}>Privacy Policy</div>
        <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
        <div
          className={styles.aboutUs}
          onClick={() => {
            window.scrollTo({ top: 500, behavior: "smooth" });
          }}
        >
          About Us
        </div>
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
        <div
          className={styles.home1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Home
        </div>
        <div className={styles.discover1}>Discover</div>
        <div
          className={styles.createAnAccount}
          onClick={() => router.push("/signup")}
        >
          Create an Account
        </div>
        <div className={styles.lineParent}>
          <div className={styles.lineDiv} />
          <div className={styles.servease2025}>
            servease 2025 © All rights reserved
          </div>
        </div>
        <Image
          className={styles.serveaseLogoAlbum}
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
  );
};

export default SpecificCategoryClient;