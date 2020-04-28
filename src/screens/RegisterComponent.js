import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FormComponent} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RegistrationFields} from '../static';
class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.formFields = RegistrationFields;

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
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
export default RegisterComponent;

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
    paddingVertical: 20,
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
