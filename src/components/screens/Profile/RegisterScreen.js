import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'native-base';
import { getInputFields } from '~sharedComponents/AuthForms/fields';
import * as authActions from '~actions/authActions';
import PropTypes from 'prop-types';

function RegisterScreen({ error, registerUser }) {
  console.log('userData in register screen, ', error);

  const [userFieldValues, setUserFieldValues] = useState({});
  const styles = getStyles();

  const handleChange = (name, value) => {
    setUserFieldValues({ ...userFieldValues, [name]: value });
  };

  function handleSubmit() {
    registerUser(userFieldValues);
    // TODO handle adding an error message if the user is not found
    setUserFieldValues({});
  }

  const registerUserFields = getInputFields('register', styles, handleChange);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.btnContainer}>
          {registerUserFields}
          <Button style={styles.btnAndInput} onPress={handleSubmit}>
            Sign up
          </Button>
        </View>
      </View>
    </View>
  );
}

function getStyles() {
  return {
    container: {
      flex: 0.8,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    btnContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '60%',
    },
    btnAndInput: {
      width: '70%',
    },
    inputFocus: {
      width: '70%',
    },
  };
}

RegisterScreen.propTypes = {
  registerUser: PropTypes.func.isRequired,
  error: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    error: state.userData,
  };
}

export default connect(mapStateToProps, authActions)(RegisterScreen);
