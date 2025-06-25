"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/register-client-3.module.css";
import {addContactAndCompleteProfile} from "./actions3";

type Props = {
  onNext: () => void;
};

const ClientSignup3: NextPage<Props> = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const [countryCode] = useState("+63");
  const [codeSent, setCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpErrors, setOtpErrors] = useState([false, false, false, false]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const otpRefs = useRef<HTMLInputElement[]>([]);

  const router = useRouter();

  const isPhoneValid = phone.replace(/\D/g, "").trim().length === 10;
  const isOtpValid = otp.every((digit) => /^\d$/.test(digit));
  const isNextEnabled = codeSent && isOtpValid;

  const handlePhoneChange = (input: string) => {
    const raw = input.replace(/\D/g, "").slice(0, 10);
    const hasLetters = /[a-zA-Z]/.test(input);

    setPhoneError(hasLetters);

    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)} ${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)} ${raw.slice(3, 7)} ${raw.slice(7, 10)}`;
    }

    setPhone(formatted);
    setErrorMessage("");
  };

  const handleSendCode = async () => {
    setErrorMessage("");
    try {
      if (!isPhoneValid)
        throw new Error("Enter a valid 10-digit phone number.");

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOtp(["", "", "", ""]);
      setCodeSent(true);
      setTimer(60);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (codeSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [codeSent, timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    const newErrors = [...otpErrors];

    if (/^\d?$/.test(value)) {
      newOtp[index] = value;
      newErrors[index] = false;
      setOtpErrorMessage(""); // Clear error

      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    } else {
      newErrors[index] = true;
      setOtpErrorMessage("Only digits (0-9) are allowed in the code.");
    }

    setOtp(newOtp);
    setOtpErrors(newErrors);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (!isOtpValid) throw new Error("Please enter a valid 4-digit code");

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const formData = new FormData();
      formData.append('contact', countryCode + phone);
      await addContactAndCompleteProfile(formData);
      router.push("/landingpage");
    } catch (error: any) {
      setErrorMessage(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.frameGroup}>
      <div className={styles.frameParent1}>
        <div className={styles.numberParent}>
          <div className={styles.provideYourPhone}>
            Provide your phone number so we can confirm your bookings and verify
            your account.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>

        <div className={styles.cardInput}>
          <div className={styles.labelParent}>
            <div className={styles.label}>*Phone number</div>
          </div>

          <div className={styles.inputButton}>
            <div className={styles.input}>
              <div className={styles.select}>
                <Image
                  src="/ph Philippines.svg"
                  alt=""
                  width={33}
                  height={24}
                />
              </div>
              <div className={styles.webDesigns}>({countryCode})</div>
              <input
                type="text"
                placeholder="Enter 10-digit number"
                value={phone}
                maxLength={13}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={styles.div6}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                }}
              />
            </div>

            <div
              className={styles.button2}
              onClick={handleSendCode}
              style={{
                opacity: isPhoneValid ? "1" : "0.5",
                cursor: isPhoneValid && !loading ? "pointer" : "not-allowed",
              }}
            >
              <div className={styles.sendCode}>
                {loading ? "Sending..." : "Send Code"}
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/Line 15.svg"
          alt=""
          width={611}
          height={1.5}
          className={styles.frameChild}
        />

        <div className={styles.form}>
          <div className={styles.resendCode}>
            <div className={styles.time}>
              <Image src="/Clock.svg" alt="" width={20} height={20} />
              <div className={styles.div7}>
                00 : {timer.toString().padStart(2, "0")}
              </div>
            </div>

            <div
              className={styles.resendCode1}
              onClick={() => timer === 0 && handleSendCode()}
              style={{
                opacity: timer === 0 ? 1 : 0.4,
                cursor: timer === 0 ? "pointer" : "not-allowed",
              }}
            >
              Resend Code
            </div>
          </div>

          <div className={styles.inputs}>
            <div className={styles.list}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={i === 0 ? styles.input1 : styles.input2}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={(el) => {
                      if (el) otpRefs.current[i] = el;
                    }}
                    type="text"
                    value={otp[i]}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    disabled={!codeSent}
                    maxLength={1}
                    autoComplete="one-time-code"
                    className={`${styles.otpInput} ${
                      otpErrors[i] ? styles.otpError : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.privacyNotice} ${
            errorMessage || phoneError || otpErrorMessage
              ? styles.hidden
              : styles.visible
          }`}
        >
          Your privacy is our priority. This information is used only for
          account verification and to personalize your experience. We will sell
          your data.
        </div>

        <div
          className={`${styles.errorbox} ${
            errorMessage || phoneError || otpErrorMessage
              ? styles.visible
              : styles.hidden
          }`}
        >
          Phone number must only contain digits.
        </div>
      </div>

      <div
        className={styles.button3}
        style={{
          backgroundColor: "#a68465",
          opacity: isNextEnabled ? "1" : "0.5",
          transition: "opacity 0.2s ease",
          cursor: isNextEnabled ? "pointer" : "not-allowed",
        }}
        onClick={isNextEnabled ? handleSubmit : undefined}
      >
        <div className={styles.signUpWrapper}>
          <div className={styles.webDesigns}>
            {loading ? "Verifying..." : "Sign Up"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup3;