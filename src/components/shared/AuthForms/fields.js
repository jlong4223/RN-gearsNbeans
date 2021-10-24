import React from 'react';
import { Input } from 'native-base';

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
  ...loginFields,
];

export function getInputFields(fieldType, styles, handleChange) {
  switch (fieldType) {
    case 'login':
      return setFields(loginFields, styles, handleChange);

    case 'register':
      return setFields(registerFields, styles, handleChange);

    default:
      return [];
  }
}

function setFields(fieldType, styles, handleChange) {
  return fieldType.map(field => (
    <Input
      style={styles.btnAndInput}
      key={field.name}
      type={field.type}
      _focus={styles.inputFocus}
      isRequired={field.required}
      placeholder={field.placeholder}
      onChangeText={value => handleChange(field.name, value)}
    />
  ));
}
