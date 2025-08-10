# Contributing to GoFood

Thank you for your interest in contributing to GoFood! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide browser/device information
- Include screenshots when helpful

### Suggesting Features
- Open a feature request in GitHub issues
- Clearly describe the feature and its benefits
- Consider backward compatibility
- Provide mockups or examples when possible

## 🚀 Development Process

### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

### Code Standards
- Use functional components with hooks
- Follow the existing folder structure
- Write meaningful component and variable names
- Add JSDoc comments for complex functions
- Keep components focused and reusable

### Code Style
- We use Prettier for code formatting
- ESLint enforces code quality rules
- Run `npm run lint:fix` to fix linting issues
- Run `npm run format` to format code

### Commit Guidelines
We follow conventional commit format:

```
type(scope): description

feat(auth): add password reset functionality
fix(cart): resolve quantity update issue  
docs(readme): update installation instructions
style(navbar): improve mobile responsiveness
test(utils): add validation tests
refactor(hooks): optimize useCart performance
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting
- `test`: Adding tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

### Testing
- Write tests for new features and bug fixes
- Ensure all tests pass: `npm test`
- Maintain or improve code coverage
- Test on different browsers and devices

## 📝 Pull Request Process

### Before Submitting
1. Ensure your branch is up to date with main
2. Run tests: `npm test`
3. Run linting: `npm run lint`
4. Check formatting: `npm run format:check`
5. Update documentation if needed

### PR Requirements
- Clear title and description
- Reference related issues
- Include screenshots for UI changes
- Ensure CI/CD pipeline passes
- Request review from maintainers

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback if requested
4. Final approval and merge

## 🏗️ Architecture Guidelines

### Component Structure
```
components/
├── common/          # Reusable UI components
├── forms/           # Form-specific components  
└── layout/          # Layout components
```

### State Management
- Use React Context for global state
- Keep local state when possible
- Use useCallback and useMemo for optimization
- Follow the single responsibility principle

### Performance
- Lazy load components when appropriate
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper loading states

### Accessibility
- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide alternative text for images
- Ensure keyboard navigation works
- Test with screen readers

## 🎨 Design Guidelines

### UI Principles
- Mobile-first responsive design
- Consistent spacing and typography
- Accessible color contrast
- Intuitive navigation
- Fast loading times

### Brand Guidelines
- Use the established color palette
- Follow the gradient theme
- Maintain consistent iconography
- Use proper font weights and sizes

## 🔧 Development Tools

### Required Tools
- Node.js 16+
- npm or yarn
- Git
- Modern browser with dev tools

### Recommended Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

## 🐛 Bug Report Template

When reporting bugs, please include:

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 91.0]
- Device: [e.g. iPhone 12]
- OS: [e.g. iOS 14.6]
- Version: [e.g. 2.0.0]
```

## ✨ Feature Request Template

```markdown
**Feature Description**
Clear description of the requested feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.
```

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Learning Resources
- [React Patterns](https://reactpatterns.com/)
- [JavaScript Info](https://javascript.info/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Invited to the contributors Discord channel
- Eligible for contributor swag (future)

## 📞 Getting Help

- Check existing documentation
- Search through GitHub issues
- Ask questions in GitHub Discussions
- Join our Discord community
- Contact maintainers directly

## 📄 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

---

Thank you for contributing to GoFood! Your efforts help make this project better for everyone. 🍽️
