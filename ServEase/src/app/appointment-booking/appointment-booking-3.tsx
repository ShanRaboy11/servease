"use client";
import type { NextPage } from "next";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "../styles/appointment-booking-3.module.css";
import { useBooking } from "./BookingContext";
import { createClient } from "../lib/supabase/client";

type Props = {
  onNext: () => void;
};

interface ProviderProfile {
  id: string;
  business_name: string;
  address: string;
  contact_number: string;
}

interface ClientProfile {
  id: string;
  full_name: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

// Helper function to format date for database without timezone issues
const formatDateForDB = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Booking3({ onNext }: Props) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STATE FOR BOTH PROFILES ---
  const [providerProfile, setProviderProfile] =
    useState<ProviderProfile | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  const { bookingData, resetBookingData } = useBooking();
  const { selectedServices, selectedDate, selectedTime } = bookingData;

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const facilityId = searchParams.get("facilityId");

  // --- REVISED useEffect to fetch BOTH profiles in parallel ---
  useEffect(() => {
    if (!facilityId) {
      setErrorMessage("Facility ID is missing from the URL.");
      setIsLoading(false);
      return;
    }

    const fetchAllProfiles = async () => {
      setIsLoading(true);

      // Get the current logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setErrorMessage("You must be logged in to view this page.");
        setIsLoading(false);
        return;
      }

      // Prepare both fetch requests
      const fetchProvider = supabase
        .from("profiles")
        .select("id, business_name, address, contact_number") // Corrected field names
        .eq("id", facilityId)
        .single();

      const fetchClient = supabase
        .from("profiles") // Assuming clients are also in the 'profiles' table
        .select("id, full_name")
        .eq("id", user.id) // Fetch the profile of the current user
        .single();

      // Execute both requests concurrently for better performance
      const [providerResponse, clientResponse] = await Promise.all([
        fetchProvider,
        fetchClient,
      ]);

      // Check the provider response
      if (providerResponse.error || !providerResponse.data) {
        setErrorMessage(`Could not find provider with ID: ${facilityId}.`);
        console.error("Provider fetch error:", providerResponse.error);
      } else {
        setProviderProfile(providerResponse.data);
      }

      // Check the client response
      if (clientResponse.error || !clientResponse.data) {
        setErrorMessage(`Could not find your user profile.`);
        console.error("Client fetch error:", clientResponse.error);
      } else {
        setClientProfile(clientResponse.data);
      }

      setIsLoading(false);
    };

    fetchAllProfiles();
  }, [facilityId, supabase]);

  const handleConfirmBooking = async () => {
    // Validation now checks for both profiles
    if (!isAgreed) return setErrorMessage("You must agree to the terms.");
    if (
      !selectedDate ||
      !selectedTime ||
      !providerProfile ||
      !clientProfile ||
      !selectedServices ||
      selectedServices.length === 0
    ) {
      return setErrorMessage("Booking details are incomplete.");
    }
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const appointmentToInsert = {
        client_id: clientProfile.id,
        provider_id: providerProfile.id,
        date: formatDateForDB(selectedDate), // Fixed: Use helper function to avoid timezone issues
        time: selectedTime,
        status: "pending",
        price: selectedServices.reduce((sum, s) => sum + s.price, 0),
      };
      const { error: insertError } = await supabase
        .from("appointments")
        .insert(appointmentToInsert);
      if (insertError)
        throw new Error(`Failed to save: ${insertError.message}`);

      resetBookingData();

      onNext();
      router.push("/booking-success");
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  };

  // Pre-flight check to ensure context has data
  if (
    !facilityId ||
    !selectedDate ||
    !selectedTime ||
    !selectedServices ||
    selectedServices.length === 0
  ) {
    return (
      <div className={styles.frameGroup}>
        <div
          className={styles.errorbox}
          style={{ visibility: "visible", opacity: 1 }}
        >
          <p>
            Your booking information is incomplete. Please start the process
            from the beginning.
          </p>
          <button
            onClick={() => router.push("/")}
            className={styles.buttoncontainer}
            style={{ opacity: 1, marginTop: "20px" }}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.loadingMessage}>Loading booking summary...</div>
    );
  }

  // --- REVISED RENDER SECTION ---
  // Render the component only when loading is false
  return (
    <div className={styles.frameGroup}>
      <div className={styles.numberParent}>
        <div className={styles.doubleCheckTheDetails}>
          Please double-check all the details of your booking before confirming.
        </div>
      </div>
      <div className={styles.calendarSelectChangeSize}>
        {/* Render only if BOTH profiles were fetched successfully */}
        {providerProfile && clientProfile ? (
          <>
            <div className={styles.facilityNameParent}>
              {/* --- Facility & Client Details --- */}
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Facility Name</div>
                <b className={styles.facilityNameCap}>
                  {providerProfile.business_name}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Address</div>
                <b className={styles.facilityNameCap}>
                  {providerProfile.address}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Name</div>
                <b className={styles.facilityNameCap}>
                  {clientProfile.full_name}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Contact</div>
                <b className={styles.facilityNameCap}>
                  {providerProfile.contact_number}
                </b>
              </div>

              {/* --- Booking Details --- */}
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Date</div>
                <b className={styles.facilityNameCap}>
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </b>
              </div>
              <div className={styles.rowContainer}>
                <div className={styles.facilityName}>Booking Time</div>
                <b className={styles.facilityNameCap}>{selectedTime}</b>
              </div>
            </div>
            <Image
              className={styles.dividerIcon}
              width={390}
              height={1}
              alt=""
              src="/Divider1.svg"
            />

            {/* --- Service Breakdown --- */}
            <div className={styles.serviceNameParent}>
              {selectedServices.map((service) => (
                <div className={styles.rowContainer} key={service.id}>
                  <div className={styles.facilityName}>{service.name}</div>
                  <b className={styles.facilityNameCap}>
                    {formatCurrency(service.price)}
                  </b>
                </div>
              ))}
            </div>
            <Image
              className={styles.dividerIcon1}
              width={390}
              height={1}
              alt=""
              src="/Divider1.svg"
            />

            {/* --- Total --- */}
            <div className={styles.rowContainerTotal}>
              <div className={styles.facilityName}>Total</div>
              <b className={styles.facilityNameCap}>
                {formatCurrency(
                  selectedServices.reduce((sum, s) => sum + s.price, 0)
                )}
              </b>
            </div>
          </>
        ) : // If either profile is null, the error message will be shown below.
        null}
      </div>

      <div
        className={styles.confirmSection}
        onClick={() => setIsAgreed(!isAgreed)}
        role="checkbox"
        aria-checked={isAgreed}
        tabIndex={0}
      >
        <div className={styles.header}>
          <div
            className={`${styles.checkbox} ${
              isAgreed ? styles.checkboxActive : ""
            }`}
          >
            {isAgreed && (
              <Image src="/check.svg" alt="check" width={13} height={13} />
            )}
          </div>
          <div className={styles.name}>
            I agree to and confirm this booking summary.
          </div>
        </div>
      </div>
      <div className={styles.messageWrapper}>
        {errorMessage && (
          <div className={`${styles.errorbox} ${styles.visible}`}>
            {errorMessage}
          </div>
        )}
      </div>
      <button
        className={styles.buttoncontainer}
        style={{
          opacity:
            isAgreed && !isSubmitting && providerProfile && clientProfile
              ? 1
              : 0.5,
          cursor:
            isAgreed && !isSubmitting && providerProfile && clientProfile
              ? "pointer"
              : "not-allowed",
        }}
        onClick={handleConfirmBooking}
        disabled={
          !isAgreed || isSubmitting || !providerProfile || !clientProfile
        }
      >
        <div className={styles.signup}>
          <div className={styles.signupText}>
            {isSubmitting ? "Confirming..." : "Confirm Appointment"}
          </div>
        </div>
      </button>
    </div>
  );
}