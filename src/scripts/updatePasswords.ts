// /src/scripts/updatePasswords.ts
import db from '../db';
import bcrypt from 'bcrypt';

const updatePasswords = async () => {
  try {
    const [rows]: any = await db.query('SELECT * FROM users');
    for (const user of rows) {
      if (!user.password.startsWith('$2b$')) { // Verifica si el hash ya está en formato bcrypt
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
        console.log(`Password updated for user ID ${user.id}`);
      }
    }
    console.log('Passwords updated successfully');
  } catch (error) {
    console.error('Error updating passwords:', error);
  }
};

updatePasswords();
