import searchMembers from '../SearchMembers.service';

describe('Search Members Services', () => {
  const fetchCustomMock = jest.fn();

  it('searchMembers', () => {
    searchMembers({ fetchCustom: fetchCustomMock, signal: 'abort' });
    expect(fetchCustomMock).toBeCalledWith('members', {
      method: 'POST',
      signal: 'abort',
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
