import { screen, within } from '@testing-library/dom';

type TexpectTitle = {
  name: string | RegExp;
  isQueryByRole?: boolean;
  beInDoc?: boolean;
  level?: number;
  parentLabel?: string;
};

const expectTitle = ({ isQueryByRole = false, name, level = 1, beInDoc = true, parentLabel = '' }: TexpectTitle) => {
  const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
  const title = isQueryByRole ? base.queryByRole('heading', { level, name }) : base.getByRole('heading', { level, name });

  if (beInDoc) {
    expect(title).toBeInTheDocument();
    if (name) {
      expect(title).toHaveTextContent(RegExp(name));
    }
  } else {
    expect(title).not.toBeInTheDocument();
  }
};

export default expectTitle;
