import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReviewObj } from '~actions/reviewsActions';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  FormControl,
  Modal,
  Input,
  HStack,
  Pressable,
  useTheme,
} from 'native-base';

export default function ReviewForm({ isEditMode, inputValues }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [starSelected, setStarSelected] = useState(0);
  const [reviewInfo, setReviewInfo] = useState({});
  const initialRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const styles = getStyles({ theme, isEditMode });
  const starSelection = [...Array(5).keys()];
  const userId = useSelector(state => get(state, 'userData.user.user._id', ''));
  const modalHeader = isEditMode ? 'Edit Your Review' : 'Create a Review';
  const btnText = isEditMode ? 'Edit' : 'Add Review';

  const handleChange = (name, value) =>
    handleInputChange(name, value, setReviewInfo, reviewInfo, setStarSelected);

  const reviewInput = getReviewInput({ initialRef });

  const resetAllState = () => {
    setModalVisible(false);

    if (!inputValues) {
      setStarSelected(0);
      setReviewInfo({});
    }
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      await dispatch(updateReviewObj(reviewInfo));
      resetAllState();
    }

    if (!isEditMode) {
      await dispatch(createReview({ createdBy: userId, ...reviewInfo }));
      resetAllState();
    }
  };

  useEffect(() => {
    if (inputValues) {
      setReviewInfo(inputValues);
      setStarSelected(inputValues.stars);
    }
  }, [inputValues]);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={resetAllState}
        initialFocusRef={initialRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{modalHeader}</Modal.Header>
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
                      value={reviewInfo[name]}
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
        {btnText}
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

function getStyles({ theme, isEditMode }) {
  return {
    starSelection: {
      justifyContent: 'space-around',
    },
    starIcon: {
      color: theme.colors.reviewsIcon,
    },
    reviewBtn: {
      borderRadius: isEditMode ? 5 : 0,
    },
  };
}

ReviewForm.propTypes = {
  createReview: PropTypes.func,
  userId: PropTypes.string,
  inputValues: PropTypes.object,
  isEditMode: PropTypes.bool,
};
