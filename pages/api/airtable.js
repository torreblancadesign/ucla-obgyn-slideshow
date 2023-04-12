// airtable.js
import nextConnect from 'next-connect';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = 'appB6PVySBlUkfh3M';
const tableName = encodeURIComponent('Topics');
const fields = encodeURIComponent('fields[]=Topic&fields[]=Title&fields[]=Content');
const url = `https://api.airtable.com/v0/${baseId}/${tableName}?${fields}`;

const handler = nextConnect()
  .get(async (req, res) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Airtable API response error:', response.statusText);
        return res.status(response.status).json({ error: response.statusText });
      }

      const data = await response.json();
      const records = data.records;

      res.status(200).json(records);
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
      res.status(500).json({ error: 'Error fetching data from Airtable' });
    }
  });

export default handler;
