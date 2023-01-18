const cleanString = (str?: string) => str?.replace(/\s/g, '').replace(/\n/g, '').replace(/\t/g, '').trim();

export default cleanString;
