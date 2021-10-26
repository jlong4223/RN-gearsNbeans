import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoPopover from '~sharedComponents/InfoPopover';
import { getProductStyles } from '~sharedComponents/styles/productStyles';
import {
  Text,
  Image,
  ScrollView,
  useTheme,
  useToast,
  HStack,
  VStack,
  Button,
  useColorModeValue,
} from 'native-base';

export default function ProductCard({ products, addToCart }) {
  const toast = useToast();
  const theme = useTheme();
  const styles = getProductStyles(theme);
  const btnColorScheme = useColorModeValue('primary', 'secondary');

  const addToCartHandler = item => {
    addToCart(item);
    // TODO look into dark mode color scheme
    toast.show({
      title: 'Added to cart',
      status: 'success',
      description: `The ${item.name} has successfully been added to the cart`,
    });
  };

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
                onPress={() => addToCartHandler(product)}>
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

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};
