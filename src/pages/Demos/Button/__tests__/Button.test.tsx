import { clearString } from 'shared/testsUtils';
import { code } from '../Button';

describe('code', () => {
  const icon = 'ok';

  const defaultProps = {
    onChange: jest.fn(),
    label: 'valider',
    className: 'af-btn',
    classModifier: '',
    id: 'uniqueid',
    disabled: true,
  };

  it('Should render ButtonPage with icon', () => {
    const result = code({ ...defaultProps, icon });
    expect(clearString(result)).toEqual(
      clearString(`<Button id="${defaultProps.id}" disabled={${defaultProps.disabled}} className="${defaultProps.className}" classModifier="${defaultProps.classModifier}" onClick={onClick} >
          <i role="img" aria-label="ok" className="glyphicon glyphicon-${icon}"></i><span className="af-btn__text">${defaultProps.label}</span>
        </Button>
    `),
    );
  });

  it('Should render ButtonPage without icon', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`<Button id="${defaultProps.id}" disabled={${defaultProps.disabled}} className="${defaultProps.className}" classModifier="${defaultProps.classModifier}" onClick={onClick} >
          <span className="af-btn__text">${defaultProps.label}</span>
        </Button>
    `),
    );
  });
});
