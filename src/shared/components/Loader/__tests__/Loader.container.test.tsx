import { render } from '@testing-library/react';
import LoaderContainer from '../Loader.container';

const LoaderCmpt = jest.fn();

const defaultProps = {
  LoaderCmpt,
};
describe('<LoaderContainer />', () => {
  it.each`
    classModifier | text             | mode         | expectedClassModifier | isVisible | message
    ${undefined}  | ${undefined}     | ${undefined} | ${''}                 | ${false}  | ${''}
    ${''}         | ${''}            | ${'none'}    | ${''}                 | ${false}  | ${''}
    ${'sam'}      | ${''}            | ${'none'}    | ${'sam'}              | ${false}  | ${''}
    ${'sam'}      | ${''}            | ${'get'}     | ${'sam active'}       | ${true}   | ${'Chargement en cours'}
    ${'sam'}      | ${'mon message'} | ${'get'}     | ${'sam active'}       | ${true}   | ${'mon message'}
  `(
    'Should render view with expectedClassModifier: $expectedClassModifier, isVisible: $isVisible, message: $message when classModifier: $classModifier, text: $text, mode: $mode',
    ({ expectedClassModifier, isVisible, message, ...rest }) => {
      render(<LoaderContainer {...defaultProps} {...rest} />);
      expect(LoaderCmpt).toHaveBeenCalledWith(
        {
          classModifier: expectedClassModifier,
          isVisible,
          message,
        },
        {},
      );
    },
  );
});
