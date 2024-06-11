import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const removeAllContacts = async () => {
  try {
    const filePath = path.resolve(__dirname, PATH_DB);

    try {
      await fs.access(filePath);
    } catch (err) {
      await fs.writeFile(filePath, '[]', 'utf8');
    }

    await fs.writeFile(filePath, '[]', 'utf8');
    console.log('Data removed');
  } catch (err) {
    console.error('Error:', err);
  }
};

removeAllContacts();
