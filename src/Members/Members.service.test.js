import findMembers from './Members.service';

describe('Members Services', () => {
  const fetchCustomMock = jest.fn();

  it('findMembers with default params', () => {
    findMembers({ fetchCustom: fetchCustomMock });
    expect(fetchCustomMock).toBeCalledWith('members?max=50&sort=lastname&dir=-1&skip=0', { signal: undefined });
  });
  it('findMembers with custom params', () => {
    findMembers({ fetchCustom: fetchCustomMock, max: 10, field: 'firstname', order: 1 });
    expect(fetchCustomMock).toBeCalledWith('members?max=10&sort=firstname&dir=1&skip=0', { signal: undefined });
  });
});
