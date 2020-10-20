export default ({ fetchCustom, signal, field = 'lastname', order = -1, max = 50, skip = 0 }) =>
  fetchCustom(`members?max=${max}&sort=${field}&dir=${order}&skip=${skip}`, { signal });
