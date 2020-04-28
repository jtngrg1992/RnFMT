import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginFields} from '../static';
import {FormComponent} from '../components';
import DBManager from '../services/DBManager';
import {FormFieldType} from '../model';

class LoginComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.formFields = LoginFields;
    this.state = {
      isSubmissionAllowed: false,
    };

    this.dbManager = new DBManager();
    this.dbManager.initDB();
  }

  _performLogin = async () => {
    let emailField = this.formFields.find(
      item => item.type === FormFieldType.EMAIL,
    );

    if (emailField) {
      let email = emailField.value;
      console.log(email);
      try {
        const user = await this.dbManager.searchUser(email);
        let passwordField = this.formFields.find(
          item => item.type === FormFieldType.PASSWORD,
        );
        if (passwordField) {
          if (user.password === passwordField.value) {
            this.props.navigation.navigate('Dashboard');
          } else {
            Alert.alert('Oops!', 'The entered password is wrong!');
          }
        }
      } catch (error) {
        Alert.alert('Oops!', error.message);
      }
    }
  };

  _onSignup = () => {
    this.props.navigation.navigate('Register');
  };

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
            onPress={() => this._performLogin()}
            style={{
              ...styles.submitButton,
              opacity: this.state.isSubmissionAllowed === true ? 1 : 0.5,
            }}
            disabled={!this.state.isSubmissionAllowed}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => this._onSignup()}>
            <Text style={styles.signupText}> Sign up instead </Text>
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
    marginBottom: 20,
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  signupText: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: 'tomato',
  },
});
