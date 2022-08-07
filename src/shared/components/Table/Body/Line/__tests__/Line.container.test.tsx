import { renderWithContainer } from 'shared/testsUtils';
import LineContainer, { TLineContainer } from '../Line.container';

const LineCmpt = jest.fn();

const defaultProps = {
  LineCmpt,
};

const container = document.createElement('tbody');
const cols = [
  ['firstname', { label: 'Antonius' }],
  ['lastname', { label: 'Panketh' }],
  ['birthdate', { label: '20/12/1968' }],
  ['sexe', { label: 'F' }],
] as unknown as TLineContainer['cols'];

describe('LineContainer', () => {
  it('Render <LineContainer/> with cols and actions', () => {
    renderWithContainer(<LineContainer {...defaultProps} cols={cols} />, container);

    expect(LineCmpt).toHaveBeenCalledWith(
      {
        className: undefined,
        columns: [
          {
            hover: undefined,
            keyCol: 'firstname',
            label: 'Antonius',
          },
          {
            hover: undefined,
            keyCol: 'lastname',
            label: 'Panketh',
          },
          {
            hover: undefined,
            keyCol: 'birthdate',
            label: '20/12/1968',
          },
          {
            hover: undefined,
            keyCol: 'sexe',
            label: 'F',
          },
        ],
        modifier: '',
      },
      {},
    );
  });
});
