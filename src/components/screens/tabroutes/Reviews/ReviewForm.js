import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReviewObj } from '~actions/reviewsActions';
import { goToSignIn } from '~app/navigation';
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
  Select,
  CheckIcon,
  VStack,
} from 'native-base';

export default function ReviewForm({ isEditMode, inputValues }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [starSelected, setStarSelected] = useState(0);
  const [reviewInfo, setReviewInfo] = useState({});
  const [itemSelected, setItemSelected] = useState('');
  const initialRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const styles = getStyles({ theme, isEditMode });
  const starSelection = [...Array(5).keys()];
  const userId = useSelector(state => get(state, 'userData.user.user._id', ''));
  const modalHeader = isEditMode ? 'Edit Your Review' : 'Create a Review';
  const btnText = isEditMode ? 'Edit' : 'Add Review';
  const checkForUserId = () => (!userId ? goToSignIn() : setModalVisible(true));

  const allItems = useSelector(state =>
    state.products.products
      .concat(state.bikeServices.services)
      .map(({ name, _id, type }) => ({
        name,
        _id,
        type,
      })),
  );

  const handleChange = (name, value) =>
    handleInputChange(
      name,
      value,
      setReviewInfo,
      reviewInfo,
      setStarSelected,
      setItemSelected,
    );

  const handleSelectionChange = itemId => {
    setItemSelected(itemId);

    const getItemMatchingValue = allItems.filter(
      item => item._id === itemId && item,
    );
    const { name, type } = getItemMatchingValue[0];

    setReviewInfo({ ...reviewInfo, product: name, reviewType: type });
  };

  const reviewInput = getReviewInput({ initialRef });

  const resetAllState = () => {
    setModalVisible(false);

    if (!inputValues) {
      setStarSelected(0);
      setReviewInfo({});
      setItemSelected('');
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
      // BUG this isnt showing - may need to set based on id associated to product?
      setItemSelected(inputValues.product);
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
              ({
                name,
                label,
                ref,
                pressableStars,
                maxHeight,
                multiline,
                selectable,
              }) => (
                <FormControl key={name} mt={3}>
                  <FormControl.Label>{label}</FormControl.Label>
                  {!pressableStars && !selectable && (
                    <Input
                      ref={ref}
                      onChangeText={value => handleChange(name, value)}
                      multiline={multiline}
                      maxHeight={maxHeight}
                      value={reviewInfo[name]}
                    />
                  )}
                  {/* TODO i also need to update the review object to allow for a reviewType: product or service */}
                  {selectable && (
                    <VStack alignItems="center" space={4}>
                      <Select
                        selectedValue={itemSelected}
                        width="100%"
                        accessibilityLabel="Choose Item"
                        placeholder="Choose Item"
                        _selectedItem={{
                          bg: 'teal.600',
                          endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={itemValue =>
                          handleSelectionChange(itemValue)
                        }>
                        {/* eslint-disable-next-line no-shadow */}
                        {allItems.map(({ name, _id }) => (
                          <Select.Item key={name} label={name} value={_id} />
                        ))}
                      </Select>
                    </VStack>
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
        onPress={checkForUserId}>
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
      selectable: true,
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
      borderRadius: 5,
      width: !isEditMode ? '45%' : 'auto',
    },
  };
}

ReviewForm.propTypes = {
  createReview: PropTypes.func,
  userId: PropTypes.string,
  inputValues: PropTypes.object,
  isEditMode: PropTypes.bool,
};
