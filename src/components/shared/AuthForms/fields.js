export const loginFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    required: true,
    validation: {
      required: true,
      email: true,
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    required: true,
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const registerFields = [
  ...loginFields,
  {
    label: 'First Name',
    name: 'firstName',
    placeholder: 'First Name',
    validation: {
      required: true,
    },
  },
  {
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Last Name',
    validation: {
      required: true,
    },
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    placeholder: 'Phone Number',
    validation: {
      required: true,
    },
  },
];
