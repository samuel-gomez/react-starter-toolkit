import { screen } from '@testing-library/dom';

type TexpectLink = {
  name: string;
  href?: string;
  role?: string;
  isQueryByRole?: boolean;
  beInDoc?: boolean;
};

const expectLink = ({ isQueryByRole = false, name, href = '', role = 'link', beInDoc = true }: TexpectLink) => {
  const link = (isQueryByRole ? screen.queryByRole(role, { name }) : screen.getByRole(role, { name })) as HTMLAnchorElement;
  beInDoc ? expect(link).toBeInTheDocument() : expect(link).not.toBeInTheDocument();
  beInDoc && href && expect(link.href).toMatch(href);
};

export default expectLink;
