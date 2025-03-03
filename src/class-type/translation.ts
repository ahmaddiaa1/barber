import { Language } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

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
  Translation: {
    select: {
      name: true,
      lang: true,
      description: true,
    },
  },
};

export class translation {
  @IsString()
  @Transform(({ value }) => value ?? null)
  name: string;

  @IsString()
  @Transform(({ value }) => value ?? null)
  lang: 'EN' | 'AR';
}
