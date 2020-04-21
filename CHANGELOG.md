## VIKING [0.2.0]

### Добавлено
- Harvester.js:
    - Фукнция добычи энергии и работы
    - Установление режима в память крипа
- SetMemory.js:
    - Роль Harvester

### Изменено
- Commands.js:
    - Убрана команда изменения sign в комнате
- CreepManager.js:
    - Изменено в соответствии с новым блоком памяти
- Harvester.js:
    - Информация о крипе перенесена в его файл
- Miner.js:
    - Информация о крипе перенесена в его файл
- RoomStats.js:
    - Создано новая ветка построения памяти

### Исправлено
- BasicFunctions.js:
    - Функция получения активного источника
---

### Added
- Harvester.js:
    - Function get energy and work
    - Set mode in creep's memory
- SetMemory.js:
    - Harvester role

### Changed
- Commands.js:
    - Removed command for change sign in rooms
- CreepManager.js:
    - Changed for new memory block
- Harvester.js:
    - Information about creep moved in creep's file
- Miner.js:
    - Information about creep moved in creep's file
- RoomStats.js:
    - Created new branch for build memory

### Fixed
- BasicFunctions.js:
    - Function for get active source

## VIKING [0.1.20]

### Добавлено
- Commands.js:
    - Команда help()
- CreepManager.js:
    - Функция подсчета живых существ
    - Функция запуска кода для каждой роли
    - Новые роли
- Файл Visual.js

### Изменено
- CreepManager.js:
    - Добавление ролей в память перенесено из CreepManager.js в SetMemory.js

### Исправлено
- Commands.js:
    - Команда ClearMemory()
    - Команда ClearFlags()
- CreepManager.js:
    - Установка количества необходимых крипов для комнат
- main.js:
    - Запуск основных функций
- RoomStats.js:
    - Некорректное отображение некоторых параметров
- Autobuilder.js:
    - Незначительные исправление
---

### Added
- Commands.js:
    - help() command
- CreepManager.js:
    - Function of calculate live creeps
    - Function of start code for all roles
    - New roles
- File Visual.js

### Changed
- CreepManager.js:
    - Adding roles in memory moved from CreepManager.js in SetMemory.js

### Fixed
- Commands.js:
    - Command ClearMemory()
    - Command ClearFlags()
- CreepManager.js:
    - Setting amount need creeps for rooms
- main.js:
    - Starting major functions
- RoomStats.js:
    - Uncorrected output some parameters
- Autobuilder.js:
    - Not important

## VIKING [0.1.3]

### Добавлено
- Версирование проекта
- Файл тактики для военного кода

### Изменено
- Константы для автостроителя перенесены из main.js в Autobuilder.js

---

### Added
- Version for project
- Tactic file for war code

### Changed
- Constants for autobuilder moved from main.js to Autobuilder.js
