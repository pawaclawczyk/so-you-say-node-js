export class Task {
    constructor(
        readonly title: string,
        readonly isImportant: boolean,
        readonly isUrgent: boolean,
    ) {}

    public rename(title: string): Task {
        return new Task(title, this.isImportant, this.isUrgent);
    }
}
