import React, { useEffect } from 'react';
import { Text, VStack, HStack, useTheme } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getFormattedDate } from '~sharedComponents/appHelpers';
import * as reviewsActions from '~actions/reviewsActions';
import PropTypes from 'prop-types';
import meanBy from 'lodash/meanBy';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReviewForm from './ReviewForm';

function ReviewsRoute({ reviews, getGBReviews }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const reviewsStarAverage = getStarAverage({ reviews });
  const ratingIcons = getRatingIconsFromAverage({ reviews, styles });

  useEffect(() => {
    getGBReviews();
  }, [getGBReviews]);

  return (
    // TODO add a filter by review rating & by date
    <>
      <HStack style={styles.ratingContainer}>
        <Text>Rating: </Text>
        {ratingIcons}
        <Text>({reviewsStarAverage})</Text>
      </HStack>
      <ScrollView>
        <VStack style={styles.container}>
          {reviews.map(review => (
            <VStack key={review._id} style={styles.reviewCard}>
              <HStack style={styles.reviewHeader}>
                <Text>{review.product}</Text>
                <HStack>{getStarsFromOneRating(review.stars)}</HStack>
              </HStack>
              <Text>- {review.name}</Text>
              <Text>{review.message}</Text>
              <Text>{getFormattedDate(review.createdAt)}</Text>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
      <ReviewForm getGBReviews={getGBReviews} />
    </>
  );
}

function getStyles(theme) {
  return {
    container: {
      alignItems: 'center',
      paddingBottom: 10,
    },
    reviewCard: {
      backgroundColor: theme.colors.surface,
      width: '85%',
      padding: 10,
      margin: 10,
      borderRadius: 10,
    },
    reviewHeader: {
      justifyContent: 'space-between',
    },
    ratingIcons: {
      color: theme.colors.reviewsIcon,
    },
    ratingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },
  };
}

function getStarAverage({ reviews }) {
  // TODO limit the decimal place to 2
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

function getStarsFromOneRating(review) {
  const stars = Array.from({ length: review });

  return stars.map((r, i) => <Icon key={i} name="star" />);
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

export default connect(mapStateToProps, reviewsActions)(ReviewsRoute);