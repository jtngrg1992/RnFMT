import {FormField, FormFieldType} from '../model';

const RegistrationFields = [
  new FormField({
    name: 'fullName',
    type: FormFieldType.STRING,
    label: 'Full name',
    placeholder: 'Enter full name',
    isRequired: true,
  }),
  new FormField({
    name: 'email',
    type: FormFieldType.EMAIL,
    label: 'Email',
    placeholder: 'Enter email',
    isRequired: true,
    validationRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }),
  new FormField({
    name: 'password',
    type: FormFieldType.PASSWORD,
    label: 'Password',
    placeholder: 'Enter password',
    isRequired: true,
  }),
  new FormField({
    name: 'confirmPassword',
    type: FormFieldType.CONFIRM_PASSWORD,
    label: 'Confirm Password',
    placeholder: 'Confirm password',
    isRequired: true,
  }),
  new FormField({
    name: 'phone',
    type: FormFieldType.PHONE,
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    isRequired: true,
  }),
  new FormField({
    name: 'parentName',
    type: FormFieldType.STRING,
    label: 'Parent Name',
    placeholder: 'Enter parent name',
    isRequired: true,
  }),
  new FormField({
    name: 'height',
    type: FormFieldType.DECIMAL_NUMBER,
    label: 'Height',
    placeholder: 'Enter height',
    isRequired: true,
  }),
  new FormField({
    name: 'gpa',
    type: FormFieldType.DECIMAL_NUMBER,
    label: 'Overall GPA',
    placeholder: 'Enter overall GPA',
    isRequired: true,
  }),
  new FormField({
    name: 'testScore',
    type: FormFieldType.DECIMAL_NUMBER,
    label: 'Test Score (ACT,SAT)',
    placeholder: 'Enter score in ACT/SAT',
    isRequired: true,
  }),
];

export default RegistrationFields;
