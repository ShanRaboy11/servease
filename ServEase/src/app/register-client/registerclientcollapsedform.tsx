"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { clientLoginCredentials } from "./actions1";
import { profile } from "./actions2";
import {addContactAndCompleteProfile} from "./actions3";

import styles from "../styles/register-client.module.css";
import ClientSignup1 from "./registerclientpage1";
import ClientSignup2 from "./registerclientpage2";
import ClientSignup3 from "./registerclientpage3";


function Stepper({ activeStep }: { activeStep: number }) {
  const getStepClass = (step: number) => {
    if (step === 4) return styles.groupParent1;
    return activeStep === step ? styles.groupParent : styles.groupContainer;
  };

  return (
    <div className={styles.stepper}>
      <div className={getStepClass(1)}>
        <div className={styles.bgParent}><div className={styles.bg} /><div className={styles.div}>1</div></div>
        <div className={styles.profile}>Login</div>
      </div>
      <div className={styles.stepperChild} />
      <div className={getStepClass(2)}>
        <div className={styles.bgParent}><div className={styles.bg} /><div className={styles.div}>2</div></div>
        <div className={styles.profile}>Profile</div>
      </div>
      <div className={styles.stepperChild} />
      <div className={getStepClass(3)}>
        <div className={styles.bgParent}><div className={styles.bg} /><div className={styles.div}>3</div></div>
        <div className={styles.profile}>Contacts</div>
      </div>
    </div>
  );
}

type SectionProps = {
  id: number;
  title: string;
  children: React.ReactNode;
  activeSection: number | null;
  onSectionChange: (id: number | null) => void;
  currentStep: number;
  completedSteps: number[];
};

function ExpandableSection({ id, title, children, activeSection, onSectionChange, currentStep, completedSteps }: SectionProps) {
  const isActive = activeSection === id;
  const handleClick = () => {
    if (id > currentStep) return;
    onSectionChange(isActive ? null : id);
  };

  return (
    <div className={styles.frameWrapper1}>
      <div onClick={handleClick} className={styles.frameWrapper2} style={{ cursor: id > currentStep ? "not-allowed" : "pointer" }}>
        <div className={styles.numberWrapper}>
          <div className={styles.number1} style={{ opacity: isActive || completedSteps.includes(id) ? 1 : 0.5, }}>
            <div className={styles.bgParent1}><div className={styles.bg4} /><div className={styles.div4}>{id}</div></div>
            <div className={styles.contactInformation}>{title}</div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className={styles.scrollContainer} style={{ overflow: "hidden" }} >
            <div style={{ padding: "16px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// --- MAIN PAGE COMPONENT ---

// 2. DEFINE THE SHAPE OF THE CENTRAL STATE OBJECT
// (Using the exact names from your server actions)
type FormDataState = {
  email: string;
  password: string;
  confirmPassword: string; // Keep this for client-side validation
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  birth_month: string;
  birth_day: string;
  birth_year: string;
  contact: string;
};

const ClientSignup: NextPage = () => {
  const router = useRouter();

  // 3. SETUP ALL THE NECESSARY STATE
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // The single source of truth for all form data
  const [formData, setFormData] = useState<FormDataState>({
    email: "", password: "", confirmPassword: "",
    first_name: "", last_name: "", middle_name: "", gender: "",
    birth_month: "", birth_day: "", birth_year: "",
    contact: ""
  });

  // State for loading indicators and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormDataState, boolean>>>({});


  // 4. DEFINE THE HANDLER FUNCTIONS

  // Updates the central formData state object
  const updateFormData = (newData: Partial<FormDataState>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
    const fieldName = Object.keys(newData)[0] as keyof FormDataState;
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Central logic to handle all "Next" button clicks
  const handleNextStep = async (stepToComplete: number) => {
    setGeneralError(null);
    setFieldErrors({});

    // Create a FormData object to send to the server action
    const actionFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) actionFormData.append(key, String(value));
    });

    setIsLoading(true);
    let result: { success: boolean; error?: string };

    // Call the correct server action based on the step
    if (stepToComplete === 1) {
      result = await clientLoginCredentials(actionFormData);
    } else if (stepToComplete === 2) {
      result = await profile(actionFormData);
    } else { // This is the final step
      result = await addContactAndCompleteProfile(actionFormData);
    }
    
    setIsLoading(false);

    // Handle the JSON response from the server action
    if (!result.success) {
      setGeneralError(result.error || "An unknown error occurred.");
      return; // Stop execution if there was an error
    }

    // If the action was successful, move to the next UI step
    // (Except for the final step, which should redirect)
    if (stepToComplete === 3) {
      // The final action handles redirection itself upon success
      // If your modified final action returns a redirectPath, you'd use it here:
      // if (result.redirectPath) router.push(result.redirectPath);
      return;
    }
    
    setCompletedSteps(prev => [...new Set([...prev, stepToComplete])]);
    const nextStep = stepToComplete + 1;
    setCurrentStep(nextStep);
    setActiveSection(nextStep);
  };
  
  const handleBackClick = () => {
    router.push("/landingpage");
  };

  // 5. RENDER THE COMPONENT
  return (
    <div className={styles.facilitySignup1}>
      <div className={styles.headerNav}>
        <Image className={styles.serveaseLogoAlbumCover3} width={40} height={40} sizes="100vw" alt="" src="/Servease Logo.svg" />
        <div className={styles.link1} onClick={handleBackClick}>
          <Image className={styles.outlineArrowsArrowLeft} width={24} height={24} sizes="100vw" alt="" src="/Arrow Left.svg" />
          <div className={styles.getStarted}>Back</div>
        </div>
      </div>

      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>Sign up and get connected with trusted professionals.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Stepper activeStep={activeSection ?? 0} />

            {/* Display Loading and Error Messages */}
            {isLoading && <div style={{textAlign: 'center', padding: '1rem'}}>Processing...</div>}
            {generalError && <div style={{textAlign: 'center', padding: '1rem', color: 'red', border: '1px solid red', borderRadius: '4px'}}>{generalError}</div>}

            {/* PASS THE CORRECT PROPS TO EACH CHILD COMPONENT */}
            <ExpandableSection id={1} title="Login" activeSection={activeSection} onSectionChange={setActiveSection} currentStep={currentStep} completedSteps={completedSteps}>
              <ClientSignup1
                data={formData}
                updateData={updateFormData}
                onNext={() => handleNextStep(1)}
                fieldErrors={fieldErrors}
              />
            </ExpandableSection>

            <ExpandableSection id={2} title="Profile" activeSection={activeSection} onSectionChange={setActiveSection} currentStep={currentStep} completedSteps={completedSteps}>
              <ClientSignup2
                data={formData}
                updateData={updateFormData}
                onNext={() => handleNextStep(2)}
                fieldErrors={fieldErrors}
              />
            </ExpandableSection>

            <ExpandableSection id={3} title="Contact Information" activeSection={activeSection} onSectionChange={setActiveSection} currentStep={currentStep} completedSteps={completedSteps}>
              <ClientSignup3
                data={formData}
                updateData={updateFormData}
                onNext={() => handleNextStep(3)} // This calls the final server action
                fieldErrors={fieldErrors}
              />
            </ExpandableSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;