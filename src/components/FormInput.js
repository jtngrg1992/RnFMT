import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';

class FormInput extends Component {
  focus = () => {
    this._input.focus();
  };
  render() {
    const {label, style, errorString} = this.props;

    return (
      <View style={{...styles.container, ...style}}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={input => (this._input = input)}
          {...this.props}
          style={styles.textField}
        />
        {errorString && errorString.trim().length > 0 && (
          <Text style={styles.error}>{errorString}</Text>
        )}
      </View>
    );
  }
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  errorString: PropTypes.string,
};

FormInput.defaultProps = {
  label: 'input Label',
  style: {},
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
  },
  textField: {
    minHeight: 30,
    padding: 5,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});
