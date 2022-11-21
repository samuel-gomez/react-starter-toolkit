import { render } from '@testing-library/react';
import InputEditor from '../InputEditor';

describe('InputEditor', () => {
  const onChange = jest.fn();
  it.each`
    value
    ${true}
    ${'value'}
    ${{ value: 'value', options: [] }}
    ${{ value: 'value', type: 'jsx', labelBtnOpenCodeEditor: 'Edit JSX' }}
    ${{ value: 'value', type: 'json', labelBtnOpenCodeEditor: 'Edit Json' }}
    ${{ value: 'value', type: 'separator' }}
  `('Should render when value: $value', ({ value }) => {
    const { asFragment } = render(<InputEditor value={value} name="name" onChange={onChange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
