"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/RegisterPage1.module.css";
import {profile} from "../register-client/actions"

const ClientSignup4: NextPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const areRequiredFieldsFilled =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    selectedMonth !== "" &&
    selectedDay !== "" &&
    selectedYear !== "";

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1),
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  const handleMonthSelect = (month: { value: string; label: string }) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
  };

  const handleDaySelect = (day: { value: string; label: string }) => {
    setSelectedDay(day.label);
    setIsDayOpen(false);
  };

  const handleYearSelect = (year: { value: string; label: string }) => {
    setSelectedYear(year.label);
    setIsYearOpen(false);
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

   const validateForm = useCallback(() => {
    if (firstName.trim() === "") {
      return "First name is required.";
    }
    if (lastName.trim() === "") {
      return "Last name is required.";
    }
    if (!selectedMonth || !selectedDay || !selectedYear) {
      return "Please provide your full date of birth.";
    }
    return "";
  }, [firstName, lastName, selectedMonth, selectedDay, selectedYear]);

  const [showError, setShowError] = useState(false);
  const router = useRouter();
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      const validationError = validateForm(); 
    if (validationError) {
      setErrorMessage(validationError);
    } else {
      router.push("/");
    }
    }, 200);
  };

   useEffect(() => {
    if (errorMessage) {
      setErrorMessage(validateForm());
    }
  }, [firstName, lastName, selectedMonth, selectedDay, selectedYear, errorMessage, validateForm]);

  return (
    <form action={profile} className={styles.clientSignup4}>
      <div className={styles.clientSignup4}>
        <div className={styles.headerNavParent}>
          <div className={styles.headerNav}>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/servease logo.svg"
            />
            <div className={styles.links}>
              <div className={styles.home}>Home</div>
              <div className={styles.webDesigns}>Web designs</div>
              <div className={styles.webDesigns}>Mobile designs</div>
              <div className={styles.webDesigns}>Design principles</div>
              <div className={styles.webDesigns}>Illustrations</div>
            </div>
            <div className={styles.loginSignUp}>
              <div className={styles.dropdown} />
              <div className={styles.button} />
              <div className={styles.button} />
            </div>
            <div className={styles.divider} />
            <Image
              className={styles.outlineArrowsArrowLeft}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/Arrow Left.svg"
            />
            <div className={styles.back}>Back</div>
          </div>
          <div className={styles.joinUs}>
            <div className={styles.joinUsChild} />
            <div className={styles.joinUsParent}>
              <div className={styles.joinUs1}>Join us</div>
              <div className={styles.signUpAnd}>
                Sign up and get connected with trusted professionals.
              </div>
              <div className={styles.stepper}>
                <div className={styles.groupParent}>
                  <div className={styles.bgParent}>
                    <div className={styles.bg} />
                    <div className={styles.div}>1</div>
                  </div>
                  <div className={styles.profile}>Profile</div>
                </div>
                <div className={styles.stepperChild} />
                <div className={styles.groupContainer}>
                  <div className={styles.bgParent}>
                    <div className={styles.bg} />
                    <div className={styles.div}>2</div>
                  </div>
                  <div className={styles.profile}>Contacts</div>
                </div>
                <div className={styles.stepperChild} />
                <div className={styles.frameDiv}>
                  <div className={styles.bgParent}>
                    <div className={styles.bg} />
                    <div className={styles.div}>3</div>
                  </div>
                  <div className={styles.profile}>Login</div>
                </div>
              </div>
            </div>
            <div className={styles.frameParent}>
              <div className={styles.frameGroup}>
                <div className={styles.frameContainer}>
                  <div className={styles.numberParent}>
                    <div className={styles.number}>
                      <div className={styles.groupDiv}>
                        <div className={styles.bg3} />
                        <div className={styles.div3}>1</div>
                      </div>
                      <div className={styles.contactInformation}>Profile</div>
                    </div>
                    <div className={styles.tellUsA}>
                      Tell us a bit about yourself so we can personalize your
                      experience.
                    </div>
                    <div className={styles.allFieldsRequired}>
                      *All fields required unless noted.
                    </div>
                  </div>
                  <div className={styles.textField}>
                    <div className={styles.labelWrapper}>
                      <div className={styles.label}>*First name</div>
                    </div>
                    <div className={styles.textField1}>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                  <div className={styles.textField}>
                    <div className={styles.labelWrapper}>
                      <div className={styles.label}>
                        Middle name (as applicable)
                      </div>
                    </div>
                    <div className={styles.textField1}>
                      <input
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        placeholder="Enter your middle name"
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                  <div className={styles.textField}>
                    <div className={styles.labelWrapper}>
                      <div className={styles.label}>*Last name</div>
                    </div>
                    <div className={styles.textField1}>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        className={styles.inputField}
                      />
                    </div>
                  </div>
                  <div className={styles.gender}>
                    <div className={styles.webDesigns}>
                      What's your gender? (optional)
                    </div>
                    <div className={styles.genderOptionsContainer}>
                      <div
                        className={`${styles.genderOption} ${
                          selectedGender === "female"
                            ? styles.genderSelected
                            : ""
                        }`}
                        onClick={() => handleGenderSelect("female")}
                      >
                        <div className={styles.radioButton}>
                          <div className={styles.radioOuter}>
                            {selectedGender === "female" && (
                              <div className={styles.radioInner} />
                            )}
                          </div>
                        </div>
                        <span className={styles.genderLabel}>Female</span>
                      </div>

                      <div
                        className={`${styles.genderOption} ${
                          selectedGender === "male" ? styles.genderSelected : ""
                        }`}
                        onClick={() => handleGenderSelect("male")}
                      >
                        <div className={styles.radioButton}>
                          <div className={styles.radioOuter}>
                            {selectedGender === "male" && (
                              <div className={styles.radioInner} />
                            )}
                          </div>
                        </div>
                        <span className={styles.genderLabel}>Male</span>
                      </div>

                      <div
                        className={`${styles.genderOption} ${
                          selectedGender === "non-binary"
                            ? styles.genderSelected
                            : ""
                        }`}
                        onClick={() => handleGenderSelect("non-binary")}
                      >
                        <div className={styles.radioButton}>
                          <div className={styles.radioOuter}>
                            {selectedGender === "non-binary" && (
                              <div className={styles.radioInner} />
                            )}
                          </div>
                        </div>
                        <span className={styles.genderLabel}>Non-binary</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.gender}>
                  <div className={styles.webDesigns}>
                    What's your date of birth?
                  </div>
                  <div className={styles.textFieldParent}>
                    <div className={styles.textField6}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Month</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div
                          className={`${styles.textField2} ${
                            isMonthOpen ? styles.dropdownOpen : ""
                          } ${selectedMonth ? styles.fieldSelected : ""}`}
                          onClick={() => setIsMonthOpen(!isMonthOpen)}
                        >
                          <div className={styles.month}>
                            <span
                              className={
                                selectedMonth ? styles.selectedValue : ""
                              }
                            >
                              {selectedMonth || "Select month"}
                            </span>
                          </div>
                          <div className={styles.icons}>
                            <Image
                              className={`${styles.vectorIcon7} ${
                                isMonthOpen ? styles.rotated : ""
                              }`}
                              width={12}
                              height={7.4}
                              sizes="100vw"
                              alt=""
                              src="/icons.svg"
                            />
                          </div>
                        </div>
                        {isMonthOpen && (
                          <div className={styles.dropdownMenu}>
                            {months.map((month) => (
                              <div
                                key={month.value}
                                className={styles.dropdownItem}
                                onClick={() => handleMonthSelect(month)}
                              >
                                {month.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Day</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div
                          className={`${styles.textField2} ${
                            isDayOpen ? styles.dropdownOpen : ""
                          } ${selectedDay ? styles.fieldSelected : ""}`}
                          onClick={() => setIsDayOpen(!isDayOpen)}
                        >
                          <div className={styles.day}>
                            <span
                              className={
                                selectedDay ? styles.selectedValue : ""
                              }
                            >
                              {selectedDay || "Select day"}
                            </span>
                          </div>
                          <div className={styles.icons}>
                            <Image
                              className={`${styles.vectorIcon7} ${
                                isDayOpen ? styles.rotated : ""
                              }`}
                              width={12}
                              height={7.4}
                              sizes="100vw"
                              alt=""
                              src="/icons.svg"
                            />
                          </div>
                        </div>
                        {isDayOpen && (
                          <div className={styles.dropdownMenu}>
                            {days.map((day) => (
                              <div
                                key={day.value}
                                className={styles.dropdownItem}
                                onClick={() => handleDaySelect(day)}
                              >
                                {day.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.textField8}>
                      <div className={styles.labelWrapper}>
                        <div className={styles.label}>Year</div>
                      </div>
                      <div className={styles.dropdownContainer}>
                        <div
                          className={`${styles.textField2} ${
                            isYearOpen ? styles.dropdownOpen : ""
                          } ${selectedYear ? styles.fieldSelected : ""}`}
                          onClick={() => setIsYearOpen(!isYearOpen)}
                        >
                          <div className={styles.year}>
                            <span
                              className={
                                selectedYear ? styles.selectedValue : ""
                              }
                            >
                              {selectedYear || "Select year"}
                            </span>
                          </div>
                          <div className={styles.icons}>
                            <Image
                              className={`${styles.vectorIcon7} ${
                                isYearOpen ? styles.rotated : ""
                              }`}
                              width={12}
                              height={7.4}
                              sizes="100vw"
                              alt=""
                              src="/icons.svg"
                            />
                          </div>
                        </div>
                        {isYearOpen && (
                          <div className={styles.dropdownMenu}>
                            {years.map((year) => (
                              <div
                                key={year.value}
                                className={styles.dropdownItem}
                                onClick={() => handleYearSelect(year)}
                              >
                                {year.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                   <div 
                   className={`${styles.errorMessage} ${
                    errorMessage ? styles.errorDetected : ""
                  }`}
                >
                  {errorMessage}
                  </div>
                </div>
                <div
                  className={`${styles.button2} ${
                    validateForm() === "" ? styles.filled : ""}
                    ${isClicked ? styles.clicked : ""
                  }`}
                   onClick={handleClick}
                >
                  <div className={styles.signUpWrapper}>
                    <div className={styles.webDesigns}>Next</div>
                  </div>
                </div>
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.frameWrapper1}>
                  <div className={styles.numberWrapper}>
                    <div className={styles.number1}>
                      <div className={styles.groupDiv}>
                        <div className={styles.bg3} />
                        <div className={styles.div3}>2</div>
                      </div>
                      <div className={styles.contactInformation}>
                        Contact Information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.frameWrapper1}>
                  <div className={styles.numberWrapper}>
                    <div className={styles.number1}>
                      <div className={styles.groupDiv}>
                        <div className={styles.bg3} />
                        <div className={styles.div3}>3</div>
                      </div>
                      <div className={styles.contactInformation}>Login</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClientSignup4;
