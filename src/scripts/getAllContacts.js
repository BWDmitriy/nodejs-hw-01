import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const getAllContacts = async () => {
  try {
    const filePath = PATH_DB; // Используем PATH_DB напрямую
    const data = await fs.readFile(filePath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error('Error reading contacts:', err);
    return [];
  }
};

console.log(await getAllContacts());
