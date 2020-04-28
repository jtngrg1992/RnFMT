import {openDatabase} from 'react-native-sqlite-storage';
import {UserModel} from '../model';

class DBManager {
  constructor() {
    this._dbName = 'user.db';
    this._db = openDatabase({name: this._dbName});
  }

  initDB = () => {
    const createTableQry =
      'CREATE TABLE IF NOT EXISTS user(' +
      'user_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'full_name TEXT NOT NULL,' +
      'email TEXT NOT NULL UNIQUE,' +
      'password TEXT NOT NULL,' +
      'phone TEXT NOT NULL,' +
      'parent TEXT NOT NULL,' +
      'height REAL NOT NULL,' +
      'GPA REAL NOT NULL,' +
      'test_score REAL NOT NULL)';

    this._db.transaction(tx => {
      tx.executeSql(
        createTableQry,
        [],
        (tx, result) => {
          console.log(tx);
          console.log(result);
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  searchUser = email => {
    const searchQuery = 'SELECT * FROM user where email=?';
    let promise = new Promise((resolve, reject) => {
      this._db.transaction(tx => {
        tx.executeSql(
          searchQuery,
          [email],
          (tx, result) => {
            if (result.rows.length > 0) {
              const user = result.rows.item(0);
              //conver to model object
              const modelobject = new UserModel(
                user.user_id,
                user.full_name,
                user.email,
                user.GPA,
                user.height,
                user.parent,
                user.password,
                user.phone,
                user.test_score,
              );
              resolve(modelobject);
            } else {
              reject(Error('No account found in DB. Try signing up!'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
    return promise;
  };

  createUser = userObject => {
    const createQry =
      'INSERT INTO user ' +
      '(full_name, email, password, ' +
      'phone, parent, height, GPA, test_score) ' +
      'values(?,?,?,?,?,?,?,?)';

    let promise = new Promise((resolve, reject) => {
      this._db.transaction(tx => {
        tx.executeSql(
          createQry,
          [
            userObject.fullName,
            userObject.email,
            userObject.password,
            userObject.phone,
            userObject.parent,
            userObject.height,
            userObject.gpa,
            userObject.testScore,
          ],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              resolve(userObject);
            } else {
              reject(Error('Registration Failed'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });

    return promise;
  };

  get dbName() {
    return this._dbName;
  }

  get db() {
    return this._db;
  }
}

export default DBManager;
