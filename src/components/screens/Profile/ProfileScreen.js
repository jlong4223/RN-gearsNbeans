import React from 'react';
import { connect } from 'react-redux';
import { Button, VStack, Text, Box } from 'native-base';
import { goToSignIn, goToRegister } from '~app/navigation';
import * as authActions from '~actions/authActions';
import PropTypes from 'prop-types';
function ProfileScreen({ userInfo, logoutUser }) {
  // eslint-disable-next-line no-console
  console.log(userInfo);
  const styles = getStyles();

  return (
    <VStack>
      {userInfo.user.user ? (
        <Box style={styles.profileContainer}>
          <Text>Hi, {userInfo.user.user.name}</Text>
          <VStack>
            <Text>Here is your profile info:</Text>
            <Text>{userInfo.user.user.email}</Text>
            <Button onPress={logoutUser}>Logout</Button>
          </VStack>
        </Box>
      ) : (
        <VStack style={styles.btnsContainer}>
          <Button onPress={goToSignIn} style={styles.btn}>
            Sign In
          </Button>
          <Button style={styles.btn} onPress={goToRegister}>
            Create an Account
          </Button>
        </VStack>
      )}
    </VStack>
  );
}

function getStyles() {
  return {
    profileContainer: {
      borderWidth: 1,
      width: '100%',
      padding: 10,
      height: '100%',
    },
    btnsContainer: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      margin: 10,
      width: '60%',
    },
  };
}

ProfileScreen.propTypes = {
  userInfo: PropTypes.object,
  logoutUser: PropTypes.func,
};

const mapStateToProps = state => ({
  userInfo: state.userData,
});

export default connect(mapStateToProps, authActions)(ProfileScreen);
