import React from 'react';
import { render } from '@testing-library/react';
import { MembersHeaderThSortable, MembersHeaderTh } from './MembersHeaderTh.component';

describe('<MembersHeaderTh/>', () => {
  it('Should render MembersHeaderTh with Hello text', () => {
    const tr = document.createElement('tr');
    const { asFragment, getByText } = render(<MembersHeaderTh>Hello</MembersHeaderTh>, {
      container: document.body.appendChild(tr),
    });
    expect(getByText('Hello')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<MembersHeaderThSortable />', () => {
  it('Should render MembersHeaderThSortable with Hello text', () => {
    const tr = document.createElement('tr');
    const { asFragment, getByText, getByRole } = render(
      <MembersHeaderThSortable sortable order={1} sortingIcon={<span role="img">♛</span>}>
        Hello
      </MembersHeaderThSortable>,
      {
        container: document.body.appendChild(tr),
      },
    );
    expect(getByText('Hello')).toBeDefined();
    expect(getByText('♛')).toBeDefined();
    expect(getByRole('img')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
