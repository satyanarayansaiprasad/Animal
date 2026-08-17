import fs from 'fs/promises';
import path from 'path';
import { BaseRepository } from './baseRepository.js';

export class JsonRepository extends BaseRepository {
  constructor(filePath) {
    super();
    this.filePath = path.resolve(filePath);
  }

  async _readData() {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(content || '[]');
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.filePath, JSON.stringify([]));
        return [];
      }
      throw error;
    }
  }

  async _writeData(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async findAll(filterFn = null) {
    const items = await this._readData();
    if (typeof filterFn === 'function') {
      return items.filter(filterFn);
    }
    return items;
  }

  async findById(id) {
    const items = await this._readData();
    return items.find((item) => String(item.id) === String(id)) || null;
  }

  async create(data) {
    const items = await this._readData();
    const newItem = {
      id: data.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    items.unshift(newItem);
    await this._writeData(items);
    return newItem;
  }

  async update(id, updates) {
    const items = await this._readData();
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await this._writeData(items);
    return items[index];
  }

  async delete(id) {
    const items = await this._readData();
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return false;

    items.splice(index, 1);
    await this._writeData(items);
    return true;
  }
}
