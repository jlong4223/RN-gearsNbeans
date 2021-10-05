import React from 'react';
import { connect } from 'react-redux';
import { Button, VStack } from 'native-base';
import { goToSignIn } from '~app/navigation';
import PropTypes from 'prop-types';
function ProfileScreen({ userInfo }) {
  console.log(userInfo);
  const styles = getStyles();

  return (
    <VStack style={styles.container}>
      <Button onPress={goToSignIn} style={styles.btn}>
        Sign In
      </Button>
      {/* TODO add screen for registering */}
      <Button style={styles.btn}>Create an Account </Button>
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
};

const mapStateToProps = state => ({
  userInfo: state.userData,
});

export default connect(mapStateToProps)(ProfileScreen);
