import { Language } from '@prisma/client';

export const createTranslation = <
  T extends {
    translations: { name: string; lang: string; description?: string }[];
  },
>(
  data: T,
) => ({
  createMany: {
    data: data.translations.map((translation) => ({
      name: translation.name,
      language: translation.lang as Language,
      ...(translation.description && { description: translation.description }),
    })),
  },
});
export const updateTranslation = <
  T extends {
    translations?: { name: string; lang: string; description?: string }[];
  },
>(
  data: T,
) => ({
  updateMany: {
    data: data.translations.map((translation) => ({
      name: translation.name,
      language: translation.lang as Language,
      ...(translation.description && { description: translation.description }),
    })),
  },
});

export const Translation = {
  Translation: {
    select: {
      name: true,
      lang: true,
    },
  },
};

export const translationDes = {
  translationDes: {
    select: {
      name: true,
      lang: true,
      description: true,
    },
  },
};
