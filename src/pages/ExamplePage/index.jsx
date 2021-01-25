import React from 'react';

import { t } from '../../i18n';
import styles from './styles.module.scss';

const ExamplePage = () => (
  <div className={styles.root}>{t('App-name Example')}</div>
);

export default ExamplePage;

// RESOURCE USAGE EXAMPLE:
// import { connect } from 'react-redux';
//
// import { actions as userActions } from '../../resources/users';
//
// const ExamplePage = ({ users, fetchUsers }) => {
//   useEffect(fetchUsers, []);
//
//   return <div>{isFetching ? <Spinner /> : users.map(({ name }) => name)}</div>;
// };
// export default connect(
//   (state) => ({
//     users: state.users.items,
//     isFetching: state.users.isFetching,
//     pageIndex: state.users.pageIndex,
//     totalItemsCount: state.users.totalItemsCount,
//   }),
//   {
//     fetchUsers: userActions.fetchUsers,
//   }
// )(ExamplePage);
