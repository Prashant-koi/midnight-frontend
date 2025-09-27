# 🔌 API Integration Guide

## 🎯 Current State: UI-Only Mode

The application is currently set up with **UI-only functionality**. All features work perfectly for testing, but they use local state and mock data instead of real API calls.

## 🚀 When You're Ready to Connect Your Backend

### 1. **Update API Base URL**

```typescript
// src/config/web3.ts or create .env file
const API_BASE_URL = 'https://your-backend-api.com/api'
// or
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### 2. **Replace Mock Calls with Real API Calls**

#### **Skills Page** (`src/pages/Skills.tsx`)

**Current (Lines 42-44):**
```typescript
// For now, just use empty array for real wallet mode
// You'll replace this with: const skillsData = await apiService.getSkills(currentAddress)
setSkills([])
```

**Replace with:**
```typescript
const skillsData = await apiService.getSkills(currentAddress)
setSkills(skillsData)
```

**Current (Lines 71-82):**
```typescript
// For real wallet mode, just add to local state for now
// You'll replace this with: const newSkill = await apiService.addSkill(currentAddress, {...})
const newSkill: Skill = { /* local object */ }
setSkills(prev => [newSkill, ...prev])
```

**Replace with:**
```typescript
const newSkill = await apiService.addSkill(currentAddress, {
  name: formData.name.trim(),
  description: formData.description.trim(),
  proofUrl: formData.proofUrl.trim() || undefined,
  proofFile: formData.proofFile || undefined
})
setSkills(prev => [newSkill, ...prev])
```

**Current (Lines 110-112):**
```typescript
// For real wallet mode, just remove from local state for now
// You'll replace this with: await apiService.deleteSkill(currentAddress, skillId)
```

**Replace with:**
```typescript
await apiService.deleteSkill(currentAddress, skillId)
```

#### **Profile Page** (`src/pages/Profile.tsx`)

**Current (Lines 36-38):**
```typescript
} else {
  const profileData = await apiService.getProfile(currentAddress)
  setProfile(profileData)
}
```
✅ **Already ready for API integration!**

#### **Reputation Page** (`src/pages/Reputation.tsx`)

**Current (Lines 47-54):**
```typescript
// For real wallet mode, use empty data for now
// You'll replace this with real API calls:
// const [endorsementsData, reputationData] = await Promise.all([
//   apiService.getEndorsements(currentAddress),
//   apiService.getReputationScore(currentAddress)
// ])
setEndorsements([])
setReputationScore(0)
```

**Replace with:**
```typescript
const [endorsementsData, reputationData] = await Promise.all([
  apiService.getEndorsements(currentAddress),
  apiService.getReputationScore(currentAddress)
])
setEndorsements(endorsementsData)
setReputationScore(reputationData.score)
```

**Current (Lines 83-94):**
```typescript
// For real wallet mode, just add to local state for now
// You'll replace this with: const newEndorsement = await apiService.addEndorsement({...})
const newEndorsement: Endorsement = { /* local object */ }
setEndorsements(prev => [newEndorsement, ...prev])
```

**Replace with:**
```typescript
const newEndorsement = await apiService.addEndorsement({
  fromAddress: currentAddress,
  toAddress: endorseForm.toAddress.trim(),
  projectId: endorseForm.projectId.trim() || `project-${Date.now()}`,
  message: endorseForm.message.trim(),
  rating: endorseForm.rating
})
setEndorsements(prev => [newEndorsement, ...prev])
```

## 🛡️ Required Backend Endpoints

Your backend needs to implement these endpoints (already configured in `src/services/api.ts`):

### **Profile Endpoints**
```
GET    /api/profile/{address}           # Get user profile
PUT    /api/profile/{address}           # Update user profile
```

### **Skills Endpoints**
```
GET    /api/profile/{address}/skills    # Get user skills
POST   /api/profile/{address}/skills    # Add skill (with file upload)
DELETE /api/profile/{address}/skills/{id}  # Delete skill
```

### **Endorsement Endpoints**
```
GET    /api/profile/{address}/endorsements  # Get user endorsements
POST   /api/endorsements                    # Add endorsement
```

### **Reputation Endpoints**
```
GET    /api/profile/{address}/reputation    # Get reputation score
```

## 📁 File Upload Handling

The **Skills** endpoint supports file uploads for proof documents:

```typescript
// The API service automatically handles FormData for file uploads
const formData = new FormData()
formData.append('name', skill.name)
formData.append('description', skill.description)
formData.append('proofUrl', skill.proofUrl)
formData.append('proofFile', skill.proofFile) // Your heuristic algorithm will process this
```

## 🎯 Expected API Response Formats

### **Skill Object**
```typescript
{
  id: string
  name: string
  description: string
  proofUrl?: string
  weight: number        // Determined by your heuristic algorithm
  verified: boolean     // Determined by your heuristic algorithm
  createdAt: string
}
```

### **Endorsement Object**
```typescript
{
  id: string
  fromAddress: string
  toAddress: string
  projectId: string
  message: string
  rating: number (1-5)
  createdAt: string
}
```

### **User Profile Object**
```typescript
{
  address: string
  skills: Skill[]
  reputationScore: number (0-100)
  endorsements: Endorsement[]
}
```

## ⚡ Quick Integration Steps

1. **Set up your backend** with the required endpoints
2. **Update the API base URL** in the config
3. **Uncomment the API calls** in the three main pages
4. **Test with real wallet connection**
5. **Your heuristic algorithm** will process uploaded files and determine skill weights/verification

## 🎉 Benefits of Current Setup

- ✅ **Complete UI testing** without backend dependency
- ✅ **Demo mode** for stakeholder presentations  
- ✅ **Real wallet integration** ready to go
- ✅ **File upload UI** fully implemented
- ✅ **Error handling** and loading states included
- ✅ **TypeScript interfaces** match your API needs
- ✅ **Professional design** with responsive layout

The frontend is **100% ready** for your backend integration! 🚀
