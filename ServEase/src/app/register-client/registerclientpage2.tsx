"use client"; // <--- THIS IS THE FIX

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import styles from "../styles/register-client-2.module.css";
import { profile } from "./actions2";

type Props = {
  onNext: () => void;
};

export default function ClientSignup2({ onNext }: Props) {
  // ... (all your existing state variables like selectedMonth, firstName, etc. remain the same)
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [monthError, setMonthError] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    birthdate: false,
  });
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  /*const validateForm = useCallback(() => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !selectedMonth ||
      !selectedDay ||
      !selectedYear
    ) {
      return "Please fill in all required fields.";
    }
    return "";
  }, [firstName, lastName, selectedMonth, selectedDay, selectedYear]);*/
  const validateForm = useCallback(() => {
    const errors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      birthdate: !(selectedMonth && selectedDay && selectedYear),
    };

    setFieldErrors(errors);

    if (errors.firstName || errors.lastName || errors.birthdate) {
      return "Please fill in all required fields.";
    }
    if (!firstName.trim()) {
      setFirstNameError(true);
      return "Please enter your first name.";
    }
    if (!selectedMonth) {
      setMonthError(true);
      return "Please select a month.";
    }
    setFirstNameError(false);
    return "";
  }, [firstName, lastName, selectedMonth, selectedDay, selectedYear]);

  const handleNextClick = () => {
    console.log("1. 'Next' button clicked.");
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);

      const validationError = validateForm();
      if (validationError) {
        console.error("2. Validation FAILED:", validationError);
        setErrorMessage(validationError);
        return;
      }

      console.log("2. Validation PASSED.");
      setErrorMessage("");

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        console.log(
          "3. Data prepared for server action. Here are the contents:"
        );
        for (const [key, value] of formData.entries()) {
          console.log(`   - ${key}: "${value}"`);
        }
        startTransition(async () => {
          console.log("4. Calling the server action `profile`...");
          try {
            await profile(formData);
          } catch (e) {
            console.error("5. The server action threw an error:", e);
            setErrorMessage(
              "Submission failed on the server. Please check logs."
            );
          }
        });
        onNext();
      }
    }, 200);
  };

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(validateForm());
    }
  }, [
    firstName,
    lastName,
    selectedMonth,
    selectedDay,
    selectedYear,
    errorMessage,
    validateForm,
  ]);

  const formIsFilled =
    firstName && lastName && selectedMonth && selectedDay && selectedYear;

  const handleMonthSelect = (month: { label: string }) => {
    setSelectedMonth(month.label);
    setIsMonthOpen(false);
  };
  const handleDaySelect = (day: { label: string }) => {
    setSelectedDay(day.label);
    setIsDayOpen(false);
  };
  const handleYearSelect = (year: { label: string }) => {
    setSelectedYear(year.label);
    setIsYearOpen(false);
  };
  const handleGenderSelect = (gender: string) => setSelectedGender(gender);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
  }));
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));

  return (
    <form ref={formRef} className={styles.frameGroup}>
      {/* ... (all your input fields and other form elements go here as before) ... */}
      <div className={styles.frameContainer}>
        <div className={styles.numberParent}>
          <div className={styles.tellUsA}>
            Tell us a bit about yourself so we can personalize your experience.
          </div>
          <div className={styles.allFieldsRequired}>
            *All fields required unless noted.
          </div>
        </div>
        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>*First name</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              firstName ? styles.tbxFilled : ""
            } ${errorMessage ? styles.errorInput : ""}`}
          >
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);

                // Clear field-level error if user starts typing
                if (firstNameError && e.target.value.trim() !== "") {
                  setFirstNameError(false);
                }
              }}
              placeholder="Enter your first name"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.textField}>
          <div className={styles.labelWrapper}>
            <div className={styles.label}>Middle name (as applicable)</div>
          </div>
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              middleName ? styles.tbxFilled : ""
            } ${errorMessage ? styles.errorInput : ""}`}
          >
            <input
              type="text"
              name="middle_name"
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
          <div
            className={`${styles.tbxemail} ${styles.inputBox} ${
              lastName ? styles.tbxFilled : ""
            } ${errorMessage ? styles.errorInput : ""}`}
          >
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Enter your last name"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.gender}>
          <div className={styles.webDesigns}>
            What is your gender? (optional)
          </div>
          <div className={styles.genderOptionsContainer}>
            <div
              className={`${styles.genderOption} ${
                selectedGender === "female" ? styles.genderSelected : ""
              }`}
              onClick={() => handleGenderSelect("female")}
            >
              <div className={styles.radioButton}>
                <div
                  className={`${styles.radioOuter} 
            } ${errorMessage ? styles.errorCircle : ""}`}
                >
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
                <div
                  className={`${styles.radioOuter} 
            } ${errorMessage ? styles.errorCircle : ""}`}
                >
                  {selectedGender === "male" && (
                    <div className={styles.radioInner} />
                  )}
                </div>
              </div>
              <span className={styles.genderLabel}>Male</span>
            </div>

            <div
              className={`${styles.genderOption} ${
                selectedGender === "non-binary" ? styles.genderSelected : ""
              }`}
              onClick={() => handleGenderSelect("non-binary")}
            >
              <div className={styles.radioButton}>
                <div
                  className={`${styles.radioOuter} 
            } ${errorMessage ? styles.errorCircle : ""}`}
                >
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
        <div className={styles.webDesigns}>What is your date of birth?</div>
        <div className={styles.textFieldParent}>
          <div className={styles.textField6}>
            <div className={styles.labelWrapper}>
              <div className={styles.label}>Month</div>
            </div>
            <div className={styles.dropdownContainer}>
              <div
                className={`${styles.textField2} ${
                  isMonthOpen ? styles.dropdownOpen : ""
                } ${selectedMonth ? styles.fieldSelected : ""} ${
                  errorMessage ? styles.errorInput : ""
                }`}
                onClick={() => {
                  setIsMonthOpen(!isMonthOpen);
                  if (monthError) setMonthError(false);
                }}
              >
                <div className={styles.month}>
                  <span className={selectedMonth ? styles.selectedValue : ""}>
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
                      onClick={() => {
                        handleMonthSelect(month);
                        if (monthError) setMonthError(false);
                      }}
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
                } ${selectedMonth ? styles.fieldSelected : ""} ${
                  errorMessage ? styles.errorInput : ""
                }`}
                onClick={() => setIsDayOpen(!isDayOpen)}
              >
                <div className={styles.day}>
                  <span className={selectedDay ? styles.selectedValue : ""}>
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
                } ${selectedYear ? styles.fieldSelected : ""}${
                  errorMessage ? styles.errorInput : ""
                }`}
                onClick={() => setIsYearOpen(!isYearOpen)}
              >
                <div className={styles.year}>
                  <span className={selectedYear ? styles.selectedValue : ""}>
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
        <input type="hidden" name="gender" value={selectedGender} />
        <input type="hidden" name="birth_month" value={selectedMonth} />
        <input type="hidden" name="birth_day" value={selectedDay} />
        <input type="hidden" name="birth_year" value={selectedYear} />

        <div
          className={`${styles.errorMessage} ${
            errorMessage ? styles.errorDetected : ""
          }
                  }`}
        >
          {errorMessage}
        </div>
      </div>

      {/* --- MODIFIED BUTTON --- */}
      <button
        // CRITICAL: Change type to "button" to prevent auto-submission
        type="button"
        disabled={isPending} // Only disable while submitting
        // Use isClicked for your animation and isFormValid for styling
        className={`${styles.button2} ${formIsFilled ? styles.filled : ""} ${
          isClicked ? styles.clicked : "" // Assuming you have a .clicked class for animation
        } ${isPending ? styles.submitting : ""}`}
        onClick={handleNextClick} // This is our new master handler
      >
        <div className={styles.signUpWrapper}>
          <div className={styles.webDesigns}>Next</div>
        </div>
      </button>
    </form>
  );
}