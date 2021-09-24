import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import meanBy from 'lodash/meanBy';
import { Text, VStack, HStack, useTheme } from 'native-base';
import { ScrollView } from 'react-native';
import { getGBReviews } from '~actions/reviewsActions';
import Icon from 'react-native-vector-icons/FontAwesome';

function ReviewsRoute({ reviews, getGBReviews }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const reviewsStarAverage = getStarAverage({ reviews });
  const ratingIcons = getRatingIconsFromAverage({ reviews, styles });

  useEffect(() => {
    getGBReviews();
  }, [getGBReviews]);

  return (
    <ScrollView>
      <VStack>
        <Text>Reviews</Text>
        <Text>{reviewsStarAverage}</Text>
        <HStack>{ratingIcons}</HStack>
      </VStack>
    </ScrollView>
  );
}

function getStyles(theme) {
  return {
    ratingIcons: {
      color: theme.colors.reviewsIcon,
    },
  };
}

function getStarAverage({ reviews }) {
  return meanBy(reviews, 'stars');
}

function getRatingIconsFromAverage({ reviews, styles }) {
  const starArr = Array.from({ length: getStarAverage({ reviews }) });
  const averageDiff = getStarAverage({ reviews }) - starArr.length;

  const starSize = 20;
  const starColor = styles.ratingIcons.color;

  return starArr.map((r, i) => (
    <React.Fragment key={i}>
      <Icon name="star" size={starSize} color={starColor} />
      {averageDiff > 0 && i === starArr.length - 1 && (
        <Icon name="star-half-full" size={starSize} color={starColor} />
      )}
    </React.Fragment>
  ));
}

ReviewsRoute.propTypes = {
  getGBReviews: PropTypes.func.isRequired,
  reviews: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    reviews: state.reviews.reviews,
  };
};

// BUG this works but gives a console error; figure out how to solve this and remove the useEffect hook
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(getGBReviews, dispatch);
// }

export default connect(mapStateToProps, { getGBReviews })(ReviewsRoute);
