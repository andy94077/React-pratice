import sqlite3

class SQLHelper():
    def __init__(self):
        self.db = sqlite3.connect('wait.db', check_same_thread=False)
        self.db.row_factory = sqlite3.Row

    def userExists(self, userId):
        cursor = self.db.cursor()
        query = 'SELECT expired_time FROM `users` WHERE id = ?'
        cursor.execute(query, (userId, ))
        result = cursor.fetchone()
        return result is not None
        
    def getExpiredTime(self, userId):
        cursor = self.db.cursor()
        query = 'SELECT expired_time FROM `users` WHERE id = ?'
        cursor.execute(query, (userId, ))
        result = cursor.fetchone()
        assert result, f'User not Found, id = {userId}'
        return result['expired_time']

    def updateExpiredTime(self, userId, expiredTime):
        assert self.userExists(userId), f'User not Found, id = {userId}'

        cursor = self.db.cursor()
        query = 'UPDATE `users` SET `expired_time` = ? WHERE id = ?'
        cursor.execute(query, (int(expiredTime), userId))
        self.db.commit()
        return int(expiredTime)

    def deleteExpiredTime(self, userId):
        assert self.userExists(userId), f'User not Found, id = {userId}'

        cursor = self.db.cursor()
        query = 'UPDATE `users` SET `expired_time` = NULL WHERE id = ?'
        cursor.execute(query, (userId, ))
        self.db.commit()

    def createUser(self):
        cursor = self.db.cursor()
        query = 'INSERT INTO `users` DEFAULT VALUES'
        cursor.execute(query)
        self.db.commit()

if __name__ == '__main__':
    sqlhelper = SQLHelper()