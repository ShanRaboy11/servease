"use client";
import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import styles from "../styles/LoginPage.module.css";

const Login: NextPage = () => {
  const onTabsNavContainerClick = useCallback(() => {
    console.log("Sign up clicked");
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.image} />
      <div className={styles.signUpWindowOverlayParent}>
        <div className={styles.signUpWindowOverlay}>
          <div className={styles.icons} />
        </div>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.frameWrapper}>
              <div className={styles.tabsNavParent}>
                <div className={styles.tabsNav}>
                  <div className={styles.signUp}>Log In</div>
                </div>
                <div
                  className={styles.tabsNav1}
                  onClick={onTabsNavContainerClick}
                >
                  <div className={styles.signUp1}>Sign Up</div>
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
            <div className={styles.frameContainer}>
              <div className={styles.textFieldWrapper}>
                <div className={styles.textField}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>Email address</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
              </div>
              <div className={styles.textFieldParent}>
                <div className={styles.textField2}>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label}>Password</div>
                  </div>
                  <div className={styles.textField1} />
                </div>
                <div className={styles.eyeOff}>
                  <Image
                    className={styles.icon}
                    width={34}
                    height={28}
                    sizes="100vw"
                    alt="Eye Icon"
                    src="/Icon.svg"
                  />
                </div>
                <div className={styles.action}>
                  <div className={styles.checkbox}>
                    <Image
                      className={styles.boldEssentionalUiCheck}
                      width={22}
                      height={22}
                      sizes="100vw"
                      alt="Check Icon"
                      src="/Bold/EssentionalUI/CheckSquare.svg"
                    />
                    <div className={styles.rememberMe}>Remember me</div>
                  </div>
                  <div className={styles.forgetPassword}>Forget Password</div>
                </div>
              </div>
              <div className={styles.button}>
                <div className={styles.signUpWrapper}>
                  <div className={styles.rememberMe}>Log In</div>
                </div>
              </div>
              <div className={styles.haveAnAccountLogin}>
                <div
                  className={styles.welcomeToServeaseContainer}
                  onClick={onTabsNavContainerClick}
                >
                  <span className={styles.dontHaveAn}>
                    Don’t have an account?{" "}
                  </span>
                  <span className={styles.signUp3}>Sign up</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.label2}>email address</div>
          <div className={styles.label3}>••••••••</div>
        </div>
      </div>
      <div className={styles.icons1}>
        <Image
          className={styles.vectorIcon}
          width={32}
          height={32}
          sizes="100vw"
          alt="Vector Icon"
          src="/Vector.svg"
        />
        <Image
          className={styles.vectorIcon1}
          width={19}
          height={19}
          sizes="100vw"
          alt="Vector Icon Small"
          src="/Vector.svg"
        />
      </div>
      <Image
        className={styles.export2Icon}
        width={832}
        height={978}
        sizes="100vw"
        alt="Export"
        src="/logo.png"
      />
    </div>
  );
};

export default Login;
