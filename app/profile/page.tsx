'use client';

import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import ProfileCard from '@/profile/common/ProfileCard'
import StatsCard from '@/profile/common/StatsCard'
import PersonalCard from '@/profile/common/PersonalCard'
import ProfessionalCard from '@/profile/common/ProfessionalCard'
import RecentCard from '@/profile/common/RecentCard'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@callsense.ai',
    phone: '+1 (555) 123-4567',
    role: 'Team Manager',
    department: 'Operations',
    location: 'San Francisco, CA',
    bio: 'Experienced team manager with 5+ years in call center operations and analytics.',
    joinDate: 'January 15, 2022',
    avatar: ''
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Calls Reviewed', value: '1,234', change: '+12%' },
    { label: 'Teams Managed', value: '3', change: '+1' },
    { label: 'Reports Generated', value: '89', change: '+23%' },
    { label: 'Avg. Rating', value: '4.8', change: '+0.2' }
  ];

  const activity = [
    { action: 'Reviewed call recording #12345', time: '2 hours ago', type: 'call' },
    { action: 'Generated weekly report', time: '1 day ago', type: 'report' },
    { action: 'Updated team schedule', time: '2 days ago', type: 'team' },
    { action: 'Completed training module', time: '3 days ago', type: 'training' }
  ]

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">My Profile</h1>
          <p className="text-slate-400 font-mono text-sm">Manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-200 text-sm transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg text-white text-sm font-medium transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <ProfileCard profile={profile} isEditing={isEditing}/>
        <div className="col-span-2 space-y-6">
          <StatsCard stats={stats}/>

          <PersonalCard profile={profile} isEditing={isEditing} editedProfile={editedProfile} setEditedProfile={setEditedProfile}/>

          <ProfessionalCard profile={profile} isEditing={isEditing} editedProfile={editedProfile} setEditedProfile={setEditedProfile}/>

          <RecentCard activity={activity}/>
        </div>
      </div>
    </div>
  );
}