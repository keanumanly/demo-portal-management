'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Camera, Shield } from 'lucide-react';

interface Props {
    name: string,
    email: string,
    phone: string,
    role: string,
    department: string,
    location: string,
    bio: string,
    joinDate: string,
    avatar: string
}

interface ProfileProps {
    profile: Props, 
    editedProfile: Props,
    setEditedProfile: React.Dispatch<React.SetStateAction<Props>>,
    isEditing: boolean
}

export default function PersonalCard({ profile, editedProfile, setEditedProfile, isEditing }: ProfileProps) {
    return (
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
    );
}