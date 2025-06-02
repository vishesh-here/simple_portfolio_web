#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🚀 Welcome to Portfolio Setup!\n');
  
  try {
    // Get user information
    const name = await question('What is your full name? ');
    const title = await question('What is your professional title? (e.g., Full Stack Developer) ');
    const email = await question('What is your email address? ');
    const phone = await question('What is your phone number? (optional) ');
    const location = await question('What is your location? (e.g., New York, NY) ');
    const intro = await question('Write a brief introduction about yourself: ');
    
    // Update config.json
    const configPath = path.join(__dirname, '../data/config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    config.site.title = `${name} - Portfolio`;
    config.site.description = `${title} specializing in modern web development`;
    config.hero.name = name;
    config.hero.tagline = title;
    config.hero.intro = intro;
    config.contact.email = email;
    config.contact.phone = phone || '';
    config.contact.location = location;
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    console.log('\n✅ Configuration updated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add your profile image to public/images/profile.jpg');
    console.log('2. Update your projects in data/projects.json');
    console.log('3. Update your career timeline in data/career.json');
    console.log('4. Add testimonials in data/testimonials.json');
    console.log('5. Run "npm run dev" to start the development server');
    console.log('\n🎉 Your portfolio is ready to customize!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();