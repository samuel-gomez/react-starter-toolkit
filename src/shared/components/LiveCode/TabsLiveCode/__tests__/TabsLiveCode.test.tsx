import { render } from '@testing-library/react';
import TabsLiveCode from '../TabsLiveCode';

describe('<TabsLiveCode />', () => {
  it('Render <TabsLiveCode /> with children', () => {
    const { asFragment } = render(
      <TabsLiveCode>
        <div>test</div>
        <div>test</div>
      </TabsLiveCode>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
