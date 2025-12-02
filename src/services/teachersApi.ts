import {
  ref,
  get,
  query,
  limitToFirst,
  startAfter,
  orderByKey,
} from "firebase/database";
import { db } from "../firebase/firebase";
import type { Teacher, TeacherDB } from "../types";

// Функція для мапінгу даних вчителя з формату бази даних до формату застосунку
export const mapTeacherFromDB = (id: string, teacherDB: TeacherDB): Teacher => {
  return {
    id,
    name: teacherDB.name,
    surname: teacherDB.surname,
    languages: teacherDB.languages,
    levels: teacherDB.levels,
    rating: teacherDB.rating,
    reviews: teacherDB.reviews ? Object.values(teacherDB.reviews) : [],
    price_per_hour: teacherDB.price_per_hour,
    lessons_done: teacherDB.lessons_done,
    avatar_url: teacherDB.avatar_url,
    lesson_info: teacherDB.lesson_info,
    conditions: teacherDB.conditions ? Object.values(teacherDB.conditions) : [],
    experience: teacherDB.experience,
  };
};

// Функція для отримання вчителів з пагінацією
export const fetchTeachersPaginated = async (
  pageSize: number = 4,
  lastKey?: string
): Promise<{ teachers: Teacher[]; lastKey: string | null }> => {
  try {
    const teachersRef = ref(db, "teachers");

    let teachersQuery;

    if (lastKey) {
      // Якщо є lastKey — завантажуємо НАСТУПНУ порцію (після цього ключа)
      teachersQuery = query(
        teachersRef,
        orderByKey(), // Сортуємо за ID
        startAfter(lastKey), // Починаємо ПІСЛЯ останнього завантаженого ключа
        limitToFirst(pageSize) // Беремо тільки pageSize елементів (наприклад, 4)
      );
    } else {
      // Якщо немає lastKey — це ПЕРША сторінка
      teachersQuery = query(
        teachersRef,
        orderByKey(),
        limitToFirst(pageSize) // Беремо перші 4 елементи
      );
    }

    const snapshot = await get(teachersQuery);

    if (!snapshot.exists()) {
      return { teachers: [], lastKey: null };
    }

    const data = snapshot.val() as { [key: string]: TeacherDB };

    // Перетворюємо об'єкт в масив вчителів
    const teachers = Object.entries(data).map(([id, teacherDB]) =>
      mapTeacherFromDB(id, teacherDB)
    );

    // Зберігаємо ОСТАННІЙ ключ для наступного запиту
    const keys = Object.keys(data);
    const newLastKey = keys.length > 0 ? keys[keys.length - 1] : null;
    console.log("Fetched teachers with pagination:", teachers);
    console.log(`Fetched ${teachers.length} teachers, lastKey: ${newLastKey}`);

    return {
      teachers, // Масив вчителів
      lastKey: newLastKey, // Ключ для наступної порції
    };
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

// Функція для отримання списку вчителів з Firebase Realtime Database
export const fetchTeachers = async (): Promise<Teacher[]> => {
  try {
    const teachersRef = ref(db, "teachers");
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val() as { [key: string]: TeacherDB };

    const teachers = Object.entries(data).map(([id, teacherDB]) =>
      mapTeacherFromDB(id, teacherDB)
    );
    console.log("Fetched teachers:", teachers);

    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

// Функція для отримання унікальних мов
export const getUniqueLanguages = (teachers: Teacher[]): string[] => {
  const languages = teachers.flatMap((teacher) => teacher.languages);
  return [...new Set(languages)].sort();
};

// Функція для отримання унікальних рівнів
export const getUniqueLevels = (teachers: Teacher[]): string[] => {
  const levels = teachers.flatMap((teacher) => teacher.levels);
  return [...new Set(levels)];
};

// Функція для отримання діапазону цін
export const getPriceRange = (teachers: Teacher[]): number[] => {
  const prices = teachers.map((teacher) => teacher.price_per_hour);
  return [...new Set(prices)].sort((a, b) => a - b);
};
