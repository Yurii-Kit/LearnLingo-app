import { ref, get } from "firebase/database";
import { db } from "../firebase/firebase";
import type { Teacher } from "../types";

export const fetchTeachers = async (): Promise<Teacher[]> => {
  try {
    const teachersRef = ref(db, "teachers");

    const snapshot = await get(teachersRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);

      // Якщо дані у вигляді масиву
      if (Array.isArray(data)) {
        return data.filter((item) => item !== null); // Фільтруємо null елементи
      }
      // Якщо дані у вигляді об'єкта з ключами
      const teachers = Object.entries(data).map(([id, teacher]) => ({
        id,
        ...(teacher as Teacher),
      }));

      return teachers;
    }

    return [];
  } catch (error) {
    console.error("Error fetching teachers:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      stack: error instanceof Error ? error.stack : undefined,
    });
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
