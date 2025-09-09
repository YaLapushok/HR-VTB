# 🚀 HR AI Анализатор Premium

> **Премиум-платформа для ИИ-анализа компетенций кандидатов**  
> Современное веб-приложение для HR-специалистов с минималистичным дизайном и мощным функционалом

![HR AI Analyzer](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg) ![License](https://img.shields.io/badge/License-MIT-blue.svg) ![Docker](https://img.shields.io/badge/Docker-Supported-2496ED.svg)

---

## 🎯 Возможности

### ✨ **Премиум функционал**
- 🤖 **ИИ-анализ документов** - Автоматический анализ дипломов и сертификатов
- 📊 **Интерактивная визуализация** - Круговые диаграммы компетенций с анимациями
- 🎨 **Современный дизайн** - Минималистичный интерфейс в стиле Notion/Aesop
- 📱 **Адаптивность** - Работает на всех устройствах
- ⚡ **Быстродействие** - Оптимизированная производительность

### 🔍 **Анализируемые области**
- Programming & Development
- Machine Learning & AI
- Data Analysis & Statistics  
- Communication & Soft Skills
- Leadership & Management
- Design Thinking & UX
- DevOps & Cloud Technologies
- Project Management
- Research & Innovation
- Problem Solving

---

## 🚀 Быстрый старт

### Docker (Рекомендуемый)
```bash
# Запустите с Docker
docker-compose up --build

# Откройте в браузере
http://localhost:3000
```

### Локальный запуск
```bash
# Откройте index.html в браузере
# Или используйте локальный сервер
python -m http.server 8000
```

---

## 🛠 Технологии

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Chart.js
- **Design**: Inter Font, Modern CSS Grid/Flexbox
- **DevOps**: Docker, Nginx, Docker Compose
- **API**: Gigachat Integration Ready

---

## 📁 Структура проекта

```
hr-ai-analyzer/
├── index.html              # Главная страница
├── style.css               # Стили и дизайн-система
├── app.js                  # JavaScript логика
├── Dockerfile              # Docker конфигурация
├── docker-compose.yml      # Docker Compose
├── nginx.conf              # Настройки Nginx
└── README.md               # Документация
```

---

## 🐳 Docker команды

```bash
# Сборка и запуск
docker-compose up --build

# Запуск в фоне
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

---

## 🌐 Развертывание

### Production готовность
- ✅ Optimized Nginx configuration
- ✅ Security headers
- ✅ Gzip compression
- ✅ Health checks
- ✅ Non-root user
- ✅ Proper logging

### Интеграция с реальным ИИ
1. Замените mock данные в `app.js`
2. Добавьте API ключ Gigachat
3. Настройте proxy в nginx.conf

---

## 📄 Лицензия

MIT License - свободное использование для коммерческих и некоммерческих проектов.

---

## 👨‍💻 Автор

**Премиум веб-приложение для HR-аналитики**  
Создано с использованием современных технологий и лучших практик дизайна.

---

<div align="center">

*Сделано с ❤️ для HR-сообщества*

</div>