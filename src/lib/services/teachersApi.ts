import { ref, get } from "firebase/database";
import { db } from "../../firebase/firebase";
import type { Teacher, TeacherDB } from "../../types";

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
