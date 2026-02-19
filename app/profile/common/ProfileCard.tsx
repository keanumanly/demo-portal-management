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
    isEditing: boolean
}

export default function ProfileCard({ profile, isEditing }: ProfileProps) {
    return (
        <div className="col-span-1">
          <div className="glass-effect rounded-2xl p-6 sticky top-24">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-1/2 translate-x-16 w-10 h-10 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Name and Role */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
              <p className="text-sm text-slate-400 mb-3">{profile.role}</p>
              <div className="flex gap-2 justify-center">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400 font-medium">
                  Admin
                </span>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium">
                  Active
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">Joined {profile.joinDate}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Account Verified</span>
              </div>
              <p className="text-xs text-slate-300">
                Two-factor authentication enabled
              </p>
            </div>
          </div>
        </div>
    );
}