import { screen, within } from '@testing-library/dom';

type TexpectLink = {
  name: string;
  href?: string;
  role?: string;
  isQueryByRole?: boolean;
  beInDoc?: boolean;
  parentLabel?: string;
};

const expectLink = ({ isQueryByRole = false, name, href = '', role = 'link', beInDoc = true, parentLabel = '' }: TexpectLink) => {
  const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
  const link = (isQueryByRole ? base.queryByRole(role, { name: RegExp(name) }) : base.getByRole(role, { name: RegExp(name) })) as HTMLAnchorElement;

  if (beInDoc) {
    expect(link).toBeInTheDocument();
    if (href) {
      expect(link).toHaveAttribute('href', href);
    }
  } else {
    expect(link).not.toBeInTheDocument();
  }
};

export default expectLink;
