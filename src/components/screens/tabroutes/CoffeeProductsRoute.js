import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGBProducts } from '~actions/reviewsActions';
import { addToCart } from '~actions/cartActions';
import { getProductStyles } from '~sharedComponents/styles/productStyles';
import PropTypes from 'prop-types';
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
// eslint-disable-next-line no-shadow
function CoffeeProductsRoute({ products, getGBProducts, addToCart }) {
  const theme = useTheme();
  const styles = getProductStyles(theme);
  const btnColorScheme = useColorModeValue('primary', 'secondary');

  useEffect(() => {
    getGBProducts();
  }, [getGBProducts]);

  return (
    <ScrollView>
      <HStack style={styles.container}>
        {products.map(product => (
          <VStack key={product._id} style={styles.productContainer}>
            <VStack>
              <Text>{product.name}</Text>
              <Text>${product.price}</Text>
            </VStack>
            <Image
              source={{ uri: product.image }}
              style={styles.productImg}
              alt="product"
            />
            <HStack style={styles.btnContainer}>
              <Button
                colorScheme={btnColorScheme}
                onPress={() => addToCart(product)}>
                <Icon name="cart-plus" size={30} style={styles.btnIcon} />
              </Button>
              <InfoPopover
                product={product}
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

CoffeeProductsRoute.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  getGBProducts: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.products.products,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getGBProducts, addToCart }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoffeeProductsRoute);
