import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import {FormFieldType} from '../model';

class FormComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    const {fields} = props;

    if (fields.length > 0) {
      //iterate over each field and add keyValue pairs in state
      var newState = {};
      for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        const keyName = field.name;
        newState[keyName] = field.stringVal;
      }

      if (newState != state) {
        return newState;
      }
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.inputsRefs = {};
  }

  componentDidUpdate() {
    //iterate over field state attribs and check if theres any error
    let shouldAllowSubmission = true;
    for (let i = 0; i < this.props.fields.length; i++) {
      const field = this.props.fields[i];
      if (
        this.state[field.errorKeyName] &&
        this.state[field.errorKeyName].trim().length > 0
      ) {
        shouldAllowSubmission = false;
      }

      if (
        !this.state[field.name] ||
        this.state[field.name].trim().length == 0
      ) {
        shouldAllowSubmission = false;
      }
    }

    shouldAllowSubmission === true
      ? this.props.onEnableFormSubmission()
      : this.props.onDisableFormSubmission();
  }

  _onChangeText = ({text, field}) => {
    field.value = text;

    let errorString = field.errorString;

    let stateUpdate = {};

    stateUpdate[field.name] = text;

    //compute error for password field
    if (
      (field.type === FormFieldType.PASSWORD ||
        field.type === FormFieldType.CONFIRM_PASSWORD) &&
      text.trim().length > 0
    ) {
      //search for a confirm password field
      const otherFieldType =
        field.type === FormFieldType.PASSWORD
          ? FormFieldType.CONFIRM_PASSWORD
          : FormFieldType.PASSWORD;
      const otherPasswordField = this.props.fields.find(
        item => item.type === otherFieldType,
      );

      if (
        otherPasswordField &&
        this.state[otherPasswordField.name] &&
        this.state[otherPasswordField.name].length > 0
      ) {
        const otherPassword = this.state[otherPasswordField.name];
        const paswordField =
          field.type === FormFieldType.PASSWORD ? field : otherPasswordField;
        if (otherPassword !== text) {
          if (field.type === FormFieldType.PASSWORD) {
            errorString = "Passwords don't match";
          } else {
            stateUpdate[paswordField.errorKeyName] = "Passwords don't match";
          }
        } else {
          stateUpdate[paswordField.errorKeyName] = null;
        }
      }
    }
    stateUpdate[field.errorKeyName] = errorString;

    this.setState({
      ...this.state,
      ...stateUpdate,
    });
  };

  _getKeyboardType = fieldType => {
    switch (fieldType) {
      case FormFieldType.CONFIRM_PASSWORD:
      case FormFieldType.PASSWORD:
      case FormFieldType.STRING:
        return 'default';
      case FormFieldType.WHOLE_NUMBER:
        return 'number-pad';
      case FormFieldType.DECIMAL_NUMBER:
        return 'decimal-pad';
      case FormFieldType.EMAIL:
        return 'email-address';
      case FormFieldType.PHONE:
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  render() {
    const {fields, style} = this.props;

    return (
      <View style={{...styles.container, ...style}}>
        {fields.map((field, index) => {
          const val = this.state[field.name];
          const errorString = this.state[field.errorKeyName];

          return (
            <FormInput
              style={{marginTop: 20}}
              ref={input => {
                this.inputsRefs[field.name] = input;
              }}
              key={index}
              label={field.label}
              value={val}
              secureTextEntry={
                field.type === FormFieldType.PASSWORD ||
                field.type === FormFieldType.CONFIRM_PASSWORD
              }
              keyboardType={this._getKeyboardType(field.type)}
              errorString={errorString}
              onChangeText={text => {
                this._onChangeText({
                  text,
                  field,
                });
              }}
              returnKeyType={index < fields.length - 1 ? 'next' : 'go'}
              clearButtonMode="while-editing"
            />
          );
        })}
      </View>
    );
  }
}

FormComponent.propTypes = {
  fields: PropTypes.array.isRequired,
  onEnableFormSubmission: PropTypes.func,
  onDisableFormSubmission: PropTypes.func,
};

FormComponent.defaultProps = {
  fields: [],
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {},
});
