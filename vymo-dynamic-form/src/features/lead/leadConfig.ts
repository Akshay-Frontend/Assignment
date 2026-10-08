import type { FieldConfig, FormValues } from "../../design-system/form";

export const LEAD_TYPE_INDIVIDUAL = "individual";
export const LEAD_TYPE_COMPANY = "company";

export const leadConfig: FieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    placeholder: "e.g. Priya Sharma",
    validations: [{ kind: "required" }],
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "name@company.com",
    validations: [{ kind: "required" }, { kind: "email" }],
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    placeholder: "Select lead type",
    options: [
      { label: "Individual", value: LEAD_TYPE_INDIVIDUAL },
      { label: "Company", value: LEAD_TYPE_COMPANY },
    ],
    validations: [{ kind: "required" }],
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    placeholder: "e.g. Vymo Technologies",
    validations: [{ kind: "required" }],
    visibleWhen: { field: "leadType", equals: LEAD_TYPE_COMPANY },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    placeholder: "10-digit mobile number",
    hint: "Numbers only, no spaces or country code",
    validations: [{ kind: "required" }, { kind: "exactDigits", count: 10 }],
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Anything else we should know?",
    hint: "Up to 200 characters",
    validations: [{ kind: "maxLength", max: 200 }],
    fullWidth: true,
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted about this enquiry.",
    validations: [{ kind: "required" }],
    fullWidth: true,
  },
];

export const leadInitialValues: FormValues = {
  fullName: "",
  email: "",
  leadType: "",
  companyName: "",
  phone: "",
  notes: "",
  consent: false,
};
