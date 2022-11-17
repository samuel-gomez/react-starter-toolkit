import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import FooterClientPage, { code } from '../FooterClient';

describe('<FooterClient />', () => {
  it('Should render FooterClientPage', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<FooterClientPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    languages: [
      {
        name: 'English',
        value: 'en',
      },
      {
        name: 'Chinese',
        value: 'cn',
      },
    ],
    currentLanguage: 'en',
    socialNetworkList: {
      facebook: '#',
      linkedin: '#',
      youtube: '#',
      instagram: '#',
      twitter: '#',
    },
    copyright: 'Policy Privacy © 2022 AXA All Rights Reserved',
    onChange,
  };

  it('Should render FooterClient with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
        <FooterClient
          bottomComponent={<LanguageSelection languages={${JSON.stringify(defaultProps.languages)}} 
          currentLanguage="${defaultProps.currentLanguage}" />}
          copyright="${defaultProps.copyright}">
          <FooterClientList title="Languages" >
            <FooterClientItem path="/">
              Languages
            </FooterClientItem>
            <FooterClientItem path="/">
              Young driver insurance
            </FooterClientItem>
            <FooterClientItem path="/">
              Home insurance
            </FooterClientItem>
          </FooterClientList>
          <FooterClientList title="Axa & You" >
            <FooterClientItem path="/">
              Call us
            </FooterClientItem>
            <FooterClientItem path="/">
              Policy documents
            </FooterClientItem>
          </FooterClientList>
          <FooterClientList title="Useful links" >
            <FooterClientItem path="/">
              About us
            </FooterClientItem>
            <FooterClientItem path="/">
              Careers
            </FooterClientItem>
            <FooterClientItem path="/">
              Blog
            </FooterClientItem>
          </FooterClientList>
          <FooterClientList title="Follow AXA">
            <SocialNetwork list={${JSON.stringify(defaultProps.socialNetworkList)}} />
          </FooterClientList>
        </FooterClient>
      `),
    );
  });
});
