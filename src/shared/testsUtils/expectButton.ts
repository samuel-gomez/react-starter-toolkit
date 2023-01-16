import { screen, within } from '@testing-library/dom';

type TexpectButton = {
  name: string;
  isQueryByRole?: boolean;
  beDisabled?: boolean;
  beInDoc?: boolean;
  parentLabel?: string;
};

const expectButton = ({ isQueryByRole = false, name, beDisabled = true, beInDoc = true, parentLabel = '' }: TexpectButton) => {
  const base = parentLabel ? within(screen.getByLabelText(parentLabel)) : screen;
  const button = isQueryByRole ? base.queryByRole('button', { name: RegExp(name) }) : base.getByRole('button', { name: RegExp(name) });
  if (beInDoc) {
    expect(button).toBeInTheDocument();
    if (beDisabled) {
      expect(button).toBeDisabled();
    } else {
      expect(button).not.toBeDisabled();
    }
  } else {
    expect(button).not.toBeInTheDocument();
  }
};

export default expectButton;
