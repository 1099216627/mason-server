import * as bcrypt from 'bcrypt';

// 生成随机昵称10位
export function generateRandomNickname(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nickname = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nickname += characters.charAt(randomIndex);
  }
  return nickname;
}
// 格式化文件大小单位
export function formatFileSize(size: number): string {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}

// 密码加密
export function encryptPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

// 密码解密
export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compare(password, hash);
}
