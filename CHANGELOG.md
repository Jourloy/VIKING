## VIKING [0.4.0] - Rise of VIKINKGS

- Новая роль
- Башня теперь стреляет
- Оптимизирована работа крипов
- Добавлена информация о том, как добавить новую роль
- Испралены некоторые ошибки

## VIKING [0.3.49] - Rise of VIKINKGS

### Добавлено
- BasicFunctions.js:
    - Добавлена функция получения энергии
    - Добавлена функции для разговора крипов
    - Добавлена функция ремонта
    - Добавлена функция строительства
- CreepManager.js:
    - Добавлены 4 новые роли
- Builder.js:
    - Добавлена новая роль
- Harvester.js:
    - Добавлена проверка на трансфер крипа
- Miner.js:
    - Добавлена проверка на заполненность контейнера
- Repairer.js:
    - Добавлена новая роль
- Transporter.js:
    - Добавлена новая роль
- Upgrader.js:
    - Добавлена новая роль
- Tower.js:
    - Добавлена новая роль
- Main.js:
    - Добавлена функция на определение на публичном ли сервере находится бот
    - Добавлена возможность генерировать пиксели
    - Добавлена проверка на наличие Room в Memory.queue

### Изменено
- CreepManager.js:
    - Изменен подсчет количества крипов
    - Сокращен запуск подсчета
- Harvester.js:
    - Изменен алгоритм получения энергии
    - Изменен алгоритм работы


### Исправлено
- Main.js:
    - Исправлен параметр в генерации тела крипа
    - Исправлен ROOM_SIGN

### Ошибки
- Все крипы берут энергию из одного контейнера, а не из двух
- Все крипы берут из одного и того же сброшенного ресурса
- Если остались только строители, то колония умирает
- Иногда спавн попадает в список структур с энергией

---

### Added
- BasicFunctions.js:
    - Added function for get energy
    - Added function for creep's speech
    - Added function for repair
    - Added function for build
- CreepManager.js:
    - Added 4 new roles
- Builder.js:
    - Added new role
- Harvester.js:
    - Added checking for creep transferring
- Miner.js:
    - Added checking for container capacity usage
- Repairer.js:
    - Added new role
- Transporter.js:
    - Added new role
- Upgrader.js:
    - Added new role
- Tower.js:
    - Added new role
- Main.js:
    - Added function for define public server
    - Added generating pixels
    - Added checking on Room in Memory.queue

### Changed
- CreepManager.js:
    - Changed calculating amount of creeps
    - Shorted launch calculating
- Harvester.js:
    - Changed algorithm for get energy
    - Changed work algorithm


### Fixed
- Main.js:
    - Fixed parameter in generation creep's body
    - Fixed ROOM_SIGN

### Issues
- All creeps get energy from one container
- All creep get energy from one dropped energy
- If alive only builder, then colony will die
- Sometimes spawn get into list of structures with

---

### Added
- BasicFunctions.js:
    - Added function for transfer creeps
- Harvester.js:
    - Added ability for transfer creeps
- Miner.js:
    - Added ability for be transferred
- Main.js:
    - Added spawn miner

### Changed
- CreepManager.js:
    - Amount of creeps for some roles changed to 0
    - Removed creep's parameters
- RoomStats.js:
    - Changed source searching

### Fixed
- RoomStats.js:
    - Fixed filter for empty structures

## VIKING [0.2.100] - Rise of VIKINKGS

### Добавлено
- BasicFunctions.js:
    - Добавлены переменные для перемещения крипов
- Harvester.js:
    - Добавлены переменные для перемещения крипов
    - Добавлена возможность подбирать упавшую энергию
- RoomStats.js:
    - Добавлена информация о пустых структурах
- SetMemory.js:
    - Добавлен вызов функции с параметрами для комнаты
- AutoBuilder.js:
    - Добавлена проверка контейнеров в комнате
    - Добавлена расстановка строение для второго уровня контроллера

### Изменено
- Harvester.js:
    - Настроена более точная работа для разных уровней контроллера
- RoomStats.js:
    - Вывод construction sites теперь в виде id
- SetMemory.js:
    - Перенесен основной блок

### Исправлено
- Main.js:
    - Исправлено создание тела крипа

---

### Added
- BasicFunctions.js:
    - Added parameters for creep moving
- Harvester.js:
    - Added parameters for creep moving
    - Added able to pickup dropped energy
- RoomStats.js:
    - Added information about empty structures
- SetMemory.js:
    - Added start a function with parameters for room
- AutoBuilder.js:
    - Added check containers in room
    - Added setting construction sites for 2 RCL

### Changed
- Harvester.js:
    - Did setting work for different RCL
- RoomStats.js:
    - Output construction sites now as id
- SetMemory.js:
    - Moved main block

### Fixed
- Main.js:
    - Fixed body creating

## VIKING [0.2.44] - Rise of VIKINKGS

### Добавлено
- CreepManager.js:
    - Добавлена функция подсчета живых крипов
    - Добавлена функция для запуска кода крипа
    - Добавлена ссылка на параметры крипа
- Harvester.js:
    - Добавлена функция работы (скоро будет изменена)
- Добавлен файл info.js с описанием кода
- main.js:
    - Добавлена функция выбора spawn для создания крипа
    - Добавлена функция создания крипа

### Изменено
- BasicFunctions.js:
    - Убрана функция установления режима работы для крипов
    - Активный источник подается в виде id
- CreepManager.js:
    - Убрана ненужна функция для запуска кода крипов
- Harvester.js:
    - Установление памяти перенесено в основной блок
- Main.js:
    - Убрано описание кода

### Исправлено
- CreepManager.js:
    - Исправлен подсчет количества необходимых крипов в комнате
- Harvester.js:
    - Исправлена переменная с параметрами крипа
    - Исрпавлена функция добычи ресурсов
- Main.js:
    - Исправлен запуск некоторых функций

---

### Added
- CreepManager.js:
    - Added function for calculate live creeps
    - Added function for start creep code
    - Added link on creep parameters
- Harvester.js:
    - Added work function (soon change)
- Added file info.js with code description
- main.js:
    - Added function for choose spawn for create creep
    - Added function for create creep

### Changed
- BasicFunctions.js:
    - Removed function for set creep mode
    - Active source give as id
- CreepManager.js:
    - Removed unused function for start creep code
- Harvester.js:
    - Setting memory moved in main block
- Main.js:
    - Removed code description

### Fixed
- CreepManager.js:
    - Fixed calculate amount if need creeps for room
- Harvester.js:
    - Fixed creep parameters
    - Fixed function for get resource
- Main.js:
    - Fixed start some functions

## VIKING [0.2.0]

### Добавлено
- Harvester.js:
    - Добавлена функция добычи энергии и работы
    - Добавлено установление режима в память крипа
- SetMemory.js:
    - Добавлена роль Harvester

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
    - Исправлена функция получения активного источника

---

### Added
- Harvester.js:
    - Added function get energy and work
    - Added set mode in creep's memory
- SetMemory.js:
    - Added harvester role

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
    - Fixed function for get active source

## VIKING [0.1.20]

### Добавлено
- Commands.js:
    - Добавлена команда help()
- CreepManager.js:
    - Добавлена функция подсчета живых существ
    - Добавлена функция запуска кода для каждой роли
    - Добавлены новые роли
- Добавлен файл Visual.js

### Изменено
- CreepManager.js:
    - Добавление ролей в память перенесено из CreepManager.js в SetMemory.js

### Исправлено
- Commands.js:
    - Исправлена команда ClearMemory()
    - Исправлена команда ClearFlags()
- CreepManager.js:
    - Исправлена установка количества необходимых крипов для комнат
- main.js:
    - Исправлен запуск основных функций
- RoomStats.js:
    - Исправлено некорректное отображение некоторых параметров
- Autobuilder.js:
    - Незначительные исправление

---

### Added
- Commands.js:
    - Added help() command
- CreepManager.js:
    - Added function of calculate live creeps
    - Added function of start code for all roles
    - Added new roles
- Added file Visual.js

### Changed
- CreepManager.js:
    - Adding roles in memory moved from CreepManager.js in SetMemory.js

### Fixed
- Commands.js:
    - Fixed command ClearMemory()
    - Command ClearFlags()
- CreepManager.js:
    - Fixed setting amount need creeps for rooms
- main.js:
    - Fixed starting major functions
- RoomStats.js:
    - Fixed uncorrected output some parameters
- Autobuilder.js:
    - Not important

## VIKING [0.1.3]

### Добавлено
- Добавлено версирование проекта
- Добавлен файл тактики для военного кода

### Изменено
- Константы для автостроителя перенесены из main.js в Autobuilder.js

---

### Added
- Added version for project
- Added tactic file for war code

### Changed
- Constants for autobuilder moved from main.js to Autobuilder.js
