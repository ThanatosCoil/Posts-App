# [YC Directory](https://posts-pu50ht1pt-thanatoscoils-projects.vercel.app)

## Обзор

**YC Directory** — веб-приложение для управления и публикации статей, авторов и плейлистов, построенное на базе Next.js и Sanity CMS.

---

## Технологический стек

- **Next.js 15 (App Router, TypeScript)**
- **React 19**
- **Sanity v3** (Headless CMS, Studio на `/studio`)
- **NextAuth.js** (Аутентификация)
- **Tailwind CSS** (кастомные шрифты, анимации)
- **Radix UI** (UI-примитивы)
- **Lucide React** (Иконки)
- **Markdown/MD Editor** (редактирование статей)
- **Styled-components** (CSS-in-JS)
- **Vercel** (Деплой)

---

## Функциональность

- **Управление статьями**: создание и просмотр статей.
- **Управление авторами**: управление авторами.
- **Плейлисты**: создание плейлистов из статей.
- **Sanity Studio**: полноценная CMS по адресу [`/studio`](https://posts-pu50ht1pt-thanatoscoils-projects.vercel.app/studio) для редакторов и администраторов.
- **Аутентификация**: безопасный вход и управление пользователями через NextAuth.
- **Современный UI**: адаптивный и доступный интерфейс с использованием Radix UI, Tailwind и кастомных шрифтов.
- **Markdown**: поддержка редактирования и предпросмотра markdown-контента.
- **API-роуты**: расширяемые API для аутентификации и работы с данными.

---

## Быстрый старт

1. **Установите зависимости:**
   ```bash
   npm install
   ```
2. **Настройте переменные окружения:**
   - AUTH_SECRET=
   - AUTH_GITHUB_ID=
   - AUTH_GITHUB_SECRET=
   - NEXT_PUBLIC_SANITY_PROJECT_ID=
   - NEXT_PUBLIC_SANITY_DATASET="production"
   - NEXT_PUBLIC_SANITY_API_VERSION=
   - SANITY_WRITE_TOKEN=
3. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```
4. **Доступ к Sanity Studio:**
   - [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Деплой

Приложение задеплоено на Vercel:  
👉 [posts-pu50ht1pt-thanatoscoils-projects.vercel.app](https://posts-pu50ht1pt-thanatoscoils-projects.vercel.app)

---
