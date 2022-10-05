import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { clearString } from 'shared/testsUtils';
import AlertPage, { code } from '../Alert';

describe('<AlertPage/>', () => {
  it('Should render AlertPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<AlertPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();
  const title = 'valider';
  const className = 'af-alert';
  const classModifier = 'danger';
  const icon = 'ok';
  const children = '<p>child</p>';

  it('Should render AlertPage with icon', () => {
    const result = code({ title, className, classModifier, icon, onChange });
    expect(clearString(result)).toEqual(
      clearString(`<Alert title="${title}" icon="ok" className="${className}" classModifier="${classModifier}" type="submit" onClose={null} ></Alert>
    `),
    );
  });

  it('Should render AlertPage without icon and with children', () => {
    const result = code({ title, className, classModifier, onChange, children });
    expect(clearString(result)).toEqual(
      clearString(`<Alert title="${title}" icon="" className="${className}" classModifier="${classModifier}" type="submit" onClose={null} >
         ${children}
        </Alert>
    `),
    );
  });
});
