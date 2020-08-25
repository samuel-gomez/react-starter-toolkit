import findMembers from './Members.service';

describe('Members Services', () => {
  const fetchCustomMock = jest.fn();

  it('findMembers', () => {
    findMembers({ fetchCustom: fetchCustomMock });
    expect(fetchCustomMock).toBeCalled();
    expect(fetchCustomMock).toBeCalledWith('members');
  });
});
