import React, { useState } from 'react';
import { Button, Modal, Text, Switch, HStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { filterReviews, getGBReviews } from '~actions/reviewsActions';
import PropTypes from 'prop-types';

export default function FilterForm({ userId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [toggleChecked, setToggleChecked] = useState({});
  const styles = getStyles();

  const handleFilterSelection = async (filter, num) => {
    console.log('handleFilterSelection', filter, num);

    if (num) {
      setToggleChecked({
        ...toggleChecked,
        [`${filter}_${num}`]: !toggleChecked[`${filter}_${num}`],
        user: false,
      });

      Object.keys(toggleChecked).forEach(key => {
        if (toggleChecked[key] && key !== `${filter}_${num}`) {
          setToggleChecked({
            ...toggleChecked,
            [key]: false,
            user: false,
            [`${filter}_${num}`]: true,
          });
        }
      });

      if (toggleChecked[`${filter}_${num}`]) {
        setToggleChecked({
          ...toggleChecked,
          [`${filter}_${num}`]: false,
        });
        return dispatch(getGBReviews());
      }
    }

    if (filter && !num) {
      Object.keys(toggleChecked).forEach(key => {
        if (key !== 'user' && toggleChecked[key]) {
          console.log('key doesnt eq', key);
          // BUG need to set everything to false when user is selected
          setToggleChecked({
            ...toggleChecked,
            [key]: false,
          });
        }
      });

      if (toggleChecked[filter]) {
        setToggleChecked({ ...toggleChecked, [filter]: false });
        return dispatch(getGBReviews());
      }

      setToggleChecked({ ...toggleChecked, [filter]: !toggleChecked[filter] });
    }

    return dispatch(filterReviews({ filter, num }));
  };

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
              <HStack style={styles.toggleCont}>
                <>
                  <Text>Show your Reviews</Text>
                  <Switch
                    onToggle={() => handleFilterSelection('user')}
                    isChecked={toggleChecked.user}
                  />
                </>
              </HStack>
            )}
            {/* TODO update this so its not so repetitive */}
            <HStack style={styles.toggleCont}>
              <>
                <Text>5 Star Reviews</Text>
                <Switch
                  onToggle={() => handleFilterSelection('num', 5)}
                  isChecked={toggleChecked.num_5}
                />
              </>
            </HStack>
            <HStack style={styles.toggleCont}>
              <>
                <Text>4 Star Reviews</Text>
                <Switch
                  onToggle={() => handleFilterSelection('num', 4)}
                  isChecked={toggleChecked.num_4}
                />
              </>
            </HStack>
            <HStack style={styles.toggleCont}>
              <>
                <Text>3 Star Reviews</Text>
                <Switch
                  onToggle={() => handleFilterSelection('num', 3)}
                  isChecked={toggleChecked.num_3}
                />
              </>
            </HStack>
            <HStack style={styles.toggleCont}>
              <>
                <Text>2 Star Reviews</Text>
                <Switch
                  onToggle={() => handleFilterSelection('num', 2)}
                  isChecked={toggleChecked.num_2}
                />
              </>
            </HStack>
            <HStack style={styles.toggleCont}>
              <>
                <Text>1 Star Reviews</Text>
                <Switch
                  onToggle={() => handleFilterSelection('num', 1)}
                  isChecked={toggleChecked.num_1}
                />
              </>
            </HStack>
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
    toggleCont: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginTop: 5,
    },
  };
}

FilterForm.propTypes = {
  userId: PropTypes.string,
};
