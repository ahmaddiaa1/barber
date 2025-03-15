import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// Local storage for users

@Injectable()
export class NotificationService {
  private secret = 'your_jwt_secret';

  signUp(username: string, password: string, users: any[]) {
    if (users.find((u) => u.username === username))
      return { error: 'User exists' };
    const user = { username, password, fcmToken: null };
    users.push(user);
    return { message: 'User created' };
  }

  login(username: string, password: string, users: any[]) {
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) return { error: 'Invalid credentials' };

    const token = jwt.sign({ username }, this.secret, { expiresIn: '1h' });
    return { token };
  }

  setFCMToken(username: string, fcmToken: string, users: any[]) {
    const user = users.find((u) => u.username === username);
    if (!user) return { error: 'User not found' };
    user.fcmToken = fcmToken;
    return { message: 'FCM token set' };
  }

  getAuthUser(users: any[]) {
    return users;
  }
}
