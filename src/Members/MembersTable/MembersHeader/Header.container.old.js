import { withProps, compose } from 'recompose';
import withConsumerProps from 'Shared/hoc/withConsumerProps';
import withUpdate from 'Shared/hoc/withUpdate';
import TableHeader from './Header.component';
import { SimulationsListConsumer } from '../../SimulationsListContext';

export const withSortingConsumer = withConsumerProps(
  SimulationsListConsumer,
  ({ sorting, orderHandleOnChange }) => ({
    sorting,
    onSort: orderHandleOnChange,
  })
);

export const withSortingInfo = withProps(({ sorting: { field, order } }) => ({
  sortingInfo: !field ? {} : { [field]: order },
}));

const enhance = compose(withSortingConsumer, withSortingInfo, withUpdate);

export default enhance(TableHeader);
