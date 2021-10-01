/*========
This is used for the styles of the products and services page
=========*/

export function getProductStyles(theme) {
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
