import React, {Component, PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FormComponent} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RegistrationFields} from '../static';
import {UserModel} from '../model';
import DBManager from '../services/DBManager';
class RegisterComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.formFields = RegistrationFields;

    this.state = {
      isSubmissionAllowed: false,
    };
  }

  _onSignup = async () => {
    //map form fields to user object
    let userObject = {};
    this.formFields.forEach(item => {
      userObject[item.name] = item.value;
    });

    //convert to model object
    const modelObject = new UserModel(
      null,
      userObject.fullName,
      userObject.email,
      userObject.gpa,
      userObject.height,
      userObject.parentName,
      userObject.password,
      userObject.phone,
      userObject.testScore,
    );

    console.log(modelObject);

    let dbManager = new DBManager();
    try {
      await dbManager.createUser(modelObject);
      Alert.alert('Success!', 'Account created, try logging in!');
      this.props.navigation.goBack();
    } catch (error) {
      Alert.alert('Oops!', error.message);
    }
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
            onPress={() => this._onSignup()}
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
