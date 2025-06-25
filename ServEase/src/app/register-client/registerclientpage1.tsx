"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/RegisterFacilityPage1copy.module.css";
import { clientLoginCredentials } from "./actions1";

type InitialData = {
  email?: string;
  password?: string;
} | null;

type Props = {
  onNext: (data: { email: string }) => void;
  initialData: InitialData;
  isCompleted: boolean;
};

export default function ClientSignup1({
  onNext,
  initialData,
  isCompleted,
}: Props) {
  const [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(!isCompleted);

  useEffect(() => {
    if (initialData?.email) {
      setEmail(initialData.email);
    }
    setIsEditing(!isCompleted);
  }, [initialData, isCompleted]);

  const handleUpdatePasswordClick = () => {
    // When the user wants to change their password, clear the fields and enter editing mode.
    setPassword("");
    setConfirmPassword("");
    setIsEditing(true);
  };

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSignUpClick = async () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 200);

    let newFieldErrors = {
      email: false,
      password: false,
      confirmPassword: false,
    };

    if (!email || !password || !confirmPassword) {
      if (!email) newFieldErrors.email = true;
      if (!password) newFieldErrors.password = true;
      if (!confirmPassword) newFieldErrors.confirmPassword = true;

      setFieldErrors(newFieldErrors);
      setError("Please fill in all required fields.");
      setShowError(true);
      return;
    }

    if (!validateEmail(email)) {
      newFieldErrors.email = true;
      setFieldErrors(newFieldErrors);
      setError("Please enter a valid email address.");
      setShowError(true);
      return;
    }

    if (password.length < 8) {
      newFieldErrors.password = true;
      setFieldErrors(newFieldErrors);
      setError("Password must be at least 8 characters long.");
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      newFieldErrors.password = true;
      newFieldErrors.confirmPassword = true;
      setFieldErrors(newFieldErrors);
      setError("Passwords do not match.");
      setShowError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      await clientLoginCredentials(formData);
      setFieldErrors(newFieldErrors);
      setError("");
      setShowError(false);
      console.log("Form is valid, proceeding to next step");
      onNext({ email });
      setIsEditing(false);
    } catch (error) {
      console.log("Error registration");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: false }));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: false }));
    }
  };

  const isFormValid =
    email &&
    password &&
    confirmPassword &&
    validateEmail(email) &&
    password === confirmPassword &&
    password.length >= 8;

  if (isCompleted && !isEditing) {
    password="fakepassword123";
    confirmPassword="fakepassword123";
    return (
      <div className={styles.login2}>
      <div className={styles.loginDescrip}>
        <div className={styles.loginDescrip1}>
          <div className={styles.setUpYour}>
            Set up your login credential to keep your account secure. We’ll send
            a one-time link to confirm it’s really you.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>
      </div>
      <div className={styles.loginForm}>
        <div className={styles.email}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Email address</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              email ? styles.tbxFilled : ""
            } ${fieldErrors.email ? styles.errorInput : ""}`}
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={styles.passwordInput}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div className={styles.password}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Password</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              password ? styles.tbxFilled : ""
            } ${fieldErrors.password ? styles.errorInput : ""}`}
          >
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={styles.passwordInput}
              placeholder="Enter password"
            />
            <Image
              className={styles.hideIcon}
              width={30}
              height={25}
              sizes="100vw"
              alt={passwordVisible ? "Hide password" : "Show password"}
              src={passwordVisible ? "/show.svg" : "/hide.svg"}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className={styles.confirmPassword}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Confirm Password</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              confirmPassword ? styles.tbxFilled : ""
            } ${fieldErrors.confirmPassword ? styles.errorInput : ""}`}
          >
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={styles.passwordInput}
              placeholder="Confirm your password"
            />
            <Image
              className={styles.hideIcon1}
              width={30}
              height={25}
              sizes="100vw"
              alt={confirmPasswordVisible ? "Hide password" : "Show password"}
              src={confirmPasswordVisible ? "/show.svg" : "/hide.svg"}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <div
          className={`${styles.errorbox} ${
            showError ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.errorMessage}>{error}</div>
        </div>
        <div
          className={`${styles.buttoncontainer} ${
            buttonClicked ? styles.clicked : ""
          } ${isFormValid ? "" : styles.disabled}`}
          style={{
            backgroundColor: "#a68465",
            opacity: isFormValid ? "1" : "0.5",
            transition: "opacity 0.2s ease",
          }}
          onClick={handleSignUpClick}
        >
          <div className={styles.signup}>
            <div className={styles.signupText}>Next</div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className={styles.login2}>
      <div className={styles.loginDescrip}>
        <div className={styles.loginDescrip1}>
          <div className={styles.setUpYour}>
            Set up your login credential to keep your account secure. We’ll send
            a one-time link to confirm it’s really you.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>
      </div>
      <div className={styles.loginForm}>
        <div className={styles.email}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Email address</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              email ? styles.tbxFilled : ""
            } ${fieldErrors.email ? styles.errorInput : ""}`}
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={styles.passwordInput}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div className={styles.password}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Password</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              password ? styles.tbxFilled : ""
            } ${fieldErrors.password ? styles.errorInput : ""}`}
          >
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={styles.passwordInput}
              placeholder="Enter password"
            />
            <Image
              className={styles.hideIcon}
              width={30}
              height={25}
              sizes="100vw"
              alt={passwordVisible ? "Hide password" : "Show password"}
              src={passwordVisible ? "/show.svg" : "/hide.svg"}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className={styles.confirmPassword}>
          <div className={styles.emailLabel}>
            <div className={styles.label}>*Confirm Password</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              confirmPassword ? styles.tbxFilled : ""
            } ${fieldErrors.confirmPassword ? styles.errorInput : ""}`}
          >
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={styles.passwordInput}
              placeholder="Confirm your password"
            />
            <Image
              className={styles.hideIcon1}
              width={30}
              height={25}
              sizes="100vw"
              alt={confirmPasswordVisible ? "Hide password" : "Show password"}
              src={confirmPasswordVisible ? "/show.svg" : "/hide.svg"}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <div
          className={`${styles.errorbox} ${
            showError ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.errorMessage}>{error}</div>
        </div>
        <div
          className={`${styles.buttoncontainer} ${
            buttonClicked ? styles.clicked : ""
          } ${isFormValid ? "" : styles.disabled}`}
          style={{
            backgroundColor: "#a68465",
            opacity: isFormValid ? "1" : "0.5",
            transition: "opacity 0.2s ease",
          }}
          onClick={handleSignUpClick}
        >
          <div className={styles.signup}>
            <div className={styles.signupText}>Next</div>
          </div>
        </div>
      </div>
    </div>
  );
}
