# Contributing to ClimaVue

Thank you for your interest in contributing to ClimaVue! This document provides guidelines for contributing to the project.

## 🌟 Ways to Contribute

- **Bug Reports**: Found a bug? Open an issue with detailed steps to reproduce
- **Feature Requests**: Have an idea? Suggest new features
- **Code Contributions**: Submit pull requests with improvements
- **Documentation**: Help improve or translate documentation
- **Testing**: Test the app and report issues
- **Design**: Suggest UI/UX improvements

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- OpenWeatherMap API key

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/climavue.git
   cd climavue
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create `.env` file:
   ```bash
   cp .env.example .env
   # Add your API key
   ```

5. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. Run development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code structure
- Use CSS Modules for styling
- Write descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

### Component Structure

```typescript
/**
 * Component description
 */

'use client'; // If client component

import React from 'react';
import styles from '../styles/ComponentName.module.css';

interface ComponentProps {
  // Props with JSDoc comments
}

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

### File Organization

- Components: `app/components/`
- Hooks: `app/hooks/`
- Services: `app/services/`
- Types: `app/types/`
- Utils: `app/utils/`
- Styles: `app/styles/`

### Naming Conventions

- **Components**: PascalCase (e.g., `SearchBar.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useWeather.ts`)
- **CSS Modules**: ComponentName.module.css
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Git Commit Messages

Follow conventional commits:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

Examples:
```
feat: Add geolocation support
fix: Correct temperature conversion
docs: Update API documentation
style: Format SearchBar component
refactor: Simplify weather service
```

## 🧪 Testing

Before submitting:

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices
3. Test dark mode
4. Test different cities
5. Test error states
6. Check for TypeScript errors: `npm run build`
7. Check for console errors

## 📦 Pull Request Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**:
   - Write clean, documented code
   - Follow the style guide
   - Test thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature
   ```

5. **Open a Pull Request**:
   - Describe your changes
   - Link related issues
   - Add screenshots for UI changes
   - Wait for review

### PR Checklist

- [ ] Code follows project style
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] PR description is clear

## 🐛 Reporting Bugs

**Before reporting**:
- Check if the bug was already reported
- Try to reproduce on latest version
- Collect relevant information

**Include in bug report**:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos
- Browser and OS
- Console errors

**Example**:
```markdown
**Bug**: Temperature not updating after city search

**Steps to reproduce**:
1. Search for "London"
2. Search for "Paris"
3. Temperature shows London data

**Expected**: Should show Paris temperature
**Actual**: Shows London temperature

**Browser**: Chrome 120
**OS**: Windows 11
**Console errors**: None
```

## 💡 Suggesting Features

**Before suggesting**:
- Check existing feature requests
- Consider if it fits project scope
- Think about implementation

**Include in feature request**:
- Clear title
- Problem it solves
- Proposed solution
- Alternative solutions
- Additional context
- Mockups (if UI change)

## 🎨 Design Guidelines

### Colors

Use CSS variables from `globals.css`:
- Primary: `var(--primary-color)`
- Text: `var(--text-primary)`, `var(--text-secondary)`
- Background: `var(--background)`, `var(--card-bg)`
- Borders: `var(--border-color)`

### Spacing

Use 8px grid system:
- Small: 0.5rem (8px)
- Medium: 1rem (16px)
- Large: 2rem (32px)

### Typography

- Use system font stack
- Weights: 400, 500, 600, 700
- Sizes: 0.85rem - 4rem

### Accessibility

- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen reader
- Support reduced motion

## 🔒 Security

- **Never commit**:
  - API keys
  - Sensitive data
  - `.env` files

- **Report security issues** privately
- **Don't use** external dependencies unnecessarily
- **Validate** user inputs
- **Sanitize** data

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## ❓ Questions?

- Open an issue for discussion
- Check existing documentation
- Review closed issues/PRs

## 🙏 Thank You!

Every contribution helps make ClimaVue better. Whether it's a bug report, feature suggestion, or code contribution, we appreciate your time and effort!

---

**Developed by Ranul Gamage - RGDev**
