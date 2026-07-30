import { Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async findOne(filter: Record<string, unknown>) {
    return this.model.findOne(filter);
  }

  async findAll(filter: Record<string, unknown> = {}) {
    return this.model.find(filter);
  }

  async updateById(
    id: string,
    data: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ) {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}