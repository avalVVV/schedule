// Schedule data
const scheduleData = {
  "Понедельник": {
    "8:00": [{"text": "Порядок проведения аттестации объектов информатизации (пр)\nасс. Ефремов М.Ю. а-212б", "week_type": "odd"}],
    "9:40": [
      {"text": "Комплексная защита объектов информатизации (пр)\nст.пр. Чуйкова В.В. а-212б", "week_type": "odd"},
      {"text": "Управление информационной безопасностью телекоммуникационных систем (пр)\nпр. Чеснокова А.А. а-212б", "week_type": "even"}
    ],
    "11:40": [{"text": "Управление информационной безопасностью телекоммуникационных систем (пр)\nпр. Чеснокова А.А. а-212б", "week_type": "even"}]
  },
  "Вторник": {
    "9:40": [{"text": "Моделирование систем и сетей телекоммуникаций (лб)\nасс. Бабанина Е.Ю. а-213", "week_type": "all"}],
    "11:40": [
      {"text": "Методы и средства пространственного анализа (лб)\nпроф. Андронов В.Г. а-213", "week_type": "odd"},
      {"text": "Моделирование систем и сетей телекоммуникаций (лб)\nасс. Бабанина Е.Ю. а-213", "week_type": "even"}
    ],
    "13:20": [
      {"text": "Порядок проведения аттестации объектов информатизации (пр)\nасс. Ефремов М.Ю. а-403", "week_type": "odd"},
      {"text": "Методы и средства пространственного анализа (лб)\nпроф. Андронов В.Г. а-203", "week_type": "even"}
    ],
    "15:00": [{"text": "Проектирование защищенных телекоммуникационных систем (лб)\nст.пр.Чуйкова В.В. а-212а", "week_type": "all"}]
  },
  "Среда": {
    "8:00": [{"text": "Управление разработкой систем безопасности (лб)\nст.пр. Шестаков П.Д. а-310", "week_type": "all"}],
    "9:40": [{"text": "Управление разработкой систем безопасности (пр)\nст.пр. Шестаков П.Д. а-309", "week_type": "all"}],
    "11:40": [
      {"text": "Управление разработкой систем безопасности (пр)\nст.пр. Шестаков П.Д. а-309", "week_type": "odd"},
      {"text": "Комплексная защита объектов информатизации (пр)\nст.пр. Чуйкова В.В. а-309", "week_type": "even"}
    ],
    "13:20": [{"text": "Комплексная защита объектов информатизации (пр)\nст.пр. Чуйкова В.В. а-309", "week_type": "even"}]
  },
  "Пятница": {
    "8:00": [{"text": "Порядок проведения аттестации объектов информатизации (лк)\nдоц. Ефремов М.А. онлайн", "week_type": "all"}],
    "9:40": [{"text": "Проектирование защищенных телекоммуникационных систем (лк)\nст.пр.Чуйкова В.В. онлайн", "week_type": "all"}],
    "11:40": [{"text": "Управление разработкой систем безопасности (лк)\nст.пр. Шестаков П.Д. онлайн", "week_type": "all"}]
  },
  "Суббота": {
    "8:20": [{"text": "Комплексная защита объектов информатизации (лк)\nст.пр. Чуйкова В.В. онлайн", "week_type": "all"}],
    "10:00": [{"text": "Моделирование систем и сетей телекоммуникаций (лк)\nдоц. Бабанин И.Г онлайн", "week_type": "all"}],
    "11:40": [{"text": "Управление информационной безопасностью телекоммуникационных систем (лк)\nдоц. Островский Е.Ю. онлайн", "week_type": "all"}],
    "13:20": [{"text": "Методы и средства пространственного анализа (лк)\nпроф. Андронов В.Г. онлайн", "week_type": "all"}]
  }
};

// Day names in Russian
const dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const monthNames = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

// Academic year start date (September 1st, 2025)
const ACADEMIC_YEAR_START = new Date(2025, 8, 1); // September 1, 2025

// Global variables
let currentWeek = 'even'; // Will be dynamically set

/**
 * Determines the week type (odd/even) for a specific date
 * @param {Date} date - The date to check
 * @returns {string} - 'odd' for верхняя неделя, 'even' for нижняя неделя
 */
function getCurrentWeekForDate(date) {
  // Calculate weeks since September 1st, 2025
  const academicStart = new Date(2025, 8, 1); // September 1, 2025
  
  // Find Monday of the week containing September 1st
  const startMonday = new Date(academicStart);
  const startDayOfWeek = academicStart.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const daysToMonday = startDayOfWeek === 0 ? 1 : (1 - startDayOfWeek);
  startMonday.setDate(academicStart.getDate() + daysToMonday);
  
  // Find Monday of the target date's week
  const targetMonday = new Date(date);
  const targetDayOfWeek = date.getDay();
  const daysToTargetMonday = targetDayOfWeek === 0 ? -6 : (1 - targetDayOfWeek);
  targetMonday.setDate(date.getDate() + daysToTargetMonday);
  
  // Calculate the number of weeks between them
  const timeDiff = targetMonday.getTime() - startMonday.getTime();
  const weeksDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
  
  // First week (week 0) is odd (верхняя), second week is even (нижняя), etc.
  return weeksDiff % 2 === 0 ? 'odd' : 'even';
}

/**
 * Formats a date to readable Russian format
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string like "понедельник, 8 сентября"
 */
function formatDate(date) {
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const monthName = monthNames[date.getMonth()];
  
  return `${dayName}, ${day} ${monthName}`;
}

/**
 * Gets the Russian day name for schedule lookup
 * @param {Date} date - The date
 * @returns {string} - Day name for schedule lookup
 */
function getScheduleDayName(date) {
  const dayIndex = date.getDay();
  const scheduleNames = ['', 'Понедельник', 'Вторник', 'Среда', '', 'Пятница', 'Суббота'];
  return scheduleNames[dayIndex];
}

/**
 * Renders today and tomorrow sections with dynamic dates and schedules
 */
function renderTodayTomorrow() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayWeek = getCurrentWeekForDate(today);
  const tomorrowWeek = getCurrentWeekForDate(tomorrow);
  
  console.log(`Today: ${formatDate(today)}, Week: ${todayWeek}`);
  console.log(`Tomorrow: ${formatDate(tomorrow)}, Week: ${tomorrowWeek}`);
  
  // Update titles
  const todayTitle = document.getElementById('today-title');
  const tomorrowTitle = document.getElementById('tomorrow-title');
  
  if (todayTitle) {
    todayTitle.textContent = `Сегодня, ${formatDate(today)}`;
  }
  
  if (tomorrowTitle) {
    tomorrowTitle.textContent = `Завтра, ${formatDate(tomorrow)}`;
  }
  
  // Render today's schedule
  renderDaySchedule('today-subjects', today, todayWeek);
  
  // Render tomorrow's schedule
  renderDaySchedule('tomorrow-subjects', tomorrow, tomorrowWeek);
}

/**
 * Renders schedule for a specific day
 * @param {string} containerId - ID of the container element
 * @param {Date} date - The date to render
 * @param {string} weekType - Week type ('odd' or 'even')
 */
function renderDaySchedule(containerId, date, weekType) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }
  
  const scheduleDayName = getScheduleDayName(date);
  
  if (!scheduleDayName || !scheduleData[scheduleDayName]) {
    container.innerHTML = '<div class="no-classes">Занятий нет</div>';
    return;
  }
  
  const daySchedule = scheduleData[scheduleDayName];
  const subjectsWithTime = [];
  
  // Collect all subjects with their times
  Object.keys(daySchedule).forEach(time => {
    const subjects = daySchedule[time];
    
    subjects.forEach(subject => {
      // Show subject if it's for all weeks or matches the week type
      if (subject.week_type === 'all' || subject.week_type === weekType) {
        subjectsWithTime.push({ subject, time });
      }
    });
  });
  
  if (subjectsWithTime.length === 0) {
    container.innerHTML = '<div class="no-classes">Занятий нет</div>';
    return;
  }
  
  // Sort subjects by time
  subjectsWithTime.sort((a, b) => {
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    return timeToMinutes(a.time) - timeToMinutes(b.time);
  });
  
  // Clear container and add sorted subjects
  container.innerHTML = '';
  
  subjectsWithTime.forEach(({subject, time}) => {
    const subjectElement = createCompactSubjectElement(subject, time);
    container.appendChild(subjectElement);
  });
}

/**
 * Updates the current week indicator
 */
function updateCurrentWeekIndicator() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const tomorrowWeek = getCurrentWeekForDate(tomorrow);
  const weekName = tomorrowWeek === 'odd' ? 'Верхняя неделя' : 'Нижняя неделя';
  
  const indicator = document.getElementById('current-week-indicator');
  if (indicator) {
    indicator.textContent = `Завтра: ${weekName}`;
    console.log(`Week indicator updated: Завтра: ${weekName}`);
  }
}

/**
 * Get subject type from text
 */
function getSubjectType(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('военная подготовка')) {
    return 'military';
  } else if (lowerText.includes('онлайн')) {
    return 'online';
  } else if (lowerText.includes('(лк)')) {
    return 'lecture';
  } else if (lowerText.includes('(пр)')) {
    return 'practice';
  } else if (lowerText.includes('(лб)')) {
    return 'lab';
  }
  
  return 'practice'; // default
}

/**
 * Parse subject text to extract title and details
 */
function parseSubjectText(text) {
  const lines = text.trim().split('\n');
  const title = lines[0] || '';
  const details = lines.slice(1).join(' ') || '';
  
  return { title, details };
}

/**
 * Create compact subject element for today/tomorrow block
 */
function createCompactSubjectElement(subjectData, time) {
  const subjectType = getSubjectType(subjectData.text);
  const { title, details } = parseSubjectText(subjectData.text);
  
  const subjectDiv = document.createElement('div');
  subjectDiv.className = `compact-subject compact-subject--${subjectType}`;
  
  subjectDiv.innerHTML = `
    <div class="compact-subject__time">${time}</div>
    <div class="compact-subject__title">${title}</div>
    ${details ? `<div class="compact-subject__details">${details}</div>` : ''}
  `;
  
  return subjectDiv;
}

/**
 * Create subject element for main schedule
 */
function createSubjectElement(subjectData) {
  const subjectType = getSubjectType(subjectData.text);
  const { title, details } = parseSubjectText(subjectData.text);
  
  const subjectDiv = document.createElement('div');
  subjectDiv.className = `subject subject--${subjectType}`;
  
  subjectDiv.innerHTML = `
    <div class="subject__title">${title}</div>
    ${details ? `<div class="subject__details">${details}</div>` : ''}
  `;
  
  return subjectDiv;
}

/**
 * Initialize week switcher buttons
 */
function initializeWeekSwitcher() {
  const weekButtons = document.querySelectorAll('.week-btn');
  
  // Set initial active button based on today's week
  const today = new Date();
  currentWeek = getCurrentWeekForDate(today);
  
  weekButtons.forEach(btn => {
    btn.classList.remove('week-btn--active');
    if (btn.dataset.week === currentWeek) {
      btn.classList.add('week-btn--active');
    }
  });
  
  weekButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedWeek = this.dataset.week;
      
      if (selectedWeek !== currentWeek) {
        // Update active button
        weekButtons.forEach(btn => btn.classList.remove('week-btn--active'));
        this.classList.add('week-btn--active');
        
        // Update current week
        currentWeek = selectedWeek;
        
        // Re-render schedule
        renderSchedule();
      }
    });
  });
  
  console.log(`Week switcher initialized with current week: ${currentWeek}`);
}

/**
 * Render schedule for current week
 */
function renderSchedule() {
  // Get all subject containers
  document.querySelectorAll('.subjects').forEach(container => {
    const day = container.getAttribute('data-day');
    const time = container.getAttribute('data-time');
    
    // Clear container
    container.innerHTML = '';
    
    // Check if we have data for this day and time
    if (scheduleData[day] && scheduleData[day][time]) {
      const subjects = scheduleData[day][time];
      
      // Filter and add subjects based on current week
      subjects.forEach(subject => {
        // Show subject if it's for all weeks or matches current week
        if (subject.week_type === 'all' || subject.week_type === currentWeek) {
          const subjectElement = createSubjectElement(subject);
          container.appendChild(subjectElement);
        }
      });
      
      // If no subjects were added, hide the time slot
      if (container.children.length === 0) {
        container.closest('.time-slot').style.display = 'none';
      } else {
        container.closest('.time-slot').style.display = 'flex';
      }
    } else {
      // Hide empty time slots
      container.closest('.time-slot').style.display = 'none';
    }
  });
  
  console.log(`Rendered schedule for ${currentWeek} week`);
}

/**
 * Highlight today's card in the main schedule
 */
function highlightTodaysCard() {
  const today = new Date();
  const todayScheduleName = getScheduleDayName(today);
  
  // Remove existing highlights
  document.querySelectorAll('.day-card').forEach(card => {
    card.classList.remove('today');
  });
  
  // Add highlight to today's card if it exists
  if (todayScheduleName) {
    const dayMapping = {
      'Понедельник': 'monday',
      'Вторник': 'tuesday', 
      'Среда': 'wednesday',
      'Пятница': 'friday',
      'Суббота': 'saturday'
    };
    
    const dayCardId = dayMapping[todayScheduleName];
    if (dayCardId) {
      const todayCard = document.querySelector(`[data-day="${dayCardId}"]`);
      if (todayCard) {
        todayCard.classList.add('today');
        console.log(`Highlighted today's card: ${dayCardId}`);
      }
    }
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing dynamic schedule...');
  
  // Update current week indicator
  updateCurrentWeekIndicator();
  
  // Initialize week switcher
  initializeWeekSwitcher();
  
  // Render today and tomorrow sections
  renderTodayTomorrow();
  
  // Render main schedule
  renderSchedule();
  
  // Highlight today's card
  highlightTodaysCard();
  
  console.log('Dynamic schedule initialization complete!');
});