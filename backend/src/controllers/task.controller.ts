import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.schema';
import { ValidateObjectIdPipe } from '../pipes/validate-object-id.pipe';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body('title') title: string, @Body('description') description: string): Promise<Task> {
    return this.taskService.create(title, description);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateData: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string): Promise<Task> {
    return this.taskService.remove(id);
  }
}
