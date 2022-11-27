import { screen } from '@testing-library/dom';

type TexpectButton = {
  name: string;
  isQueryByRole?: boolean;
  beDisabled?: boolean;
  beInDoc?: boolean;
};

const expectButton = ({ isQueryByRole = false, name, beDisabled = true, beInDoc = true }: TexpectButton) => {
  const button = isQueryByRole ? screen.queryByRole('button', { name: RegExp(name) }) : screen.getByRole('button', { name: RegExp(name) });
  beInDoc ? expect(button).toBeInTheDocument() : expect(button).not.toBeInTheDocument();
  beInDoc && (beDisabled ? expect(button).toBeDisabled() : expect(button).not.toBeDisabled());
};

export default expectButton;
