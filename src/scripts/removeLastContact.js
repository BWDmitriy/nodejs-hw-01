import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const removeLastContact = async () => {
  try {
    const filePath = path.resolve(__dirname, PATH_DB);

    try {
      await fs.access(filePath);
    } catch (err) {
      await fs.writeFile(filePath, '[]', 'utf8');
    }

    const existingData = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(existingData);

    if (parsedData.length > 0) {
      parsedData.pop();
    }

    await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf8');
    console.log('Last contact removed');
  } catch (err) {
    console.error('Error:', err);
  }
};

removeLastContact();
