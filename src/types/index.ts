// ============================================
// Firebase Database Types (як зберігається в БД)
// ============================================

export interface ReviewDB {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface TeacherDB {
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: { [key: string]: ReviewDB }; // Об'єкт з ключами
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: { [key: string]: string }; // Об'єкт з ключами
  experience: string;
}

// ============================================
// Teacher & Reviews Types
// ============================================

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id: string; // обов'язкове після завантаження
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[]; // Масив
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[]; // Масив
  experience: string;
}

// ============================================
// Store State Types
// ============================================

// Auth Store Types
export interface User {
  uid: string;
  email: string | null;
  name?: string | null;
}

export interface AuthState {
  user: User | null;
  isLoading?: boolean;
  isLoggedIn: boolean;
  favorites: string[];
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setIsLoading: (state: boolean) => void;
  setIsLoggedIn: (state: boolean) => void;
  fetchFavorites: () => Promise<void>;
  addFavorite: (teacherId: string) => Promise<void>;
  removeFavorite: (teacherId: string) => Promise<void>;
}
// Teachers Store Types
export interface TeachersState {
  teachers: Teacher[];
  setTeachers: (teachers: Teacher[]) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isError?: boolean;
  setIsError: (isError: boolean) => void;
}
// Options Store Types

export interface LanguageOption {
  label: string;
  value: string;
}
export type LevelOption = LanguageOption;
export type PriceOption = LanguageOption;

export interface OptionsState {
  languageOptions: LanguageOption[];
  setLanguageOptions: (languages: LanguageOption[]) => void;
  levelOptions: LevelOption[];
  setLevelOptions: (levels: LevelOption[]) => void;
  priceOptions: PriceOption[];
  setPriceOptions: (prices: PriceOption[]) => void;
}

// ============================================
// Component Props Types
// ============================================

// Common Props
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Modal Props
export interface ModalWindowProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export interface ModalLoginProps {
  onClose: () => void;
}

export interface ModalRegisterProps {
  onClose: () => void;
}

export interface ModalRequiredProps {
  onClose: () => void;
}

export interface ModalBookLessonProps {
  onClose: () => void;
  teacher: Teacher;
}

// Form Input Types
export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export interface BookFormInputs {
  username: string;
  email: string;
  phone: string;
  reason: string;
  isSubmitting?: boolean;
}

// Select Input Types
export interface OptionType {
  value: string;
  label: string;
}
// Select Input Props
export interface SelectInputProps {
  width?: string;
  label: string;
  options: OptionType[];
  defaultValue?: OptionType;
  onChange?: (option: OptionType | null) => void;
}
//
export interface SelectorFieldProps {
  languageOptions: { value: string; label: string }[];
  levelOptions: { value: string; label: string }[];
  priceOptions: { value: string; label: string }[];
  setSelectedLanguage: (value: string | null) => void;
  setSelectedLevel: (value: string | null) => void;
  setSelectedPrice: (value: string | null) => void;
}

// Teacher List Props
export interface TeacherListProps {
  visibleTeachers: Teacher[];
  isLoading?: boolean;
}

// Teacher Card Props
export interface TeacherCardProps {
  teacher: Teacher;
}

// Navigation Props
export interface ActiveLinkProps {
  isActive: boolean;
}

// Icon Props
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

// Route Props
export interface PrivateRouteProps {
  component: React.ReactElement;
}
