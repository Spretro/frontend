import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { TABS } from "../../lib/productUtils";

export default function ProductTabs({ specifications = [], description = "" }) {
  const [activeTab, setActiveTab] = useState(TABS.specifications);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const descriptionParagraphs = String(description || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const normalizedDescription = descriptionParagraphs.join("\n\n");

  const displayedSpecs = showAllSpecs
    ? specifications
    : specifications.slice(0, 6);
  const hasMoreSpecs = specifications.length > 6;
  const hasMoreDescription = normalizedDescription.length > 420;

  return (
    <section
      aria-label="Product specifications and description"
      className="overflow-hidden rounded-3xl border border-[#EEE8FF] bg-white"
      style={{ boxShadow: "0 2px 16px rgba(106,44,255,0.06)" }}
    >
      <div
        className="flex gap-1 overflow-x-auto border-b border-[#EEE8FF] bg-[#F9F8FF] p-2"
        role="tablist"
        aria-label="Product detail tabs"
      >
        <TabButton
          label="Specifications"
          tab={TABS.specifications}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
        <TabButton
          label="Description"
          tab={TABS.description}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
      </div>

      <div className="p-4 md:p-6">
        {activeTab === TABS.specifications && (
          <div
            id="product-specifications-panel"
            role="tabpanel"
            aria-labelledby="product-specifications-tab"
          >
            {displayedSpecs.length > 0 ? (
              <>
                <dl className="grid overflow-hidden rounded-2xl border border-gray-100 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedSpecs.map((spec) => (
                    <div
                      key={`${spec.label}-${spec.value}`}
                      className="border-b border-r border-gray-100 p-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                    >
                      <dt className="text-xs font-bold text-gray-400">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-black text-gray-950">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {hasMoreSpecs && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllSpecs((current) => !current)}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-black text-gray-700 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                    >
                      {showAllSpecs ? "View Less" : "View More"}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          showAllSpecs ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm font-medium text-gray-500">
                No specifications available.
              </p>
            )}
          </div>
        )}

        {activeTab === TABS.description && (
          <div
            id="product-description-panel"
            role="tabpanel"
            aria-labelledby="product-description-tab"
          >
            {normalizedDescription ? (
              <>
                <dl className="overflow-hidden rounded-2xl border border-gray-100">
                  <div className="min-w-0 p-4">
                    <dt className="text-xs font-bold text-gray-400">
                      Description
                    </dt>
                    <dd
                      className={`mt-1 whitespace-pre-line break-words text-sm font-black font-medium leading-relaxed text-gray-600 ${
                        hasMoreDescription && !showAllDescription
                          ? "max-h-32 overflow-hidden"
                          : ""
                      }`}
                    >
                      {normalizedDescription}
                    </dd>
                  </div>
                </dl>

                {hasMoreDescription && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setShowAllDescription((current) => !current)
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-black text-gray-700 transition-colors hover:border-[#6A2CFF] hover:text-[#6A2CFF] focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2"
                    >
                      {showAllDescription ? "View Less" : "View More"}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          showAllDescription ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm font-medium text-gray-500">
                No description available.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TabButton({ label, tab, activeTab, onClick }) {
  const isActive = activeTab === tab;

  return (
    <button
      type="button"
      id={`product-${tab}-tab`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`product-${tab}-panel`}
      onClick={() => onClick(tab)}
      className={`min-h-11 flex-1 rounded-2xl px-4 text-sm font-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6A2CFF] focus:ring-offset-2 sm:flex-none sm:px-8 ${
        isActive
          ? "bg-white text-[#6A2CFF] shadow-sm"
          : "text-gray-500 hover:bg-white/70 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}
