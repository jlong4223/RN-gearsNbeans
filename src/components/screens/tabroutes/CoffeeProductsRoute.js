import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGBProducts } from '~actions/reviewsActions';
import { addToCart } from '~actions/cartActions';
import {
  Text,
  Popover,
  Image,
  ScrollView,
  useTheme,
  HStack,
  VStack,
  Button,
  useColorModeValue,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

// eslint-disable-next-line no-shadow
function CoffeeProductsRoute({ products, getGBProducts, addToCart }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const btnColorScheme = useColorModeValue('primary', 'secondary');

  useEffect(() => {
    getGBProducts();
  }, [getGBProducts]);

  function addItemToCart(product) {
    addToCart(product);
  }

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
                onPress={() => addItemToCart(product)}>
                <Icon name="cart-plus" size={30} style={styles.btnIcon} />
              </Button>
              <Popover
                // TODO look at android
                offset={-50}
                // placement="top"
                trigger={triggerProps => {
                  return (
                    <Button colorScheme={btnColorScheme} {...triggerProps}>
                      <Icon
                        name="info-circle"
                        size={30}
                        style={styles.btnIcon}
                      />
                    </Button>
                  );
                }}>
                <Popover.Content accessibilityLabel="product-info" w="56">
                  <Popover.Arrow />
                  <Popover.CloseButton />
                  <Popover.Header>{product.name}</Popover.Header>
                  <Popover.Body>{product.description}</Popover.Body>
                </Popover.Content>
              </Popover>
            </HStack>
          </VStack>
        ))}
      </HStack>
    </ScrollView>
  );
}

function getStyles(theme) {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    productContainer: {
      margin: 10,
      padding: 8,
      borderRadius: 10,
      borderWidth: 0.2,
      boxShadow: '15px 15px 15px #000',
    },

    productImg: {
      width: 140,
      height: 130,
      borderRadius: 10,
      marginBottom: 10,
    },
    btnContainer: {
      justifyContent: 'space-around',
    },
    btnIcon: {
      color: theme.colors.altBackground,
    },
  };
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
