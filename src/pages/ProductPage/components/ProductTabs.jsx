import { FileText, MessageSquare } from 'lucide-react';
import { useState, useCallback } from 'react';
import { TAB_TYPES } from '../../../utils/constants';

/**
 * ProductTabs Component
 * Displays product specifications and description in tabs
 */
export default function ProductTabs({ specifications = [], description = '' }) {
  const [activeTab, setActiveTab] = useState(TAB_TYPES.SPECIFICATIONS);

  /**
   * Handle tab switch
   */
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <section aria-label="Specifications and description" className="space-y-3 sm:space-y-4">
      {/* Tab navigation */}
      <div className="flex gap-2 sm:gap-4 border-b border-gray-300 overflow-x-auto">
        <button
          onClick={() => handleTabChange(TAB_TYPES.SPECIFICATIONS)}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-bold whitespace-nowrap transition ${
            activeTab === TAB_TYPES.SPECIFICATIONS
              ? 'border-purple-500 text-purple-500'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
          role="tab"
          aria-selected={activeTab === TAB_TYPES.SPECIFICATIONS}
          aria-controls="specifications-panel"
        >
          <FileText size={18} />
          Specifications
        </button>
        <button
          onClick={() => handleTabChange(TAB_TYPES.DESCRIPTION)}
          className={`flex items-center gap-2 border-b-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-bold whitespace-nowrap transition ${
            activeTab === TAB_TYPES.DESCRIPTION
              ? 'border-purple-500 text-purple-500'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
          role="tab"
          aria-selected={activeTab === TAB_TYPES.DESCRIPTION}
          aria-controls="description-panel"
        >
          <MessageSquare size={18} />
          Description
        </button>
      </div>

      {/* Tab content */}
      <div className="rounded border border-gray-300 bg-white p-4 sm:p-6 text-sm text-black leading-relaxed">
        {/* Specifications Tab */}
        {activeTab === TAB_TYPES.SPECIFICATIONS && (
          <div role="tabpanel" id="specifications-panel">
            <h3 className="font-bold text-black mb-4">Product Specifications</h3>
            {specifications && specifications.length > 0 ? (
              <ul className="space-y-3">
                {specifications.map((spec, index) => (
                  <li key={`spec-${index}`} className="flex border-b border-gray-100 pb-3 last:border-0">
                    <span className="font-semibold text-gray-700 min-w-[150px]">{spec.label || 'Label'}:</span>
                    <span className="text-gray-600">{spec.value || 'N/A'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No specifications available</p>
            )}
          </div>
        )}

        {/* Description Tab */}
        {activeTab === TAB_TYPES.DESCRIPTION && (
          <div role="tabpanel" id="description-panel">
            <h3 className="font-bold text-black mb-4">Product Description</h3>
            {description ? (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{description}</p>
                <p>
                  This premium product is designed for quality and durability. Each item undergoes rigorous quality assurance to ensure customer satisfaction. 
                  Experience the perfect blend of style, comfort, and functionality.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No description available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
