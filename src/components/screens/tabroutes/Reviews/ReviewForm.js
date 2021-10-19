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
import * as reviewsActions from '~actions/reviewsActions';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

function ReviewForm({ createReview }) {
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

  const resetAllState = () => {
    setModalVisible(false);
    setStarSelected(0);
    setReviewInfo({});
  };

  const handleSubmit = async () => {
    await createReview(reviewInfo);
    resetAllState();
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={resetAllState}
        initialFocusRef={initialRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Create a Review</Modal.Header>
          <Modal.Body>
            {reviewInput.map(
              ({ name, label, ref, pressableStars, maxHeight, multiline }) => (
                <FormControl key={name} mt={3}>
                  <FormControl.Label>{label}</FormControl.Label>
                  {!pressableStars && (
                    <Input
                      ref={ref}
                      onChangeText={value => handleChange(name, value)}
                      multiline={multiline}
                      maxHeight={maxHeight}
                    />
                  )}
                  {pressableStars && (
                    <HStack style={styles.starSelection}>
                      {starSelection.map((s, i) => (
                        <Pressable
                          key={i}
                          onPress={() => handleChange(name, i + 1)}>
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
                onPress={resetAllState}>
                Cancel
              </Button>
              <Button onPress={() => handleSubmit()}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Button
        style={styles.reviewBtn}
        colorScheme="secondary"
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
      ref: initialRef,
    },
    {
      name: 'message',
      label: 'Message',
      multiline: true,
      maxHeight: 120,
    },
    {
      name: 'product',
      label: 'Product',
    },
    {
      name: 'stars',
      label: 'Stars',
      pressableStars: true,
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
    reviewBtn: {
      borderRadius: 0,
    },
  };
}

ReviewForm.propTypes = {
  createReview: PropTypes.func,
};

export default connect(null, reviewsActions)(ReviewForm);
