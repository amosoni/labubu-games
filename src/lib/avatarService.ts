// 头像生成服务
export interface AvatarOptions {
  seed?: string;
  style?: 'adventurer' | 'avataaars' | 'big-smile' | 'bottts' | 'croodles' | 'fun-emoji' | 'icons' | 'identicon' | 'initials' | 'lorelei' | 'micah' | 'miniavs' | 'open-peeps' | 'personas' | 'pixel-art' | 'shapes' | 'thumbs';
  size?: number;
  backgroundColor?: string;
  backgroundType?: 'gradientLinear' | 'gradientRadial' | 'solid';
  hairColor?: string;
  skinColor?: string;
  clothingColor?: string;
  clothingType?: string;
  accessoriesType?: string;
  facialHairType?: string;
  facialHairColor?: string;
  topType?: string;
  hatColor?: string;
  mouthType?: string;
  eyeType?: string;
  eyebrowType?: string;
  glassesType?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  displayName: string;
  bio?: string;
  joinDate: string;
  level: number;
  badges: string[];
  stats: {
    posts: number;
    likes: number;
    comments: number;
    gamesPlayed: number;
  };
}

// 头像生成器类
export class AvatarGenerator {
  private static readonly AVATAR_APIS = [
    'https://api.dicebear.com/7.x',
    'https://api.dicebear.com/6.x',
    'https://api.dicebear.com/5.x',
  ];

  private static readonly STYLES = [
    'adventurer', 'avataaars', 'big-smile', 'bottts', 'croodles', 
    'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 
    'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 
    'shapes', 'thumbs'
  ];

  private static readonly COLORS = [
    'ff6b6b', '4ecdc4', '45b7d1', '96ceb4', 'feca57',
    'ff9ff3', '54a0ff', '5f27cd', '00d2d3', 'ff9f43',
    'ee5a24', '0984e3', '6c5ce7', 'a29bfe', 'fd79a8',
    'fdcb6e', 'e17055', 'd63031', '74b9ff', '00b894'
  ];

  // 生成随机头像URL
  static generateAvatar(options: AvatarOptions = {}): string {
    const {
      seed = this.generateRandomSeed(),
      style = this.getRandomStyle(),
      size = 200,
    } = options;

    // 使用更简单的DiceBear API格式
    const apiUrl = 'https://api.dicebear.com/7.x';
    
    // 使用更简单的参数
    const seedParam = encodeURIComponent(seed);
    const sizeParam = size.toString();

    return `${apiUrl}/${style}/svg?seed=${seedParam}&size=${sizeParam}`;
  }

  // 生成用户资料
  static generateUserProfile(seed?: string): UserProfile {
    const username = this.generateUsername();
    const displayName = this.generateDisplayName();
    const avatar = this.generateAvatar({ seed: seed || username });
    
    return {
      id: this.generateId(),
      username,
      avatar,
      displayName,
      bio: this.generateBio(),
      joinDate: this.generateJoinDate(),
      level: this.generateLevel(),
      badges: this.generateBadges(),
      stats: {
        posts: this.generateRandomNumber(0, 100),
        likes: this.generateRandomNumber(0, 1000),
        comments: this.generateRandomNumber(0, 500),
        gamesPlayed: this.generateRandomNumber(0, 50),
      },
    };
  }

  // 批量生成用户资料
  static generateUserProfiles(count: number): UserProfile[] {
    return Array.from({ length: count }, (_, index) => 
      this.generateUserProfile(`user-${index}-${Date.now()}`)
    );
  }

  // 从公开渠道获取头像（模拟）
  static async fetchPublicAvatars(count: number = 10): Promise<UserProfile[]> {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return this.generateUserProfiles(count);
  }

  // 根据用户名生成一致的头像
  static generateConsistentAvatar(username: string, options: AvatarOptions = {}): string {
    const style = this.getRandomStyle();
    // 使用更简单的API格式
    const apiUrl = 'https://api.dicebear.com/7.x';
    
    // 使用更简单的参数
    const seed = encodeURIComponent(username);
    const size = '200';

    return `${apiUrl}/${style}/svg?seed=${seed}&size=${size}`;
  }

  // 私有方法
  private static generateRandomSeed(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private static getRandomStyle(): string {
    return this.STYLES[Math.floor(Math.random() * this.STYLES.length)];
  }

  private static getRandomColor(): string {
    return this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
  }

  private static getRandomSkinColor(): string {
    const skinColors = ['fdbcb4', 'fd9843', 'c68642', '8d5524', '6c3a2b'];
    return skinColors[Math.floor(Math.random() * skinColors.length)];
  }

  private static getRandomClothingType(): string {
    const types = ['blazer', 'sweater', 'hoodie', 'shirt', 'tank', 'dress'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomAccessoriesType(): string {
    const types = ['blank', 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomFacialHairType(): string {
    const types = ['blank', 'beardLight', 'beardMedium', 'beardMagestic', 'moustacheFancy', 'moustacheMagnum'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomTopType(): string {
    const types = ['hat', 'hijab', 'turban', 'winterHat1', 'winterHat2', 'winterHat3', 'winterHat4'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomMouthType(): string {
    const types = ['concerned', 'default', 'disbelief', 'eating', 'grimace', 'sad', 'screamOpen', 'serious', 'smile', 'tongue', 'twinkle', 'vomit'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomEyeType(): string {
    const types = ['close', 'cry', 'default', 'dizzy', 'eyeRoll', 'happy', 'hearts', 'side', 'squint', 'surprised', 'wink', 'winkWacky'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomEyebrowType(): string {
    const types = ['angry', 'angryNatural', 'default', 'defaultNatural', 'flatNatural', 'frownNatural', 'raisedExcited', 'raisedExcitedNatural', 'sadConcerned', 'sadConcernedNatural', 'unibrowNatural', 'upDown', 'upDownNatural'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomGlassesType(): string {
    const types = ['blank', 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static generateUsername(): string {
    const prefixes = ['Labubu', 'Cute', 'Gamer', 'Monster', 'Pink', 'Purple', 'Sweet', 'Happy', 'Magic', 'Dream'];
    const suffixes = ['Lover', 'Fan', 'Pro', 'Master', 'Queen', 'King', 'Star', 'Angel', 'Hero', 'Legend'];
    const numbers = Math.floor(Math.random() * 999) + 1;
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix}${suffix}${numbers}`;
  }

  private static generateDisplayName(): string {
    const names = [
      'Labubu Lover', 'Cute Gamer', 'Monster Master', 'Pink Princess', 'Purple Power',
      'Sweet Dreams', 'Happy Player', 'Magic Maker', 'Dream Builder', 'Star Seeker',
      'Angel Player', 'Hero Gamer', 'Legend Builder', 'Wonder Player', 'Joy Seeker'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private static generateBio(): string {
    const bios = [
      'Love playing Labubu games! 🎮',
      'Monster paradise enthusiast 🌟',
      'Cute game collector 💕',
      'Labubu merge master 🧩',
      'ASMR game lover 🎵',
      'Puzzle solving expert 🧠',
      'Community helper 🤝',
      'Game strategy guru 📚',
      'Creative player 🎨',
      'Fun seeker 🎉'
    ];
    return bios[Math.floor(Math.random() * bios.length)];
  }

  private static generateJoinDate(): string {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 365);
    const joinDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return joinDate.toISOString().split('T')[0];
  }

  private static generateLevel(): number {
    return Math.floor(Math.random() * 50) + 1;
  }

  private static generateBadges(): string[] {
    const allBadges = ['first-post', 'high-score', 'community-helper', 'game-master', 'early-adopter', 'top-contributor', 'screenshot-pro', 'guide-writer'];
    const badgeCount = Math.floor(Math.random() * 4) + 1;
    return allBadges.sort(() => 0.5 - Math.random()).slice(0, badgeCount);
  }

  private static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // 生成多个用户
  static generateUsers(count: number): UserProfile[] {
    const users: UserProfile[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.generateUserProfile());
    }
    return users;
  }
}

// 头像缓存管理
export class AvatarCache {
  private static cache = new Map<string, string>();
  private static readonly CACHE_SIZE = 100;

  static get(key: string): string | undefined {
    return this.cache.get(key);
  }

  static set(key: string, value: string): void {
    if (this.cache.size >= this.CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  static clear(): void {
    this.cache.clear();
  }

  static has(key: string): boolean {
    return this.cache.has(key);
  }
}

// 导出默认配置
export const DEFAULT_AVATAR_CONFIG: AvatarOptions = {
  size: 200,
  style: 'adventurer',
  backgroundColor: 'ff6b6b',
  backgroundType: 'gradientLinear',
  hairColor: '4ecdc4',
  skinColor: 'fdbcb4',
  clothingColor: '45b7d1',
  clothingType: 'blazer',
  accessoriesType: 'blank',
  facialHairType: 'blank',
  facialHairColor: '4ecdc4',
  topType: 'hat',
  hatColor: '96ceb4',
  mouthType: 'smile',
  eyeType: 'happy',
  eyebrowType: 'default',
  glassesType: 'blank',
};
