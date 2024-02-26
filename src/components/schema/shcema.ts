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
export const schema_country = ({ name, description }: TSchema_City_Country) =>
  Yup.object().shape({
    name: Yup.string().required(name),
    description: Yup.string().required(description),
  });
export const schema_city = ({ name, description }: TSchema_City_Country) =>
  Yup.object().shape({
    name: Yup.string().required(name),
    description: Yup.string().required(description),
  });
export const schema_boin = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  details: Yup.string().required('Details is required'),
  price: Yup.number().min(1).required('Price is required'),
});
export const schema_article = ({ title, description, cat }: Tschema_faq) =>
  Yup.object().shape({
    title: Yup.string().required(title),
    description: Yup.string().required(description),
    category: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number(),
          name: Yup.string(),
        })
      )
      .min(1, cat),
  });
export const schema_category = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

type Tschema_faq = {
  title: string;
  description: string;
  cat: string;
};
type Tschema_Service = {
  title: string;
  description: string;
};
type Tschema_User = {
  name: string;
  email: string;
  phone: string;
  location: string;
};
type TSchema_City_Country = {
  name: string;
  description: string;
};

export const schema_faq = ({ title, description, cat }: Tschema_faq) =>
  Yup.object().shape({
    title: Yup.string().required(title),
    description: Yup.string().required(description),
    category: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number(),
          name: Yup.string(),
        })
      )
      .min(1, cat),
  });
export const schema_service = ({ title, description }: Tschema_Service) =>
  Yup.object().shape({
    title: Yup.string().required(title),
    description: Yup.string().required(description),
  });
export const schema_user = ({ name, email, phone, location }: Tschema_User) =>
  Yup.object().shape({
    name: Yup.string().required(name),
    email: Yup.string().required(email),
    phone: Yup.string().required(phone),
    location: Yup.string().required(location),
  });
