"use client";

import "../styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/login.module.css";
import { login } from "./actions";

const Login: NextPage = () => {
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const toggleRememberMe = () => {
    setRememberMeChecked(!rememberMeChecked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setIsClicked(true);
    setError("");
    setShowError(false);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!email || !password) {
      setError("Please fill in all required fields.");
      setShowError(true);
      setTimeout(() => setIsClicked(false), 100);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setShowError(true);
      setTimeout(() => setIsClicked(false), 100);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      setError(undefined); // Clear previous errors

      // Call the server action
      const result = await login(formData);

      // Handle the result
      if (result.success) {
        router.push("/discover");
      } else {
        setError(
          result.error || "Login failed. Please check your credentials."
        );
        setShowError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
      setShowError(true);
    } finally {
      setTimeout(() => setIsClicked(false), 200);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login1}>
        <Image
          className={styles.authlogoIcon}
          width={832}
          height={978}
          sizes="100vw"
          alt=""
          src="/authLogo.svg"
        />
        <div className={styles.background} />

        <div className={styles.authwindow}>
          <div className={styles.authwindow1} />
          <div className={styles.authcontent}>
            <div className={styles.logincontent}>
              <div className={styles.navigationbar}>
                <div className={styles.navbar}>
                  <div className={styles.login2}>
                    <div className={styles.logIn}>Log In</div>
                  </div>
                  <div
                    className={styles.signup}
                    onClick={() => router.push("/signup")}
                  >
                    <div className={styles.signUp}>Sign Up</div>
                  </div>
                </div>
              </div>

              <div className={styles.title}>
                <div className={styles.welcomeToServeaseContainer}>
                  <span>Welcome to serv</span>
                  <b>ease</b>
                  <span>!</span>
                </div>
                <div className={styles.pleaseLogIn}>
                  Please log in to access your account.
                </div>
              </div>

              <div className={styles.userinputs}>
                <div className={styles.email}>
                  <div className={styles.email1}>
                    <div className={styles.emailAddress}>
                      <div className={styles.label}>Email address</div>
                    </div>
                    <div
                      className={`${styles.tbx} ${styles.inputBox} 
    ${email ? styles.tbxFilled : ""} 
    ${showError && (!email || !validateEmail(email)) ? styles.tbxError : ""}`}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className={styles.passwordInput}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.password}>
                  <div className={styles.password1}>
                    <div className={styles.emailAddress}>
                      <div className={styles.label}>Password</div>
                    </div>
                    <div
                      className={`${styles.tbx} ${styles.inputBox} 
    ${password ? styles.tbxFilled : ""} 
    ${showError && !password ? styles.tbxError : ""}`}
                    >
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={styles.passwordInput}
                      />
                      <Image
                        className={styles.hideIcon}
                        width={30}
                        height={25}
                        alt={
                          passwordVisible ? "Hide password" : "Show password"
                        }
                        src={passwordVisible ? "show.svg" : "hide.svg"}
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                  </div>

                  <div className={styles.action}>
                    <div
                      className={styles.rememberMe}
                      onClick={toggleRememberMe}
                    >
                      <div className={styles.stateLayer}>
                        <div
                          className={
                            rememberMeChecked
                              ? styles.checkedContainer
                              : styles.container
                          }
                        >
                          {rememberMeChecked && (
                            <Image
                              className={styles.checkIcon}
                              width={14}
                              height={14}
                              alt="check"
                              src="check.svg"
                            />
                          )}
                        </div>
                      </div>
                      <div className={styles.rememberMe1}>Remember me</div>
                    </div>
                    <div className={styles.forgetPassword}>Forget Password</div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonSection}>
                <div
                  className={`${styles.errorbox} ${
                    showError ? styles.visible : styles.hidden
                  }`}
                >
                  {error}
                </div>
                <div
                  className={`${styles.buttoncontainer} 
                    ${email && password ? styles.buttoncontainerActive : ""} 
                    ${isClicked ? styles.clicked : ""}`}
                  onClick={handleLogin}
                >
                  <div className={styles.buttontext}>
                    <div className={styles.rememberMe1z}>Log In</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          className={styles.closeIcon}
          width={32}
          height={32}
          sizes="100vw"
          alt=""
          src="/close.svg"
          onClick={() => router.push("/home")}
        />
      </div>
    </div>
  );
};

export default Login;
