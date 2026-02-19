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

export default function ProfessionalCard({ profile, editedProfile, setEditedProfile, isEditing }: ProfileProps) {
    return (
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
    );
}