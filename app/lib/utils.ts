export type ExpenseRow = {
  id: string;
  amount: string;
  description: string | null;
  date: Date;
  category_id: string;
  category_name: string;
};

export type AddUserState = {
    errors?: {
        userName?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
};

export type AddExpenseState = {
    errors?:{
        category_id?: string[];
        description?: string[];
        amount?: string[];
        date?: string[];
    },

    message?: string;
}

export type CategoryField = {
    id: string,
    name: string
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}