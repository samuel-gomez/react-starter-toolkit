const expectLink = ({ getByRole, queryByRole, name, href = '', role = 'link', beInDoc = true }) => {
  const link = queryByRole ? queryByRole(role, { name }) : getByRole(role, { name });
  beInDoc ? expect(link).toBeInTheDocument() : expect(link).not.toBeInTheDocument();
  beInDoc && href && expect(link.href).toMatch(href);
};

export default expectLink;
