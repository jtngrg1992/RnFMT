import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginFields} from '../static';
import {FormComponent} from '../components';

class LoginComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.formFields = LoginFields;
    this.state = {
      isSubmissionAllowed: false,
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <FormComponent
            fields={this.formFields}
            style={styles.form}
            onEnableFormSubmission={() =>
              this.setState({
                isSubmissionAllowed: true,
              })
            }
            onDisableFormSubmission={() =>
              this.setState({
                isSubmissionAllowed: false,
              })
            }
          />
          <TouchableOpacity
            style={{
              ...styles.submitButton,
              opacity: this.state.isSubmissionAllowed === true ? 1 : 0.5,
            }}
            disabled={!this.state.isSubmissionAllowed}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flex: 1,
    overflow: 'hidden',
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 40,
    backgroundColor: 'tomato',
    borderRadius: 10,
    marginBottom: 40,
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
