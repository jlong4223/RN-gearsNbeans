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
  const finalRef = useRef(null);
  const theme = useTheme();
  const styles = getStyles({ theme });
  const starSelection = Array.from(Array(5).keys());

  const handleChange = (name, value) => {
    const setReview = setReviewInfo({ ...reviewInfo, [name]: value });

    name === 'stars' ? setStarSelected(value) && setReview : setReview;
  };

  const handleSubmit = async () => {
    postReview(reviewInfo);
    await getGBReviews();
    setModalVisible(false);
  };

  const handleCancelReview = () => {
    setModalVisible(false);
    setStarSelected(0);
  };

  //   TODO refactor this to make it better
  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Create a Review</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                name="name"
                ref={initialRef}
                onChangeText={value => handleChange('name', value)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Message</FormControl.Label>
              <Input
                name="message"
                multiline
                maxHeight={120}
                onChangeText={value => handleChange('message', value)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Product</FormControl.Label>
              <Input
                name="product"
                onChangeText={value => handleChange('product', value)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Stars</FormControl.Label>
              <HStack style={styles.starSelection}>
                {starSelection.map((s, i) => (
                  <Pressable
                    key={i}
                    onPress={() => handleChange('stars', i + 1)}>
                    <Icon
                      name="star"
                      size={30}
                      color={starSelected > i ? styles.starIcon.color : 'black'}
                    />
                  </Pressable>
                ))}
              </HStack>
            </FormControl>
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
