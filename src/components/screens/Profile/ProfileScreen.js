import React from 'react';
import { connect } from 'react-redux';
import { Button, VStack, Text } from 'native-base';
import * as authActions from '~actions/authActions';
import { goToSignIn } from '~app/navigation';
import PropTypes from 'prop-types';
function ProfileScreen({ userInfo, logoutUser }) {
  console.log(userInfo);
  const styles = getStyles();

  return (
    <VStack style={styles.container}>
      {userInfo.user.user ? (
        <>
          <Text>Hi, {userInfo.user.user.name}</Text>
          <VStack>
            <Text>Here is your profile info:</Text>
            <Text>{userInfo.user.user.email}</Text>
            <Button onPress={logoutUser}>Logout</Button>
          </VStack>
        </>
      ) : (
        <>
          <Button onPress={goToSignIn} style={styles.btn}>
            Sign In
          </Button>
          {/* TODO add screen for registering */}
          <Button style={styles.btn}>Create an Account </Button>
        </>
      )}
    </VStack>
  );
}

function getStyles() {
  return {
    container: {
      flex: 0.8,
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
