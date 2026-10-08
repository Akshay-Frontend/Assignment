import { useState } from "react";

import { DynamicForm } from "../../design-system/form";
import type { FormValues } from "../../design-system/form";
import { leadConfig, leadInitialValues } from "./leadConfig";
import { validateLead } from "./leadValidation";
import styles from "./LeadPage.module.css";

export function LeadPage() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const handleSubmit = (values: FormValues) => {
    setSubmitted(values);
    console.log("Lead captured:", values);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>New lead</h1>
          <p className={styles.subtitle}>
            Capture a prospective customer. Extra fields appear based on lead type.
          </p>
        </header>

        <section className={styles.card}>
          <DynamicForm
            config={leadConfig}
            initialValues={leadInitialValues}
            validate={validateLead}
            onSubmit={handleSubmit}
            submitLabel="Save lead"
            className={styles.form}
          />
        </section>

        {submitted && (
          <section className={styles.result} aria-live="polite">
            <h2 className={styles.resultTitle}>Submitted values</h2>
            <pre className={styles.resultBody}>
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
