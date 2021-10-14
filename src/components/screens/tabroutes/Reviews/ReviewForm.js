import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FormControl,
  Modal,
  Input,
  HStack,
  Pressable,
  useTheme,
} from 'native-base';
import { postReview } from '~services/gb-reviews';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

function ReviewForm({ getGBReviews }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [starSelected, setStarSelected] = useState(0);
  const [reviewInfo, setReviewInfo] = useState({});
  const initialRef = useRef(null);
  const theme = useTheme();
  const styles = getStyles({ theme });
  const starSelection = [...Array(5).keys()];

  const handleChange = (name, value) =>
    handleInputChange(name, value, setReviewInfo, reviewInfo, setStarSelected);

  const reviewInput = getReviewInput({ initialRef });

  const handleSubmit = async () => {
    postReview(reviewInfo);
    await getGBReviews();
    setModalVisible(false);
    setReviewInfo({});
  };

  const handleCancelReview = () => {
    setModalVisible(false);
    setStarSelected(0);
    setReviewInfo({});
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Create a Review</Modal.Header>
          <Modal.Body>
            {reviewInput.map(
              ({ name, label, type, ref, pressable, maxHeight, multiline }) => (
                <FormControl key={name} mt={3}>
                  <FormControl.Label>{label}</FormControl.Label>
                  {type !== 'selection' && (
                    <Input
                      ref={ref}
                      onChangeText={value => handleChange(name, value)}
                      value={reviewInfo[name]}
                      multiline={multiline}
                      maxHeight={maxHeight}
                    />
                  )}
                  {pressable && (
                    <HStack style={styles.starSelection}>
                      {starSelection.map((s, i) => (
                        <Pressable
                          key={i}
                          onPress={() => handleChange('stars', i + 1)}>
                          <Icon
                            name="star"
                            size={30}
                            color={
                              starSelected > i ? styles.starIcon.color : '#000'
                            }
                          />
                        </Pressable>
                      ))}
                    </HStack>
                  )}
                </FormControl>
              ),
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleCancelReview}>
                Cancel
              </Button>
              <Button onPress={handleSubmit}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        Add Review
      </Button>
    </>
  );
}

function getReviewInput({ initialRef }) {
  return [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      ref: initialRef,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'text',
      multiline: true,
      maxHeight: 120,
    },
    {
      name: 'product',
      label: 'Product',
      type: 'text',
    },
    {
      name: 'stars',
      label: 'Stars',
      type: 'selection',
      starSelection: true,
      pressable: true,
    },
  ];
}

function handleInputChange(
  name,
  value,
  setReviewInfo,
  reviewInfo,
  setStarSelected,
) {
  const setReview = setReviewInfo({ ...reviewInfo, [name]: value });
  name === 'stars' ? setStarSelected(value) && setReview : setReview;
}

function getStyles({ theme }) {
  return {
    starSelection: {
      justifyContent: 'space-around',
    },
    starIcon: {
      color: theme.colors.reviewsIcon,
    },
  };
}
ReviewForm.propTypes = {
  getGBReviews: PropTypes.func,
};

export default connect()(ReviewForm);
