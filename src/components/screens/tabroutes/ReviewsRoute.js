import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import meanBy from 'lodash/meanBy';
import { Text, VStack, HStack, Button, useTheme } from 'native-base';
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
    // TODO add a filter by review rating
    <ScrollView>
      <VStack style={styles.container}>
        <HStack>
          <Text>Rating: </Text>
          {ratingIcons}
          <Text>({reviewsStarAverage})</Text>
        </HStack>
        {reviews.map(review => (
          <VStack key={review._id} style={styles.reviewCard}>
            <HStack style={styles.reviewHeader}>
              <Text>{review.product}</Text>
              <HStack>{getStarsFromOneRating(review.stars)}</HStack>
            </HStack>
            <Text>- {review.name}</Text>
            <Text>{review.message}</Text>
            {/* TODO use date-fns to update date here */}
            <Text>{review.createdAt}</Text>
          </VStack>
        ))}
        {/* TODO have this bring up a modal */}
        <Button>Add Review</Button>
      </VStack>
    </ScrollView>
  );
}

function getStyles(theme) {
  return {
    container: {
      alignItems: 'center',
      paddingTop: 10,
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

export default connect(mapStateToProps, { getGBReviews })(ReviewsRoute);
