import * as Yup from 'yup';
export const schema_login = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{6,15}$/,
      'Password must only contain characters and numbers and symbols'
    )
    .min(6, 'Password must be at least 6 characters'),
});

export const schema_signup = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{6,15}$/,
      'Password must only contain characters and numbers and symbols'
    )
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export const schema_email = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
export const schema_password = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{6,15}$/,
      'Password must only contain characters and numbers and symbols'
    )
    .min(6, 'Password must be at least 6 characters'),
  newpassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export const schema_country = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});
export const schema_city = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});
export const schema_boin = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  details: Yup.string().required('Details is required'),
  price: Yup.number().min(1).required('Price is required'),
});
export const schema_article = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.array().required('Category is required'),
});
export const schema_category = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});
export const schema_faq = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.array().required('Category is required'),
});
export const schema_service = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});
export const schema_user = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  location: Yup.string().required('Location is required'),
});
