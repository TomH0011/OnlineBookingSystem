#!/usr/bin/env node

// Online Booking System - Setup Verification Script
// This script verifies that the setup is correct

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Online Booking System setup...\n');

let allGood = true;

// Check if package.json exists and has correct dependencies
function checkPackageJson() {
  console.log('📦 Checking package.json...');
  
  if (!fs.existsSync('package.json')) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check for HeroUI instead of NextUI
  if (packageJson.dependencies['@heroui/react']) {
    console.log('✅ HeroUI dependency found');
  } else {
    console.log('❌ HeroUI dependency missing');
    return false;
  }
  
  // Check for Tailwind CSS
  if (packageJson.dependencies['tailwindcss']) {
    console.log('✅ Tailwind CSS dependency found');
  } else {
    console.log('❌ Tailwind CSS dependency missing');
    return false;
  }
  
  return true;
}

// Check if Tailwind config exists
function checkTailwindConfig() {
  console.log('🎨 Checking Tailwind configuration...');
  
  if (fs.existsSync('tailwind.config.js')) {
    console.log('✅ tailwind.config.js found');
    return true;
  } else {
    console.log('❌ tailwind.config.js missing');
    return false;
  }
}

// Check if PostCSS config exists
function checkPostCSSConfig() {
  console.log('🔧 Checking PostCSS configuration...');
  
  if (fs.existsSync('postcss.config.js')) {
    console.log('✅ postcss.config.js found');
    return true;
  } else {
    console.log('❌ postcss.config.js missing');
    return false;
  }
}

// Check if node_modules exists
function checkNodeModules() {
  console.log('📁 Checking node_modules...');
  
  if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules directory found');
    return true;
  } else {
    console.log('❌ node_modules directory missing - run npm install');
    return false;
  }
}

// Check if HeroUI is properly imported in index.js
function checkIndexJS() {
  console.log('🔍 Checking index.js imports...');
  
  if (!fs.existsSync('src/index.js')) {
    console.log('❌ src/index.js not found');
    return false;
  }
  
  const indexContent = fs.readFileSync('src/index.js', 'utf8');
  
  if (indexContent.includes('@heroui/react')) {
    console.log('✅ HeroUI properly imported in index.js');
    return true;
  } else {
    console.log('❌ HeroUI not properly imported in index.js');
    return false;
  }
}

// Check if CSS has HeroUI styles
function checkCSS() {
  console.log('🎨 Checking CSS configuration...');
  
  if (!fs.existsSync('src/index.css')) {
    console.log('❌ src/index.css not found');
    return false;
  }
  
  const cssContent = fs.readFileSync('src/index.css', 'utf8');
  
  if (cssContent.includes('@heroui/react/dist/heroui.css')) {
    console.log('✅ HeroUI styles imported in CSS');
    return true;
  } else {
    console.log('❌ HeroUI styles not imported in CSS');
    return false;
  }
}

// Run all checks
const checks = [
  checkPackageJson,
  checkTailwindConfig,
  checkPostCSSConfig,
  checkNodeModules,
  checkIndexJS,
  checkCSS
];

checks.forEach(check => {
  if (!check()) {
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 All checks passed! Your setup looks good.');
  console.log('\n📝 Next steps:');
  console.log('   1. Make sure your backend services are running');
  console.log('   2. Run: npm start');
  console.log('   3. Open http://localhost:3000 in your browser');
} else {
  console.log('❌ Some checks failed. Please review the errors above.');
  console.log('\n🔧 To fix issues:');
  console.log('   • Run: npm install');
  console.log('   • Check that all files are in the correct locations');
  console.log('   • Verify your Node.js installation');
}

console.log('\n📚 For more help, see README-SETUP.md');
