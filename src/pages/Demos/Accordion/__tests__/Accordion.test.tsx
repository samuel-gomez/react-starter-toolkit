import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import AccordionPage, { code } from '../Accordion';

describe('<Accordion />', () => {
  it('Should render AccordionPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<AccordionPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: '',
    className: '',
    onlyOne: true,
    header1: 'Header 1',
    header2: 'Header 2',
    header3: 'Header 3',
    content1: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
    soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
    content2: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
    soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
    content3: `<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
    soluta odio voluptatibus natus a impedit tenetur dolor!</p>`,
    onChange,
  };

  it('Should render Accordion with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
          <Accordion
            classModifier="${defaultProps.classModifier}"
            className="${defaultProps.className}"
            onlyOne={${defaultProps.onlyOne}} id="test">

            <CollapseCard onToggle={onClick} id="id1">
              <CollapseCard.Header>
                ${defaultProps.header1}
              </CollapseCard.Header>
              <CollapseCard.Body>
                ${defaultProps.content1}
              </CollapseCard.Body>
            </CollapseCard>

            <CollapseCard onToggle={onClick} id="id2">
              <CollapseCard.Header>
                ${defaultProps.header2}
              </CollapseCard.Header>
              <CollapseCard.Body>
                ${defaultProps.content2}
              </CollapseCard.Body>
            </CollapseCard>

            <CollapseCard onToggle={onClick} id="id3">
              <CollapseCard.Header>
                ${defaultProps.header3}
              </CollapseCard.Header>
              <CollapseCard.Body>
                ${defaultProps.content3}
              </CollapseCard.Body>
            </CollapseCard>

        </Accordion>
      `),
    );
  });
});
