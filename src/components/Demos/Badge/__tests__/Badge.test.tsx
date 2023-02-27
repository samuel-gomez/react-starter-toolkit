import { clearString } from 'shared/testsUtils';
import { code } from '../Badge';

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    children: 'Coucou',
    classModifier: 'success',
    disabled: false,
    onChange,
  };

  it('Should render Badge with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <Badge
        classModifier="${defaultProps.classModifier}"
        disabled={${defaultProps.disabled}}>
        ${defaultProps.children}
      </Badge>
      `),
    );
  });
});
