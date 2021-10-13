import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Modal, Input } from 'native-base';
import { postReview } from '~services/gb-reviews';
import PropTypes from 'prop-types';

function ReviewForm({ getGBReviews }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewInfo, setReviewInfo] = useState({});
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleChange = (name, value) => {
    setReviewInfo({ ...reviewInfo, [name]: value });
  };

  const handleSubmit = () => {
    //  post the review
    postReview(reviewInfo);
    getGBReviews();
    setModalVisible(false);
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
              <Input
                name="stars"
                onChangeText={value => handleChange('stars', value)}
              />
              {/* TODO change this to a star selection */}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
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

ReviewForm.propTypes = {
  getGBReviews: PropTypes.func,
};

export default connect()(ReviewForm);
