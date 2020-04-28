class FormField {
  constructor({
    name,
    type,
    label,
    placeholder,
    defaultValue,
    value,
    isRequired,
    validationRegex,
  }) {
    this.name = name;
    this.type = type;
    this.label = label;
    this.placeholder = placeholder;
    this.defaultValue = defaultValue;
    this.value = value;
    this.isRequired = isRequired;
    this.validationRegex = validationRegex;
  }

  get errorKeyName() {
    return `${this.name}Error`;
  }

  get errorString() {
    let value = this.value || this.defaultValue;
    if (this.isRequired == true && !value) {
      return `${this.name} is required`;
    } else if (typeof value === 'string' && value.trim().length == 0) {
      return `${this.name} is required`;
    } else if (this.validationRegex) {
      //make the regex match
      const result = this.validationRegex.test(value);
      if (result === false) {
        return `${name} needs to be valid`;
      }
    }
    return null;
  }

  get stringVal() {
    const value = this.value || this.defaultValue;

    if (value) {
      return value.toString();
    }
    return null;
  }
}

export default FormField;
