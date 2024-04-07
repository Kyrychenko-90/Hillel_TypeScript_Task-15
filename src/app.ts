showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

/*
Завдання 1: Принцип єдиної відповідальності (SRP)
Створіть невелику програму, яка моделює бібліотечну систему.
Реалізуйте класи для Книги, Бібліотеки та Користувача.
Переконайтеся, що кожен клас дотримується принципу єдиної відповідальності.
Наприклад, клас Книга повинен бути відповідальним за книжкові деталі,
Бібліотека за бібліотечні операції, а Користувач за користувальницькі дані.
 */

class HarryPotterBook {
    private title: string;
    private volume: number;

    constructor(title: string, volume: number) {
        this.title = title;
        this.volume = volume;
    }

    public getBookDetails(): string {
        return `${this.title} (Volume ${this.volume})`;
    }
}

class HarryPotterLibrary {
    private books: HarryPotterBook[];

    constructor() {
        this.books = [];
        this.addHarryPotterBooks();
    }

    private addHarryPotterBooks(): void {
        const titles: string[] = [
            "Harry Potter and the Philosopher's Stone",
            "Harry Potter and the Chamber of Secrets",
            "Harry Potter and the Prisoner of Azkaban",
            "Harry Potter and the Goblet of Fire",
            "Harry Potter and the Order of the Phoenix",
            "Harry Potter and the Half-Blood Prince",
            "Harry Potter and the Deathly Hallows"
        ];

        for (let i: number = 0; i < titles.length; i++) {
            this.books.push(new HarryPotterBook(titles[i], i + 1));
        }
    }

    public listBooks(): HarryPotterBook[] {
        return this.books;
    }
}

class HarryPotterFan {
    private name: string;
    private borrowedBooks: HarryPotterBook[];

    constructor(name: string) {
        this.name = name;
        this.borrowedBooks = [];
    }

    public borrowBook(book: HarryPotterBook): void {
        this.borrowedBooks.push(book);
    }

    public returnBook(book: HarryPotterBook): void {
        const index: number = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
        }
    }

    public listBorrowedBooks(): string[] {
        return this.borrowedBooks.map(book => book.getBookDetails());
    }
}

const library = new HarryPotterLibrary();
const fan = new HarryPotterFan("John");

console.log("Books in Harry Potter Library:");
console.log(library.listBooks().map(book => book.getBookDetails()));

library.listBooks().forEach(book => {
    fan.borrowBook(book);
});

console.log("Books borrowed by Harry Potter Fan:");
console.log(fan.listBorrowedBooks());

/*
Завдання 2: Принцип відкритості/закритості (OCP)
Розробіть простий графічний редактор, який дозволяє користувачам малювати різні форми
(наприклад, кола, прямокутники, трикутники).
Застосуйте принцип відкритості/закритості для зручного розширення для додавання нових форм
без змінення існуючого коду.
Покажіть приклад додавання нової форми (наприклад, еліпса) без модифікації основної
функціональності малювання.
 */

interface Shape {
    draw(): void;
}

class Circle implements Shape {
    draw(): void {
        console.log("Drawing a circle");
    }
}

class Rectangle implements Shape {
    draw(): void {
        console.log("Drawing a rectangle");
    }
}

class Triangle implements Shape {
    draw(): void {
        console.log("Drawing a triangle");
    }
}

class Ellipse implements Shape {
    draw(): void {
        console.log("Drawing an ellipse");
    }
}

const shapes: Shape[] = [new Circle(), new Rectangle(), new Triangle(), new Ellipse()];

shapes.forEach(shape => {
    shape.draw();
});

/*
Завдання 3: Принцип підстановки Лісков (LSP)
Створіть ієрархію геометричних фігур з класами, такими як Квадрат, Коло та Трикутник.
Застосуйте принцип підстановки Ліскова, переконавшись, що об'єкти базового класу
(наприклад, Фігура) можуть бути замінені об'єктами похідних класів без впливу на коректність
програми. Покажіть приклад, де різні форми можуть використовуватися взаємозамінно.
 */

class GeometricShape {
    calculateArea(): number {
        return 0;
    }
}

class SquareShape extends GeometricShape {
    constructor(private sideLength: number) {
        super();
    }

    override calculateArea(): number {
        return this.sideLength * this.sideLength;
    }
}

class CircleShape extends GeometricShape {
    constructor(private radius: number) {
        super();
    }

    override calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class TriangleShape extends GeometricShape {
    constructor(private base: number, private height: number) {
        super();
    }

    override calculateArea(): number {
        return 0.5 * this.base * this.height;
    }
}

const square = new SquareShape(5);
const circle = new CircleShape(3);
const triangle = new TriangleShape(4, 6);

console.log("Area of square:", square.calculateArea());
console.log("Area of circle:", circle.calculateArea());
console.log("Area of triangle:", triangle.calculateArea());


/*
Завдання 4: Принцип розділення інтерфейсу (ISP)
Спроектуйте інтерфейс для Системи Управління Завданнями з методами, такими як createTask(),
assignTask() та completeTask().
Реалізуйте класи для різних типів користувачів (наприклад, Розробник, Менеджер).
Застосуйте принцип розділення інтерфейсу, переконавшись, що кожен клас реалізує лише ті методи,
які стосуються його ролі.
 */

interface TaskManager {
    createTask(title: string, description: string): void;
    assignTask(taskId: number, assignee: string): void;
    completeTask(taskId: number): void;
}

class Developer implements TaskManager {
    createTask(title: string, description: string): void {
        console.log("Developers can't create tasks.");
    }

    assignTask(taskId: number, assignee: string): void {
        console.log(`Assigned task ${taskId} to ${assignee}.`);
    }

    completeTask(taskId: number): void {
        console.log(`Completed task ${taskId}.`);
    }
}

class Manager implements TaskManager {
    createTask(title: string, description: string): void {
        console.log(`Created task: ${title} - ${description}`);
    }

    assignTask(taskId: number, assignee: string): void {
        console.log(`Assigned task ${taskId} to ${assignee}.`);
    }

    completeTask(taskId: number): void {
        console.log("Managers can't complete tasks.");
    }
}

const developer = new Developer();
const manager = new Manager();

developer.assignTask(1, "John");
developer.completeTask(1);

manager.createTask("Implement feature", "Implement new feature");
manager.assignTask(2, "Kate");



/*
Завдання 5: Принцип інверсії залежностей (DIP)
Розробіть систему обміну повідомленнями, де високорівневі модулі відправляють повідомлення
низькорівневим модулям. Застосуйте принцип інверсії залежностей за допомогою введення залежностей
або абстракцій, щоб високорівневі модулі залежали від абстракцій, а не від конкретних реалізацій.
Продемонструйте, що зміна реалізації обміну повідомленнями не впливає на високорівневі модулі.
 */

interface MessageSender {
    sendMessage(message: string): void;
}

class HighLevelModule {
    private messageSender: MessageSender;

    constructor(messageSender: MessageSender) {
        this.messageSender = messageSender;
    }

    public sendMessage(message: string): void {
        this.messageSender.sendMessage(message);
    }
}

class LowLevelModule implements MessageSender {
    public sendMessage(message: string): void {
        console.log(`Sending message: ${message}`);
    }
}

const lowLevelModule = new LowLevelModule();
const highLevelModule = new HighLevelModule(lowLevelModule);

highLevelModule.sendMessage("Hello World!");
