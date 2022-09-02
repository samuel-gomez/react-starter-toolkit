const setConfirmClassModifier = (hasErrors: boolean, classModifier = 'confirm') => `${classModifier}${hasErrors ? ' disabled' : ' success'}`;

export default setConfirmClassModifier;
