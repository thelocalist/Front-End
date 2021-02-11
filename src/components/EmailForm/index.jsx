import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import axios from 'axios';

import SubscriptionModal from '../../modals/SubscriptionModal/SubscriptionModal';
import { API_URL } from '../../constants/main';

import classes from './styles.module.scss';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function EmailForm({ show, small }) {
  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] = useState(
    false
  );
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false);
  const [subscriptionModalMessage, setSubscriptionModalMessage] = useState('');

  const submitForm = async (values) => {
    try {
      await axios.post(`${API_URL}/contacts`, {
        email: values.email,
      });
      setIsSuccessfullySent(true);
    } catch (error) {
      if (!error.response) {
        setSubscriptionModalMessage(
          'Sorry something went wrong, please try again later'
        );
        setIsSubscriptionModalVisible(true);
        return;
      }
      if (error.response.status === 400) {
        setSubscriptionModalMessage('This email is already joined');
        setIsSubscriptionModalVisible(true);
      }
    }
  };

  const hideSubscriptionModal = () => {
    setIsSubscriptionModalVisible(false);
  };

  return (
    <div
      className={classnames(
        classes.EmailForm,
        show ? classes.show : classes.hide,
        small && classes.small
      )}
    >
      <SubscriptionModal
        show={isSubscriptionModalVisible}
        onHide={hideSubscriptionModal}
        message={subscriptionModalMessage}
      />
      <div className={classes.text}>
        Join our mission to localize journalism and bring the power of the media
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
            {isSuccessfullySent ? (
              <Field
                name="success"
                type="text"
                value="You will hear from us soon!"
                className={classnames(classes.emailInput, classes.success)}
                disabled
              />
            ) : (
              <Field
                name="email"
                type="email"
                placeholder="EMAIL..."
                className={classnames(
                  classes.emailInput,
                  errors.email && values.email && classes.invalid
                )}
              />
            )}

            <button
              type="submit"
              className={
                isSuccessfullySent
                  ? classnames(classes.submitButton, classes.sent)
                  : classes.submitButton
              }
              disabled={errors.email || !values.email}
            >
              Inform me!
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
