import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const removeLastContact = async () => {
  try {
    const filePath = PATH_DB; // Используем PATH_DB напрямую

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
