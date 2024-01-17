"use client"
import React from 'react'
import { useTheme } from "next-themes";
import { DarkThemeToggle } from 'flowbite-react';




export const getDarkModePreference = () => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('flowbite-theme-mode');
      return storedValue === 'dark'
    }
    return false;
  };