'use client';

import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import ProfileCard from '@/profile/common/ProfileCard'

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

  return (
    <div>
      {/* Header */}
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
        {/* Profile Card */}
        <ProfileCard profile={profile} isEditing={isEditing}/>

        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white font-mono mb-1">{stat.value}</p>
                <p className="text-xs text-emerald-400 font-medium">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Personal Information */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                ) : (
                  <p className="text-white">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                ) : (
                  <p className="text-white">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                ) : (
                  <p className="text-white">{profile.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                ) : (
                  <p className="text-white">{profile.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Professional Information</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Role
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.role}
                    onChange={(e) => setEditedProfile({ ...editedProfile, role: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  >
                    <option value="Team Manager">Team Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Agent">Agent</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  <p className="text-white">{profile.role}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Department
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.department}
                    onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                ) : (
                  <p className="text-white">{profile.department}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                />
              ) : (
                <p className="text-white">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { action: 'Reviewed call recording #12345', time: '2 hours ago', type: 'call' },
                { action: 'Generated weekly report', time: '1 day ago', type: 'report' },
                { action: 'Updated team schedule', time: '2 days ago', type: 'team' },
                { action: 'Completed training module', time: '3 days ago', type: 'training' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}