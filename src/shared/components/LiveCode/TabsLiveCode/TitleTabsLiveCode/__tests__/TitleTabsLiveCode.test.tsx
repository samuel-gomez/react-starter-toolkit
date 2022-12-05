import { render } from '@testing-library/react';
import TitleTabsLiveCode from '../TitleTabsLiveCode';

const propsMock = {
  icon: 'ok',
  title: 'title',
};
describe('<TabsLiveCode />', () => {
  it('Render <TabsLiveCode /> with props', () => {
    const { asFragment } = render(<TitleTabsLiveCode props={propsMock} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
