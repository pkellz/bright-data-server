import config from '@src/config';
import logger from 'jet-logger';
import { MongoClient, Db, Collection } from 'mongodb';

interface IThenable {
  then: (resolve: (value: unknown) => void, reject?: (reason: unknown) => void) => void;
}

class MongoDB {
  private connectionString: string;
  private client: MongoClient;
  private db: Db;
  private collection: Collection<Document>;
  public Ready: IThenable;

  constructor() {
    this.connectionString = config.mongo_connectionString;
    this.client = new MongoClient(this.connectionString);

    this.Ready = new Promise((resolve, reject) => {
      this.client.connect()
        .then((data) => {
          logger.info({ message: "Connected to MongoDB", data }, true);
          resolve(undefined);
        })
        .catch(error => {
          logger.err({ message: "Failed to connect to MongoDB", error: error as unknown }, true);
          reject(error);
        });
    });
  }

  initDb() {
    this.db = this.client.db('bright-data');
    this.collection = this.db.collection('products');
  }

  async find<T>(query: Record<string, unknown>): Promise<T[]> {
    // TODO
  }

  async insertMany(data: Record<string, unknown>[]): Promise<{success: boolean}> {
    // TODO 
    const success = false;
    await this.collection.insertMany(data);
    return {success};
  }
}

// export default new MongoDB();
export const Mongo = new MongoDB();

Mongo.Ready.then((val: unknown) => {
  Mongo.initDb();
});
