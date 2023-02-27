import { render } from '@testing-library/react';
import Accordion from 'app/demos/accordion/page';

describe('<AccordionDemo />', () => {
  it('Should render AccordionDemo', () => {
    const { asFragment } = render(<Accordion />);
    expect(asFragment()).toMatchSnapshot();
  });
});
