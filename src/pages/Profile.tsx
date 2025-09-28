import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { apiService } from '../services/api'
import type { UserProfile } from '../types'
import { useMidnightWallet } from '../hooks/useMidnightWallet'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileLinks from '../components/profile/ProfileLinks'
import SkillsOverview from '../components/profile/SkillsOverview'

interface ProfileLinksType {
  resume?: string
  github?: string
  kaggle?: string
  portfolio?: string
  linkedin?: string
}

const Profile = () => {
  const { account, isConnected } = useMidnightWallet()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLinks, setProfileLinks] = useState<ProfileLinksType>({})
  const [savingLinks, setSavingLinks] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)

  const currentAddress = account
  const isUserConnected = isConnected

  useEffect(() => {
    if (isUserConnected && currentAddress) {
      loadProfile()
      loadProfileLinks()
    }
  }, [isUserConnected, currentAddress])

  const loadProfile = async () => {
    if (!currentAddress) return
    try {
      setLoading(true)
      const profileData = await apiService.getProfile(currentAddress)
      setProfile(profileData)
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadProfileLinks = async () => {
    if (!currentAddress) return
    try {
      // Replace with real API call when backend is ready
      setProfileLinks({})
    } catch (err) {
      console.error('Failed to load profile links:', err)
    }
  }

  const handleSaveLinks = async (links: ProfileLinksType) => {
    if (!currentAddress) return
    try {
      setSavingLinks(true)
      // Real API call when ready:
      // await apiService.updateProfileLinks(currentAddress, links)
      setProfileLinks(links)
      alert('Profile links will be updated when connected to backend.')
    } catch (err) {
      console.error('Failed to save profile links:', err)
      alert('Failed to update profile links. Please try again.')
    } finally {
      setSavingLinks(false)
    }
  }

  const handleResumeUpload = async (_file: File) => {
    if (!currentAddress) return
    try {
      setUploadingResume(true)
      // Real file upload when ready:
      // const formData = new FormData()
      // formData.append('resume', file)
      // const response = await apiService.uploadResume(currentAddress, formData)
      alert('Resume upload will be available when backend is connected.')
    } catch (err) {
      console.error('Failed to upload resume:', err)
      alert('Failed to upload resume. Please try again.')
    } finally {
      setUploadingResume(false)
    }
  }

  if (!isUserConnected) {
    return (
      <EmptyState
        icon={User}
        title="Connect to View Profile"
        description="Please connect your Midnight wallet to view your professional profile."
      />
    )
  }

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProfileHeader 
        address={currentAddress!} 
        reputationScore={profile?.reputationScore} 
      />

      <ProfileLinks
        links={profileLinks}
        onSaveLinks={handleSaveLinks}
        onUploadResume={handleResumeUpload}
        savingLinks={savingLinks}
        uploadingResume={uploadingResume}
      />

      <SkillsOverview skills={profile?.skills || []} />
    </div>
  )
}

export default Profile