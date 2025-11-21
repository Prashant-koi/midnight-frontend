# Midnight Skills - Frontend

Professional Skills Verification Platform built with React, TypeScript, and Vite.

## Features

- 🔐 Web3 Wallet Integration (MetaMask, WalletConnect, etc.)
- 👤 Social Login Support (Google, Email) via WalletConnect Auth
- 🎭 Demo Mode for testing without wallet connection
- 💼 Job board with skill-based matching
- 🌟 Skill verification and reputation system
- 📱 Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

3. **Configure WalletConnect Project (Required for Social Login)**

   To enable Google login and other social authentication options:

   a. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
   
   b. Create a new project or use an existing one
   
   c. **Enable the "Auth" feature** in your project settings:
      - Navigate to your project
      - Go to "Features" or "Auth" section
      - Enable "Email/Social Login"
      - Add allowed domains (e.g., `localhost:5173` for development)
   
   d. Copy your Project ID and add it to `.env`:
      ```
      VITE_WALLET_CONNECT_PROJECT_ID=your_actual_project_id
      ```

   **Important Notes:**
   - Social logins (Google, Email) require the **Auth feature** to be enabled in WalletConnect Cloud
   - Using `demo-project-id` will only show wallet connection options, not social logins
   - The Auth feature may require a paid plan on WalletConnect Cloud

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

### Wallet Connection Options

1. **Web3 Wallets**: Connect with MetaMask, WalletConnect, Coinbase Wallet, etc.
2. **Social Login** (requires Auth enabled): Login with Google, email, or other social providers
3. **Demo Mode**: Add `?demo=true` to the URL or click "Try Demo Mode" button

### Demo Mode

To test the application without connecting a wallet:
- Visit `http://localhost:5173?demo=true`
- Or click the "Try Demo Mode" button on the home page
- This will populate the app with mock data for testing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Social Login (Google) Not Working

**Problem**: The "Connect with Google" or social login options don't appear in the wallet modal.

**Solutions**:

1. **Check WalletConnect Project ID**: 
   - Ensure `VITE_WALLET_CONNECT_PROJECT_ID` is set to a valid project ID (not `demo-project-id`)
   - Verify the ID is correct in your `.env` file

2. **Enable Auth Feature**:
   - Log into [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Navigate to your project
   - Enable the "Auth" or "Email/Social Login" feature
   - This feature may require a paid subscription

3. **Add Allowed Domains**:
   - In WalletConnect Cloud project settings
   - Add `localhost:5173` for development
   - Add your production domain when deploying

4. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for errors related to WalletConnect or Auth
   - Common errors indicate missing Auth feature or invalid project ID

5. **Use Demo Mode Instead**:
   - If you just want to test the app, use demo mode: `?demo=true`
   - Demo mode doesn't require any wallet connection

### Environment Variables Not Loading

- Make sure your `.env` file is in the `midnight-frontend` directory
- Restart the development server after changing `.env`
- All environment variables must start with `VITE_` to be accessible in the app

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Wagmi** - Web3 React hooks
- **Web3Modal** - Wallet connection UI
- **React Router** - Navigation
- **Tanstack Query** - Data fetching

## Project Structure

```
src/
├── components/     # Reusable components
├── config/        # Configuration files (web3, etc.)
├── data/          # Mock data for demo mode
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
