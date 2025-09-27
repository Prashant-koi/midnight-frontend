# 🎯 Midnight Skills - Demo & Testing Guide

## 🚀 How to Test the Application

### Option 1: Demo Mode (No Wallet Required) ⭐ **RECOMMENDED FOR TESTING**

1. **Start the app**: `npm run dev`
2. **Open**: http://localhost:5173/
3. **Click "Try Demo Mode"** button on the homepage
4. **Explore all features** with sample data:
   - ✅ View profile with mock data
   - ✅ Add/delete skills (simulated)
   - ✅ Submit endorsements (simulated)
   - ✅ View reputation scores

### Option 2: URL Parameter Demo Mode

Add `?demo=true` to any URL:
- http://localhost:5173/?demo=true

### Option 3: Real Wallet Connection

1. **Get WalletConnect Project ID**:
   - Visit https://cloud.walletconnect.com
   - Create a project and copy the Project ID
   - Update `src/config/web3.ts` with your Project ID

2. **Connect Wallet**:
   - Click "Connect Wallet" 
   - Choose your preferred wallet (MetaMask, WalletConnect, etc.)

## 🎨 Features to Test

### ✅ **Working Features**
- **🏠 Landing Page**: Professional welcome screen
- **🔐 Authentication**: Demo mode + Web3 wallet connection
- **👤 Profile Page**: User dashboard with stats
- **🛠️ Skills Management**: Add/view/delete skills with file uploads
- **⭐ Reputation System**: View and submit endorsements
- **📱 Responsive Design**: Mobile, tablet, desktop

### 🎯 **Demo Mode Features**
- **Sample Skills**: 4 pre-loaded skills with different verification states
- **Mock Endorsements**: 3 sample endorsements with ratings
- **Reputation Score**: Sample score of 87/100
- **File Uploads**: Simulated (files don't actually upload)
- **API Calls**: All mocked with realistic responses

## 🔧 Development

### Quick Start
```bash
npm install
npm run dev
```

### File Structure
```
src/
├── components/Layout/     # Header, Layout components
├── pages/                 # Profile, Skills, Reputation pages
├── services/             # API service layer
├── hooks/                # Custom hooks (useDemoMode)
├── data/                 # Mock data for demo mode
├── types/                # TypeScript interfaces
└── config/               # Web3 configuration
```

### Key Files
- **Demo Mode**: `src/hooks/useDemoMode.ts`
- **Mock Data**: `src/data/mockData.ts`
- **API Service**: `src/services/api.ts`
- **Types**: `src/types/index.ts`

## 🎯 Testing Scenarios

### 1. Demo Mode Testing
- ✅ Click "Try Demo Mode" → Should show navigation
- ✅ Visit Profile → Should show sample user data
- ✅ Visit Skills → Should show 4 sample skills
- ✅ Add a skill → Should simulate adding with random weight
- ✅ Visit Reputation → Should show sample endorsements
- ✅ Submit endorsement → Should simulate submission

### 2. Wallet Testing
- ✅ Click "Connect Wallet" → Should open Web3Modal
- ✅ Connect wallet → Should show wallet address
- ✅ Navigate pages → Should work with real wallet
- ✅ Disconnect → Should return to landing page

### 3. UI Testing
- ✅ Mobile responsive → Test on phone screen size
- ✅ Theme consistency → Black/white theme throughout
- ✅ Font loading → Quicksand font should load
- ✅ Icons → Lucide icons should display properly

## 🚨 Backend Integration

When ready to connect to your backend:

1. **Update API URL**: Change `VITE_API_BASE_URL` in environment
2. **API Endpoints Ready**:
   - `GET /profile/{address}` - Get user profile
   - `POST /profile/{address}/skills` - Add skill with file upload
   - `GET /profile/{address}/skills` - Get user skills
   - `DELETE /profile/{address}/skills/{id}` - Delete skill
   - `POST /endorsements` - Add endorsement
   - `GET /profile/{address}/endorsements` - Get endorsements
   - `GET /profile/{address}/reputation` - Get reputation score

3. **File Upload**: Skills can include proof files that will be sent to your heuristic algorithm

## 🎉 Ready to Use!

The application is fully functional in demo mode. Perfect for:
- **Frontend testing** without blockchain setup
- **UI/UX validation** with realistic data
- **Feature demonstration** to stakeholders
- **Development workflow** before backend integration
