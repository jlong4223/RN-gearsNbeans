import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, View, Button } from 'native-base';
import * as authActions from '~actions/authActions';
import PropTypes from 'prop-types';
import { loginFields } from '~sharedComponents/AuthForms/fields';

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
      {setLoginFields()}
      <Button style={styles.btnAndInput} onPress={handleSubmit}>
        Sign in
      </Button>
    </View>
  );
}

function getStyles() {
  return {
    container: {
      flex: 0.3,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    btnAndInput: {
      //   margin: 10,
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
