import { React, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import classes from './styles.module.scss';
import SubscriptionModal from '../../modals/SubscriptionModal/SubscriptionModal';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function EmailForm({ show, small, setIsEmailFormVisible }) {
  let emailFormClasses = classnames(
    show
      ? classnames(classes.EmailForm, classes.show)
      : classnames(classes.EmailForm, classes.hide)
  );

  emailFormClasses = classnames(
    small ? classnames(emailFormClasses, classes.small) : emailFormClasses
  );

  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] = useState(
    false
  );
  const [subscriptionModalMessage, setSubscriptionModalMessage] = useState('');

  const submitForm = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/contacts`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        }
      );
      if (response.ok) {
        setIsSubscriptionModalVisible(true);
        setSubscriptionModalMessage('The email was sent successfully');
        setIsEmailFormVisible(false);
      } else {
        setSubscriptionModalMessage('Please, write correct email');
        setIsSubscriptionModalVisible(true);
      }
    } catch (error) {
      setSubscriptionModalMessage('Please, write correct email');
      setIsSubscriptionModalVisible(true);
    }
  };

  const hideSubscriptionModal = () => {
    setIsSubscriptionModalVisible(false);
  };

  return (
    <div className={emailFormClasses}>
      <SubscriptionModal
        show={isSubscriptionModalVisible}
        onHide={hideSubscriptionModal}
        message={subscriptionModalMessage}
      />
      <div className={classes.text}>
        Join our mission to localize journalism and give the power of the media
        back to the people!
      </div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={EmailSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ errors, values }) => (
          <Form noValidate>
            <Field
              name="email"
              type="email"
              placeholder="Email..."
              className={classnames(
                classes.emailInput,
                errors.email && values.email ? classes.invalid : null
              )}
            />

            <button
              type="submit"
              className={classes.submitButton}
              disabled={errors.email || !values.email}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
