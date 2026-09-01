import { registerEnumType } from '@nestjs/graphql';

export enum SkillCategory {
  LANGUAGE = 'LANGUAGE',
  BACKEND = 'BACKEND',
  DATA = 'DATA',
  DEVOPS = 'DEVOPS',
  PRACTICE = 'PRACTICE',
}

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
  description: 'Группа навыка',
  valuesMap: {
    LANGUAGE: { description: 'Языки программирования' },
    BACKEND: { description: 'Backend-фреймворки и runtime' },
    DATA: { description: 'Данные и хранение' },
    DEVOPS: { description: 'Инфраструктура и поставка' },
    PRACTICE: { description: 'Инженерные практики' },
  },
});
