import React, { useState } from 'react';
import { Button, Modal, Text, Switch, HStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { filterReviews, getGBReviews } from '~actions/reviewsActions';
import PropTypes from 'prop-types';

export default function FilterForm({ userId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [toggleChecked, setToggleChecked] = useState({});
  const styles = getStyles();
  const starFilterOptions = getStarFilterOptions();
  const productsServicesFilter = getProductServicesFilter();

  const handleFilterSelection = async (filter, num = 0) => {
    if (toggleChecked[`${filter}_${num}`]) {
      setToggleChecked({
        ...toggleChecked,
        [`${filter}_${num}`]: false,
      });
      setShowModal(false);
      return dispatch(getGBReviews());
    }

    setToggleChecked({
      ...toggleChecked,
      [`${filter}_${num}`]: !toggleChecked[`${filter}_${num}`],
    });

    Object.keys(toggleChecked).forEach(key => {
      if (toggleChecked[key] && key !== `${filter}_${num}`) {
        setToggleChecked({
          ...toggleChecked,
          [key]: false,
          [`${filter}_${num}`]: true,
        });
      }
    });

    setShowModal(false);
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
            {starFilterOptions.map(option => (
              <HStack key={`num${option}`} style={styles.toggleCont}>
                <>
                  <Text>{option} Star Reviews</Text>
                  <Switch
                    onToggle={() => handleFilterSelection('num', option)}
                    isChecked={toggleChecked[`num_${option}`]}
                  />
                </>
              </HStack>
            ))}
            {productsServicesFilter.map(option => (
              <HStack key={`${option.filter}`} style={styles.toggleCont}>
                <>
                  <Text>{option.name}</Text>
                  <Switch
                    onToggle={() => handleFilterSelection(option.filter)}
                    isChecked={toggleChecked[`${option.filter}_0`]}
                  />
                </>
              </HStack>
            ))}
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

function getStarFilterOptions() {
  return [5, 4, 3, 2, 1];
}

function getProductServicesFilter() {
  return [
    {
      name: 'Products',
      filter: 'product',
    },
    {
      name: 'Services',
      filter: 'service',
    },
  ];
}

FilterForm.propTypes = {
  userId: PropTypes.string,
};
