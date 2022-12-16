import config from '@src/config';
import logger from 'jet-logger';
import { MongoClient, Db, Collection, Document } from 'mongodb';
interface IThenable {
  then: (resolve: (value: unknown) => void, reject?: (reason: unknown) => void) => void;
}

class MongoDB {
  private connectionString: string;
  private client: MongoClient;
  private db: Db | undefined;
  private collection: Collection<Document> | undefined;
  public Ready: IThenable;

  constructor() {
    this.connectionString = config.mongo_connectionString;
    this.client = new MongoClient(this.connectionString);
    this.Ready = new Promise((resolve, reject) => {
      this.client.connect()
        .then(() => {
          logger.info({ message: "MongoDB Client connected" }, true);

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
    logger.info({ message: "MongoDB Database and Collection initialized" }, true);
  }

  // async find<T>(query: Record<string, unknown>): Promise<T[]> {
  //   // TODO
  // }

  async insertMany(data: Document[]): Promise<{ success: boolean }> {
    if (data.length === 0) {
      logger.err({ message: "No data to insert" }, true);
      return { success: false };
    }

    const insertResult = await this.collection?.insertMany(data);

    if (insertResult?.insertedCount === data.length) {
      logger.info(`Inserted all ${data.length} items successfully`, true);

      return { success: true };
    }
    else {
      logger.err({ message: `Failed to insert all ${data.length} items`, itemsInserted: insertResult?.insertedCount }, true);
      return { success: false };
    }
  }
}

export const mongo = new MongoDB();

mongo.Ready.then(() => {
  mongo.initDb();
});
