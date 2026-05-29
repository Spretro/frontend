import { ChevronDown } from 'lucide-react';
import { useState, useCallback } from 'react';
import { TAB_TYPES } from '../../../utils/constants';

/**
 * ProductTabs Component
 * Displays product specifications and description in tabs
 */
export default function ProductTabs({ specifications = [], description = '' }) {
  const [activeTab, setActiveTab] = useState(TAB_TYPES.SPECIFICATIONS);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  /**
   * Handle tab switch
   */
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Show only 6 specifications by default, then all if expanded
  const displayedSpecs = showAllSpecs ? specifications : specifications.slice(0, 6);
  const hasMoreSpecs = specifications.length > 6;

  // Group specifications into rows of 3
  const specificationRows = [];
  for (let i = 0; i < displayedSpecs.length; i += 3) {
    specificationRows.push(displayedSpecs.slice(i, i + 3));
  }

  return (
    <section aria-label="Specifications and description" className="space-y-0 border border-gray-300 rounded-lg overflow-hidden">
      {/* Tab navigation */}
      <div className="relative flex gap-0 bg-gray-100 px-0 sm:px-8 pt-2">
        <button
          onClick={() => handleTabChange(TAB_TYPES.SPECIFICATIONS)}
          className={`relative flex-1 sm:flex-none px-4 sm:px-24 py-3 sm:py-4 text-xs sm:text-base font-bold whitespace-nowrap transition text-center justify-center ${
            activeTab === TAB_TYPES.SPECIFICATIONS
              ? 'bg-white text-black rounded-t-lg'
              : 'bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
          role="tab"
          aria-selected={activeTab === TAB_TYPES.SPECIFICATIONS}
          aria-controls="specifications-panel"
        >
          Specifications
          {activeTab === TAB_TYPES.SPECIFICATIONS && (
            <>
              <div aria-hidden="true" className="absolute bottom-0 -left-3 w-3 h-3 bg-white z-10">
                <div className="w-3 h-3 bg-gray-100 rounded-br-full"></div>
              </div>
              <div aria-hidden="true" className="absolute bottom-0 -right-3 w-3 h-3 bg-white z-10">
                <div className="w-3 h-3 bg-gray-100 rounded-bl-full"></div>
              </div>
            </>
          )}
        </button>
        <button
          onClick={() => handleTabChange(TAB_TYPES.DESCRIPTION)}
          className={`relative flex-1 sm:flex-none px-4 sm:px-24 py-3 sm:py-4 text-xs sm:text-base font-bold whitespace-nowrap transition text-center justify-center ${
            activeTab === TAB_TYPES.DESCRIPTION
              ? 'bg-white text-black rounded-t-lg'
              : 'bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
          role="tab"
          aria-selected={activeTab === TAB_TYPES.DESCRIPTION}
          aria-controls="description-panel"
        >
          Description
          {activeTab === TAB_TYPES.DESCRIPTION && (
            <>
              <div aria-hidden="true" className="absolute bottom-0 -left-3 w-3 h-3 bg-white z-10">
                <div className="w-3 h-3 bg-gray-100 rounded-br-full"></div>
              </div>
              <div aria-hidden="true" className="absolute bottom-0 -right-3 w-3 h-3 bg-white z-10">
                <div className="w-3 h-3 bg-gray-100 rounded-bl-full"></div>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Tab content */}
      <div className="bg-white p-4 sm:p-6 text-sm text-black leading-relaxed">
        {/* Specifications Tab */}
        {activeTab === TAB_TYPES.SPECIFICATIONS && (
          <div role="tabpanel" id="specifications-panel">
            {specifications && specifications.length > 0 ? (
              <div className="space-y-0">
                {specificationRows.map((row, rowIndex) => (
                  <div
                    key={`spec-row-${rowIndex}`}
                    className={`grid grid-cols-3 ${
                      rowIndex !== specificationRows.length - 1
                        ? 'border-b border-gray-300'
                        : ''
                    }`}
                  >
                    {row.map((spec, colIndex) => (
                      <div
                        key={`spec-${rowIndex}-${colIndex}`}
                        className="p-4 sm:p-5"
                      >
                        <span className="text-xs sm:text-sm text-gray-600 block mb-1.5">
                          {spec.label || 'Label'}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-black block">
                          {spec.value || 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                {/* View More button */}
                {hasMoreSpecs && (
                  <div className="flex justify-center p-4 sm:p-6 border-t border-gray-300">
                    <button
                      onClick={() => setShowAllSpecs(!showAllSpecs)}
                      className="flex items-center gap-2 text-black hover:text-purple-600 font-semibold transition"
                    >
                      {showAllSpecs ? 'View Less' : 'View More'}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          showAllSpecs ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
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
