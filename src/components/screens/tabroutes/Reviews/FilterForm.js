import React, { useState } from 'react';
import { Button, Modal, FormControl, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { filterReviews, getGBReviews } from '~actions/reviewsActions';
import PropTypes from 'prop-types';

export default function FilterForm({ userId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const styles = getStyles();

  const handleFilterSelection = async filter => {
    if (filter === 'remove') {
      return dispatch(getGBReviews());
    }

    return dispatch(filterReviews({ filter }));
  };

  // TODO show the filters by changing btn color to represent the one selected or use a toggle system on/off
  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        style={styles.filterBtn}
        colorScheme="secondary">
        Filter
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Filter Options</Modal.Header>
          <Modal.Body>
            {userId && (
              <Button
                style={styles.choiceBtn}
                onPress={() => handleFilterSelection('user')}>
                Show your reviews
              </Button>
            )}
            <Button
              style={styles.choiceBtn}
              onPress={() => handleFilterSelection('remove')}>
              Remove Filter
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

function getStyles() {
  return {
    filterBtn: {
      width: '45%',
    },
    choiceBtn: {
      marginTop: 5,
    },
  };
}

FilterForm.propTypes = {
  userId: PropTypes.string,
};
