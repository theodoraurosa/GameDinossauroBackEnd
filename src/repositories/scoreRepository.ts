import sqlite3 from 'sqlite3';
import { Score } from '../models/scoreModel'; // Importando o modelo Score

export class ScoreRepository {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('./scores.db');
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, playerName TEXT, score INTEGER)");
    });
  }

  // Método para salvar uma nova pontuação
  public save(playerName: string, score: number): Promise<Score> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO scores (playerName, score) VALUES (?, ?)', [playerName, score], function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, playerName, score });
      });
    });
  }

  // Método para obter as 10 melhores pontuações
  public getTopScores(): Promise<Score[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM scores ORDER BY score DESC LIMIT 10', (err, rows: Score[]) => {  // Tipando rows como Score[]
        if (err) {
          reject(err);  // Se houver erro, rejeita a promise
        } else {
          resolve(rows);  // Se não houver erro, resolve a promise com os resultados
        }
      });
    });
  }
}

