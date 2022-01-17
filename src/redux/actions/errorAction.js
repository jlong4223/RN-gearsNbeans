export const clearError = () => {
  console.log('clearError');

  return async dispatch => {
    dispatch({
      type: 'CLEAR_ERROR',
      payload: null,
    });
  };
};
