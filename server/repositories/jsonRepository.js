import fs from 'fs/promises';
import path from 'path';
import { BaseRepository } from './baseRepository.js';

export class JsonRepository extends BaseRepository {
  constructor(filePath) {
    super();
    this.filePath = path.resolve(filePath);
    this.memoryCache = null;
  }

  async _readData() {
    if (this.memoryCache) return this.memoryCache;
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.memoryCache = JSON.parse(content || '[]');
      return this.memoryCache;
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.memoryCache = [];
        return [];
      }
      throw error;
    }
  }

  async _writeData(data) {
    this.memoryCache = data;
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      // In Serverless environments (e.g. Vercel read-only filesystem), fallback to memory cache
      console.warn('Serverless read-only filesystem detected, writing to memory cache:', error.message);
    }
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
