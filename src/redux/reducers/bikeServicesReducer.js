import { GET_SERVICES, GET_ERROR } from '~redux/constants';

const initialState = {
  services: [],
  error: null,
};

export function bikeServicesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
