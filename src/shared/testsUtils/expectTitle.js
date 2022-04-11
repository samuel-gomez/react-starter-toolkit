const expectTitle = ({ getByRole, queryByRole, label, name = label, level = 1, beInDoc = true }) => {
  const title = queryByRole ? queryByRole('heading', { level, name }) : getByRole('heading', { level, name });
  beInDoc ? expect(title).toBeInTheDocument() : expect(title).not.toBeInTheDocument();
  beInDoc && label && expect(title).toHaveTextContent(RegExp(label));
};

export default expectTitle;
