import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

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
  }

  _onChangeText = ({text, field}) => {
    field.value = text;

    const errorString = field.errorString;

    let stateUpdate = {};
    stateUpdate[field.errorKeyName] = errorString;
    stateUpdate[field.name] = text;
    this.setState({
      ...this.state,
      ...stateUpdate,
    });
  };

  render() {
    console.log('rendered state', this.state);
    const {fields} = this.props;

    return (
      <View style={styles.container}>
        {fields.map((field, index) => {
          const val = this.state[field.name];
          const errorString = this.state[field.errorKeyName];
          return (
            <FormInput
              key={index}
              label={field.label}
              value={val}
              errorString={errorString}
              onChangeText={text => {
                this._onChangeText({
                  text,
                  field,
                });
              }}
            />
          );
        })}
      </View>
    );
  }
}

FormComponent.propTypes = {
  fields: PropTypes.array.isRequired,
};

FormComponent.defaultProps = {
  fields: [],
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
