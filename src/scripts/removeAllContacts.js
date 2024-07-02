import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const removeAllContacts = async () => {
  try {
    const filePath = PATH_DB; // Используем PATH_DB напрямую

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
