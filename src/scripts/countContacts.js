import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const countContacts = async () => {
  try {
    const filePath = path.resolve(__dirname, PATH_DB);
    const data = await fs.readFile(filePath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts.length;
  } catch (err) {
    console.error('Error reading contacts count:', err);
    return [];
  }
};

console.log(await countContacts());
