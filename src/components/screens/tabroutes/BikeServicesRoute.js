import React, { useEffect } from 'react';
import { getGBBikeServices } from '~actions/allActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '~actions/cartActions';
import { getProductStyles } from '~sharedComponents/styles/productStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoPopover from '~sharedComponents/InfoPopover';
import {
  Text,
  Image,
  ScrollView,
  useTheme,
  HStack,
  VStack,
  Button,
  useColorModeValue,
} from 'native-base';
function BikeServicesRoute({ bikeServices, getGBBikeServices, addToCart }) {
  const theme = useTheme();
  const styles = getProductStyles(theme);
  const btnColorScheme = useColorModeValue('primary', 'secondary');

  useEffect(() => {
    getGBBikeServices();
  }, [getGBBikeServices]);

  return (
    <ScrollView>
      <HStack style={styles.container}>
        {bikeServices.map(service => (
          <VStack key={service._id} style={styles.productContainer}>
            <VStack>
              <Text>{service.name}</Text>
              <Text>${service.price}</Text>
            </VStack>
            <Image
              source={{ uri: service.image }}
              style={styles.productImg}
              alt="service"
            />
            <HStack style={styles.btnContainer}>
              <Button
                colorScheme={btnColorScheme}
                onPress={() => addToCart(service)}>
                <Icon name="cart-plus" size={30} style={styles.btnIcon} />
              </Button>
              <InfoPopover
                product={service}
                btnColorScheme={btnColorScheme}
                styles={styles}
              />
            </HStack>
          </VStack>
        ))}
      </HStack>
    </ScrollView>
  );
}

BikeServicesRoute.propTypes = {
  bikeServices: PropTypes.arrayOf(PropTypes.object),
  getGBBikeServices: PropTypes.func,
};

const mapStateToProps = state => ({
  bikeServices: state.bikeServices.services,
});

export default connect(mapStateToProps, { getGBBikeServices, addToCart })(
  BikeServicesRoute,
);
