import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id?: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export const fetchTeachers = async (): Promise<Teacher[]> => {
  try {
    const teachersRef = ref(db, "teachers");
    const snapshot = await get(teachersRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Якщо дані у вигляді масиву
      if (Array.isArray(data)) {
        return data;
      }
      // Якщо дані у вигляді об'єкта з ключами
      return Object.entries(data).map(([id, teacher]) => ({
        id,
        ...(teacher as Teacher),
      }));
    }
    return [];
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
