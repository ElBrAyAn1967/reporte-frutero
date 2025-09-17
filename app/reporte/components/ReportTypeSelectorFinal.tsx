'use client';

import React from 'react';
import { reportTypes, ReportType } from '../utils/templates';

interface ReportTypeSelectorProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  handleReportTypeSelect: (type: ReportType) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function ReportTypeSelector({ 
  isDropdownOpen, 
  setIsDropdownOpen, 
  handleReportTypeSelect,
  dropdownRef 
}: ReportTypeSelectorProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between min-w-80 px-6 py-4 bg-primary text-primary-foreground rounded-xl shadow-lg hover:opacity-80 transition-all duration-300 ease-in-out font-medium text-lg"
        >
          <div className="flex items-center">
            <i className="fas fa-file-alt mr-3 text-xl"></i>
            <span>¿Qué tipo de reporte vas a subir?</span>
          </div>
          <i className={`fas fa-chevron-down ml-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
            {reportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleReportTypeSelect(type.value)}
                className="w-full flex items-center px-6 py-4 hover:bg-muted transition-all duration-200 text-left border-b border-border last:border-b-0"
              >
                <i className={`${type.icon} text-primary mr-4 text-xl`}></i>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{type.label}</span>
                  <span className="text-sm text-muted-foreground">{type.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}