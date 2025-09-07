const axios = require('axios');
const cheerio = require('cheerio');

class GameScraper {
  constructor() {
    this.games = [];
    this.categories = {
      'dress-up': ['dress', 'fashion', 'clothing', 'outfit'],
      'makeup': ['makeup', 'beauty', 'cosmetics', 'makeover'],
      'simulation': ['simulation', 'management', 'shop', 'cafe', 'restaurant'],
      'nurturing': ['pet', 'care', 'nurture', 'baby', 'animal'],
      'adventure': ['adventure', 'quest', 'explore', 'journey'],
      'puzzle': ['puzzle', 'match', 'brain', 'logic'],
      'romance': ['love', 'dating', 'romance', 'heart'],
      'monster': ['monster', 'creature', 'magical', 'fantasy']
    };
  }

  async scrapePoki() {
    try {
      console.log('Scraping Poki games...');
      
      const categories = ['dress-up-games', 'makeup-games', 'simulation-games'];
      
      for (const category of categories) {
        const response = await axios.get(`https://poki.com/en/g/${category}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const $ = cheerio.load(response.data);
        
        $('.list-item').each((index, element) => {
          const $element = $(element);
          const title = $element.find('h4').text().trim();
          const thumbnail = $element.find('img').attr('src');
          const gameUrl = $element.find('a').attr('href');
          
          if (title && gameUrl) {
            const game = {
              title: this.cleanTitle(title),
              description: this.generateDescription(title),
              embedUrl: `https://poki.com${gameUrl}`,
              thumbnailUrl: thumbnail || this.getPlaceholderImage(),
              category: this.categorizeGame(title),
              tags: this.extractTags(title),
              language: 'en',
              featured: Math.random() > 0.8,
              popularity: Math.floor(Math.random() * 100),
            };
            
            this.games.push(game);
          }
        });
      }
    } catch (error) {
      console.error('Error scraping Poki:', error.message);
    }
  }

  async scrapeY8() {
    try {
      console.log('Scraping Y8 games...');
      
      const categories = ['dress-up', 'makeover', 'simulation'];
      
      for (const category of categories) {
        const response = await axios.get(`https://www.y8.com/tags/${category}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const $ = cheerio.load(response.data);
        
        $('.thumbs a').slice(0, 10).each((index, element) => {
          const $element = $(element);
          const title = $element.find('img').attr('alt');
          const thumbnail = $element.find('img').attr('src');
          const gameUrl = $element.attr('href');
          
          if (title && gameUrl) {
            const game = {
              title: this.cleanTitle(title),
              description: this.generateDescription(title),
              embedUrl: `https://www.y8.com${gameUrl}`,
              thumbnailUrl: thumbnail || this.getPlaceholderImage(),
              category: this.categorizeGame(title),
              tags: this.extractTags(title),
              language: 'en',
              featured: Math.random() > 0.9,
              popularity: Math.floor(Math.random() * 100),
            };
            
            this.games.push(game);
          }
        });
      }
    } catch (error) {
      console.error('Error scraping Y8:', error.message);
    }
  }

  async scrapeCrazyGames() {
    try {
      console.log('Scraping CrazyGames...');
      
      const response = await axios.get('https://www.crazygames.com/c/girls', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      $('.game-item').slice(0, 15).each((index, element) => {
        const $element = $(element);
        const title = $element.find('.game-title').text().trim();
        const thumbnail = $element.find('img').attr('src');
        const gameUrl = $element.find('a').attr('href');
        
        if (title && gameUrl) {
          const game = {
            title: this.cleanTitle(title),
            description: this.generateDescription(title),
            embedUrl: `https://www.crazygames.com${gameUrl}`,
            thumbnailUrl: thumbnail || this.getPlaceholderImage(),
            category: this.categorizeGame(title),
            tags: this.extractTags(title),
            language: 'en',
            featured: Math.random() > 0.85,
            popularity: Math.floor(Math.random() * 100),
          };
          
          this.games.push(game);
        }
      });
    } catch (error) {
      console.error('Error scraping CrazyGames:', error.message);
    }
  }

  cleanTitle(title) {
    return title.replace(/[^\w\s-]/gi, '').trim().substring(0, 100);
  }

  generateDescription(title) {
    const templates = [
      `Play ${title} and have amazing fun with this cute game!`,
      `Enjoy ${title} - a wonderful game perfect for creative minds!`,
      `${title} is here! Dive into this adorable gaming experience.`,
      `Experience the magic of ${title} in this delightful game!`,
      `${title} offers hours of entertainment and creativity!`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  categorizeGame(title) {
    const titleLower = title.toLowerCase();
    
    for (const [category, keywords] of Object.entries(this.categories)) {
      if (keywords.some(keyword => titleLower.includes(keyword))) {
        return category;
      }
    }
    
    // Default category based on common patterns
    if (titleLower.includes('girl') || titleLower.includes('princess')) {
      return 'dress-up';
    }
    
    return 'simulation'; // Default fallback
  }

  extractTags(title) {
    const titleLower = title.toLowerCase();
    const commonTags = ['cute', 'girl', 'fun', 'kawaii', 'princess', 'monster', 'magic', 'colorful'];
    
    return commonTags.filter(tag => titleLower.includes(tag) || Math.random() > 0.7).slice(0, 4);
  }

  getPlaceholderImage() {
    const placeholders = [
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/4792064/pexels-photo-4792064.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  removeDuplicates() {
    const seen = new Set();
    this.games = this.games.filter(game => {
      const key = game.title.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  async scrapeAll() {
    console.log('Starting game scraping process...');
    
    try {
      await Promise.all([
        this.scrapePoki(),
        this.scrapeY8(),
        this.scrapeCrazyGames()
      ]);
      
      this.removeDuplicates();
      
      console.log(`Successfully scraped ${this.games.length} games`);
      return this.games;
    } catch (error) {
      console.error('Error in scraping process:', error);
      return this.games;
    }
  }
}

// Usage
async function main() {
  const scraper = new GameScraper();
  const games = await scraper.scrapeAll();
  
  console.log('\n=== Scraping Results ===');
  console.log(`Total games: ${games.length}`);
  
  // Group by category
  const categories = {};
  games.forEach(game => {
    categories[game.category] = (categories[game.category] || 0) + 1;
  });
  
  console.log('\nGames by category:');
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  
  // Save to JSON file for inspection
  require('fs').writeFileSync(
    'scraped-games.json', 
    JSON.stringify(games, null, 2)
  );
  
  console.log('\nGames saved to scraped-games.json');
  
  // TODO: Save to database
  // This would connect to MongoDB and insert the games
  // For now, we just output the results
  
  return games;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = GameScraper;