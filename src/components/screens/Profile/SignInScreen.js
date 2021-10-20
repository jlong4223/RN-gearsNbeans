import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, View, Button } from 'native-base';
import { loginFields } from '~sharedComponents/AuthForms/fields';
import * as authActions from '~actions/authActions';
import PropTypes from 'prop-types';

function SignInScreen({ loginUser }) {
  const styles = getStyles();

  const [userFieldValues, setUserFieldValues] = useState({});

  const handleChange = (name, value) => {
    setUserFieldValues({ ...userFieldValues, [name]: value });
  };

  function handleSubmit() {
    loginUser(userFieldValues);
    // TODO handle adding an error message if the user is not found
    setUserFieldValues({});
  }

  function setLoginFields() {
    return loginFields.map(field => (
      <Input
        style={styles.btnAndInput}
        key={field.name}
        type={field.type}
        _focus={styles.inputFocus}
        isRequired={field.required}
        placeholder={field.placeholder}
        onChangeText={value => handleChange(field.name, value)}
      />
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.btnContainer}>
          {setLoginFields()}
          <Button style={styles.btnAndInput} onPress={handleSubmit}>
            Sign in
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
      height: '50%',
    },
    btnContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '30%',
    },
    btnAndInput: {
      width: '60%',
    },
    inputFocus: {
      width: '60%',
    },
  };
}

SignInScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignInScreen);
