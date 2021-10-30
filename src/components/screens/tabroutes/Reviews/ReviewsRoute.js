import React, { useEffect } from 'react';
import { Text, VStack, HStack, Pressable, useTheme } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { meanBy, round } from 'lodash';
import { getFormattedDate } from '~sharedComponents/appHelpers';
import * as reviewsActions from '~actions/reviewsActions';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReviewForm from './ReviewForm';

function ReviewsRoute({ reviews, getGBReviews, userId, deleteUsersReview }) {
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
        <Text>{reviewsStarAverage}</Text>
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
              <HStack style={styles.actionBtns}>
                <Text>{getFormattedDate(review.createdAt)}</Text>
                {getDeleteBtn({ userId, review, deleteUsersReview })}
                {getEditBtn({ userId, review, deleteUsersReview })}
              </HStack>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
      <ReviewForm />
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
    actionBtns: {
      justifyContent: 'space-between',
    },
  };
}

function getStarAverage({ reviews }) {
  return round(meanBy(reviews, 'stars'), 2) || 'No reviews yet';
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

function getDeleteBtn({ userId, review, deleteUsersReview }) {
  return (
    userId === review.createdBy && (
      <Pressable onPress={() => deleteUsersReview(review._id)}>
        <Text>Delete</Text>
      </Pressable>
    )
  );
}

// TODO finish this
function getEditBtn({ userId, review }) {
  return (
    userId === review.createdBy && (
      <Pressable onPress={() => console.log('edited')}>
        <Text>Edit</Text>
      </Pressable>
    )
  );
}

ReviewsRoute.propTypes = {
  getGBReviews: PropTypes.func.isRequired,
  reviews: PropTypes.array,
  userId: PropTypes.string,
  deleteUsersReview: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    reviews: state.reviews.reviews,
    userId:
      Object.keys(state.userData.user).length !== 0
        ? state.userData.user.user._id
        : '',
  };
};

export default connect(mapStateToProps, reviewsActions)(ReviewsRoute);
