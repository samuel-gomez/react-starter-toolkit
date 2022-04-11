const expectButton = ({ getByRole, queryByRole, name, beDisabled = true, beInDoc = true }) => {
  const button = queryByRole ? queryByRole('button', { name }) : getByRole('button', { name });
  beInDoc ? expect(button).toBeInTheDocument() : expect(button).not.toBeInTheDocument();
  beInDoc && (beDisabled ? expect(button).toBeDisabled() : expect(button).not.toBeDisabled());
};

export default expectButton;
