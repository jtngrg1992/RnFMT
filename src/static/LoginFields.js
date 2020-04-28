import {FormField, FormFieldType} from '../model';

const LoginFields = [
  new FormField({
    name: 'email',
    type: FormFieldType.EMAIL,
    label: 'Enter Email',
    placeholder: 'Enter Email ',
    isRequired: true,
    validationRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }),
  new FormField({
    name: 'password',
    type: FormFieldType.PASSWORD,
    label: 'Enter Password',
    placeholder: 'Enter Password ',
    isRequired: true,
  }),
];

export default LoginFields;
