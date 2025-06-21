"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/signup.module.css";

const Signup: NextPage = () => {
  const [selectedUserType, setSelectedUserType] = useState<
    "client" | "service" | null
  >(null);
  const [hoveredUserType, setHoveredUserType] = useState<
    "client" | "service" | null
  >(null);
  const [showError, setShowError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleSelect = (type: "client" | "service") => {
    setSelectedUserType(type);
    setShowError(false);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      if (!selectedUserType) {
        setShowError(true);
      } else {
        router.push("/login");
      }
    }, 200);
  };

  const showHover = (type: "client" | "service") => {
    return (
      selectedUserType === type ||
      (selectedUserType === null && hoveredUserType === type)
    );
  };

  return (
    <div className={styles.signup}>
      <div className={styles.signup1}>
        <div className={styles.background} />
        <div className={styles.authwindow}>
          <div className={styles.authwindow1} />
          <div className={styles.authcontent}>
            <div className={styles.signupcontent}>
              <div className={styles.navigationbar}>
                <div className={styles.navbar}>
                  <div
                    className={styles.login}
                    onClick={() => router.push("/login")}
                  >
                    <div className={styles.logIn}>Log In</div>
                  </div>
                  <div className={styles.signup2}>
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
                <div className={styles.createYourAccount}>
                  Create your account to get started now.
                </div>
              </div>
              <div className={styles.usertype}>
                <div
                  className={styles.service}
                  onClick={() => handleSelect("service")}
                  onMouseEnter={() =>
                    selectedUserType === null && setHoveredUserType("service")
                  }
                  onMouseLeave={() => {
                    if (selectedUserType === null) setHoveredUserType(null);
                  }}
                >
                  {showHover("service") && (
                    <div className={styles.hoverselect}>
                      <div className={styles.hoverselectcircle}></div>
                      <Image
                        className={styles.hovercheckIcon}
                        src="/check.svg"
                        width={15}
                        height={11}
                        alt=""
                      />
                    </div>
                  )}
                  <div className={styles.service1}>
                    <div className={styles.serviceProvider}>
                      Service Provider
                    </div>
                    <div className={styles.imRunningA}>
                      I’m running a service-based business
                    </div>
                  </div>
                  <Image
                    className={styles.service3Icon}
                    width={35}
                    height={35}
                    sizes="100vw"
                    alt=""
                    src="/service 3.svg"
                  />
                  <Image
                    className={styles.service2Icon}
                    width={35}
                    height={35}
                    sizes="100vw"
                    alt=""
                    src="/service 2.svg"
                  />
                  <Image
                    className={styles.service1Icon}
                    width={45}
                    height={45}
                    sizes="100vw"
                    alt=""
                    src="/service 1.svg"
                  />
                  <div className={styles.notselected}>
                    <div className={styles.notselected1} />
                    <div className={styles.notselected2} />
                  </div>
                </div>

                <div
                  className={styles.client}
                  onClick={() => handleSelect("client")}
                  onMouseEnter={() =>
                    selectedUserType === null && setHoveredUserType("client")
                  }
                  onMouseLeave={() => {
                    if (selectedUserType === null) setHoveredUserType(null);
                  }}
                >
                  {showHover("client") && (
                    <div className={styles.hoverselect}>
                      <div className={styles.hoverselectcircle}></div>
                      <Image
                        className={styles.hovercheckIcon}
                        src="/check.svg"
                        width={15}
                        height={11}
                        alt=""
                      />
                    </div>
                  )}
                  <div className={styles.notselected}>
                    <div className={styles.notselected1} />
                    <div className={styles.notselected5} />
                  </div>
                  <div className={styles.client1}>
                    <div className={styles.serviceProvider}>Client</div>
                    <div className={styles.imRunningA}>
                      I’m looking for trusted service providers
                    </div>
                  </div>
                  <Image
                    className={styles.client3Icon}
                    width={35}
                    height={35}
                    sizes="100vw"
                    alt=""
                    src="/client 3.svg"
                  />
                  <Image
                    className={styles.service2Icon}
                    width={35}
                    height={35}
                    sizes="100vw"
                    alt=""
                    src="/client 2.svg"
                  />
                  <Image
                    className={styles.client1Icon}
                    width={45}
                    height={45}
                    sizes="100vw"
                    alt=""
                    src="/client 1.svg"
                  />
                </div>
              </div>
              <div className={styles.buttonSection}>
                <div
                  className={`${styles.errorbox} ${
                    showError ? styles.visible : styles.hidden
                  }`}
                >
                  Please select a user type before continuing.
                </div>
                <div
                  className={`${styles.buttoncontainer} 
                    ${selectedUserType ? styles.buttoncontainerActive : ""} 
                    ${isClicked ? styles.clicked : ""}`}
                  onClick={handleClick}
                >
                  <div className={styles.buttontext}>
                    <div className={styles.signUp1}>Create My Account</div>
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
        />
        <Image
          className={styles.authlogoIcon}
          width={832}
          height={978}
          sizes="100vw"
          alt=""
          src="/authLogo.svg"
        />
      </div>
    </div>
  );
};

export default Signup;
