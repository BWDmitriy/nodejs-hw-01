import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'fs/promises';
import path from 'path';

const generateContacts = async (number) => {
  try {
    const filePath = PATH_DB;
    const dirPath = path.dirname(filePath);

    console.log('Directory Path:', dirPath);
    console.log('File Path:', filePath);

    await fs.mkdir(dirPath, { recursive: true });
    console.log('Directory created or already exists.');

    const data = [];
    for (let i = 0; i < number; i++) {
      let temp = createFakeContact();
      data.push(temp);
    }

    try {
      await fs.access(filePath);
    } catch (err) {
      await fs.writeFile(filePath, '[]', 'utf8');
    }

    const existingData = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(existingData);

    const updatedData = parsedData.concat(data);

    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log('Data added');
  } catch (err) {
    console.error('Error:', err);
  }
};

export default generateContacts;

generateContacts(5);
