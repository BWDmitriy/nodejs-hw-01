import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateContacts = async (number) => {
  try {
    const filePath = path.resolve(__dirname, PATH_DB); // Создаем полный путь к файлу
    const dirPath = path.dirname(filePath); // Получаем путь к директории файла

    console.log('Directory Path:', dirPath);
    console.log('File Path:', filePath);

    // Проверяем, существует ли директория, и создаем ее, если нет
    await fs.mkdir(dirPath, { recursive: true });
    console.log('Directory created or already exists.');

    const data = [];
    for (let i = 0; i < number; i++) {
      let temp = createFakeContact();
      data.push(temp);
    }

    // Проверяем, существует ли файл, и создаем его, если нет
    try {
      await fs.access(filePath);
    } catch (err) {
      await fs.writeFile(filePath, '[]', 'utf8'); // Создаем файл с пустым массивом, если он не существует
    }

    // Читаем существующие данные из файла
    const existingData = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(existingData);

    // Добавляем новые данные к существующим
    const updatedData = parsedData.concat(data);

    // Записываем обновленные данные обратно в файл
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log('Data added');
  } catch (err) {
    console.error('Error:', err);
  }
};

// Экспортируем функцию generateContacts
export default generateContacts;

// Вызываем функцию для генерации контактов
generateContacts(5);
