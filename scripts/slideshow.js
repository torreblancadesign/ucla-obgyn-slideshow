const fetchData = async () => {
  const res = await fetch('/api/airtable');
  const data = await res.json();
  return data;
};

export default fetchData;

