import React from 'react';
import { render } from '@testing-library/react';
import HelpInfo from '.';

describe('<HelpInfo/>', () => {
  it('Should render HelpInfo', () => {
    const { asFragment } = render(
      <HelpInfo content={<p>info</p>}>
        <h1>Hello</h1>
      </HelpInfo>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render HelpInfo without popover when is disabled', () => {
    const { asFragment } = render(
      <HelpInfo content={<p>info</p>} isDisabled>
        <h1>Hello</h1>
      </HelpInfo>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render HelpInfo without popover when no content hover', () => {
    const { asFragment } = render(
      <HelpInfo>
        <h1>Hello</h1>
      </HelpInfo>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
