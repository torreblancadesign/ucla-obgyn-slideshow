// airtable.js
import nextConnect from 'next-connect';

const apiKey = 'your_api_key';
const baseId = 'base_id_goes_here';
const tableName = encodeURIComponent('Topics');
const fields = encodeURIComponent('fields[]=Topic&fields[]=Title&fields[]=Content');
const url = `https://api.airtable.com/v0/${baseId}/${tableName}?${fields}`;

const handler = nextConnect()
  .get(async (req, res) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(200).json({ records: data.records });
  });

export default handler;
