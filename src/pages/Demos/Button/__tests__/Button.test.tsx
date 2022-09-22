import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import ButtonPage, { code } from '../Button';

describe('<ButtonPage/>', () => {
  it('Should render ButtonPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ButtonPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

const cleanString = (str: string) => str.replace(/\s/g, '').replace(/\n/g, '').replace(/\t/g, '').trim();

describe('code', () => {
  const onChange = jest.fn();
  const label = 'valider';
  const className = 'af-btn';
  const classModifier = 'af-btn';
  const icon = 'ok';
  const disabled = true;

  it('Should render ButtonPage with icon', () => {
    const result = code({ label, className, classModifier, icon, disabled, onChange });
    expect(cleanString(result)).toEqual(
      cleanString(`<Button disabled={${disabled}} className="${className}" classModifier="${classModifier}" type="submit" onClick={onClick} >
          <i className="glyphicon glyphicon-${icon}"></i><span className="af-btn__text">${label}</span>
        </Button>
    `),
    );
  });

  it('Should render ButtonPage without icon', () => {
    const result = code({ label, className, classModifier, disabled, onChange });
    expect(cleanString(result)).toEqual(
      cleanString(`<Button disabled={${disabled}} className="${className}" classModifier="${classModifier}" type="submit" onClick={onClick} >
          <span className="af-btn__text">${label}</span>
        </Button>
    `),
    );
  });
});
