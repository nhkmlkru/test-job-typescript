import { SkillCategory } from '@prisma/client';

export const PROFILE_SEED = {
  name: 'Лохов Константин Эдуардович',
  title: 'Back End Developer',
  description:
    'Backend-разработчик на TypeScript. Проектирую и развиваю серверные приложения на NestJS: GraphQL и REST API, работу с данными через Prisma, контейнеризацию и сопровождение сервисов. С марта 2021 года работаю в РЕСО Лизинг — развиваю backend цифровых продуктов лизинговой компании.',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/nhkmlkru',
      sortOrder: 0,
    },
    {
      label: 'B2B-биржа детских товаров',
      url: 'https://github.com/nhkmlkru/detk_01/',
      sortOrder: 1,
    },
    {
      label: 'РЕСО Лизинг',
      url: 'https://www.resoleasing.com/',
      sortOrder: 2,
    },
  ],
  skills: [
    { name: 'TypeScript', category: SkillCategory.LANGUAGE, sortOrder: 0 },
    { name: 'JavaScript', category: SkillCategory.LANGUAGE, sortOrder: 1 },
    { name: 'Node.js', category: SkillCategory.BACKEND, sortOrder: 2 },
    { name: 'NestJS', category: SkillCategory.BACKEND, sortOrder: 3 },
    { name: 'GraphQL', category: SkillCategory.BACKEND, sortOrder: 4 },
    { name: 'REST API', category: SkillCategory.BACKEND, sortOrder: 5 },
    { name: 'Prisma', category: SkillCategory.DATA, sortOrder: 6 },
    { name: 'PostgreSQL', category: SkillCategory.DATA, sortOrder: 7 },
    { name: 'Git', category: SkillCategory.DEVOPS, sortOrder: 8 },
    { name: 'Docker', category: SkillCategory.DEVOPS, sortOrder: 9 },
    {
      name: 'Модульная архитектура',
      category: SkillCategory.PRACTICE,
      sortOrder: 10,
    },
    {
      name: 'Code review',
      category: SkillCategory.PRACTICE,
      sortOrder: 11,
    },
  ],
  experience: [
    {
      company: 'ResoLeasing',
      companyUrl: 'https://www.resoleasing.com/',
      position: 'Back End Developer',
      startDate: new Date(Date.UTC(2021, 2, 1)),
      endDate: null,
      description:
        'Развитие backend-части цифровых продуктов лизинговой компании: сервисы заявок, расчётов и сопровождения сделок для юридических лиц и ИП.',
      achievements: [
        'Проектирую API и модели данных под B2B-сценарии оформления лизинга автомобилей и техники.',
        'Развиваю серверную логику цифровых сервисов: заявки, расчёты, интеграции со смежными системами.',
        'Выстраиваю модульную архитектуру на TypeScript/NestJS с разделением бизнес-логики, доступа к данным и API.',
        'Сопровождаю поставку сервисов через Docker: воспроизводимый запуск, миграции и наполнение данных.',
      ],
      sortOrder: 0,
    },
  ],
  projects: [
    {
      name: 'B2B-биржа детских товаров',
      description:
        'Платформа оптовой торговли между поставщиками и розничными продавцами детских товаров: компании, каталог и сделки в B2B-контуре.',
      url: 'https://github.com/nhkmlkru/detk_01/',
      repositoryUrl: 'https://github.com/nhkmlkru/detk_01/',
      technologies: ['TypeScript', 'Node.js'],
      sortOrder: 0,
    },
  ],
};
