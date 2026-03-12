# Clean Skill

A well-written skill with no security issues.

## Description

This skill helps agents manage tasks effectively.

## Usage

```typescript
// Initialize the task manager
const taskManager = new TaskManager();

// Add a task
taskManager.addTask({
  title: "Complete project",
  priority: "high"
});

// List tasks
const tasks = taskManager.listTasks();
```

## Configuration

Set the following environment variable:
- `TASK_MANAGER_API_KEY` - Your API key from the dashboard

## Examples

### Basic usage

Create a new task and mark it complete.

### Advanced usage

Use filters to find specific tasks.

## Notes

This skill is safe and follows best practices.
