export default ({ fetchCustom, field = 'lastname', order = -1, max = 20 }) => fetchCustom(`members?max=${max}&sort=${field}&dir=${order}`);
